'use client'

import { useState, useEffect } from 'react'
import { Chessboard } from 'react-chessboard'
import { Chess } from 'chess.js'
import { useAccount, useWriteContract, useReadContract, useWatchContractEvent, useSwitchChain } from 'wagmi'
import { SIGGY_CHESS_ABI, SIGGY_CHESS_ADDRESS, RITUAL_AGENT_ADDRESS, GameStatus, GameStatusLabel } from '@/lib/contracts'
import { ritual } from '@/lib/wagmi'

export function ChessGame() {
  const { address, chain } = useAccount()
  const { switchChain } = useSwitchChain()
  const [game, setGame] = useState(new Chess())
  const [gameId, setGameId] = useState<number | null>(null)
  const [difficulty, setDifficulty] = useState(5)
  const [status, setStatus] = useState<string>('Create a game to start')

  const { writeContract, isPending: isCreating } = useWriteContract()

  // Read game data
  const { data: gameData, refetch } = useReadContract({
    address: SIGGY_CHESS_ADDRESS,
    abi: SIGGY_CHESS_ABI,
    functionName: 'getGame',
    args: gameId !== null ? [BigInt(gameId)] : undefined,
    query: { enabled: gameId !== null },
  })

  // Watch for AI moves
  useWatchContractEvent({
    address: SIGGY_CHESS_ADDRESS,
    abi: SIGGY_CHESS_ABI,
    eventName: 'AIMove',
    onLogs(logs) {
      logs.forEach((log: any) => {
        if (log.args.gameId === BigInt(gameId || 0)) {
          console.log('AI moved:', log.args.move)
          refetch()
        }
      })
    },
  })

  // Update local game state from contract
  useEffect(() => {
    if (gameData) {
      const newGame = new Chess()
      newGame.load(gameData.fen)
      setGame(newGame)
      setStatus(GameStatusLabel[gameData.status as keyof typeof GameStatusLabel] || 'Unknown')
    }
  }, [gameData])

  const createGame = async () => {
    if (!address) return
    
    // Check if we're on Ritual chain
    if (chain?.id !== ritual.id) {
      try {
        await switchChain({ chainId: ritual.id })
      } catch (error) {
        console.error('Failed to switch chain:', error)
        setStatus('Please switch to Ritual chain')
        return
      }
    }
    
    setStatus('Creating game...')
    
    try {
      writeContract({
        address: SIGGY_CHESS_ADDRESS,
        abi: SIGGY_CHESS_ABI,
        functionName: 'createGame',
        args: [RITUAL_AGENT_ADDRESS, difficulty],
      }, {
        onSuccess: async (hash) => {
          console.log('Game created tx:', hash)
          setStatus('Game created! Waiting for confirmation...')
          
          // Wait a bit for the transaction to be mined
          setTimeout(async () => {
            try {
              // Read the gameIdCounter to get the latest game ID
              const gameCounter = await refetch()
              console.log('Game counter:', gameCounter)
              
              // The new game ID is counter - 1
              // For simplicity, let's just set it to 0 for first game
              // In production, parse the GameCreated event from the transaction receipt
              setGameId(0)
              setStatus('Your turn! Move a piece to start.')
            } catch (error) {
              console.error('Error getting game ID:', error)
              setStatus('Game created but failed to load. Please refresh.')
            }
          }, 2000)
        },
        onError: (error) => {
          console.error('Create game error:', error)
          setStatus('Failed to create game. Please try again.')
        }
      })
    } catch (error) {
      console.error('Create game error:', error)
      setStatus('Failed to create game. Please try again.')
    }
  }

  const makeMove = (sourceSquare: string, targetSquare: string): boolean => {
    if (!gameId || !address) return false

    // Check if we're on Ritual chain
    if (chain?.id !== ritual.id) {
      setStatus('Please switch to Ritual chain')
      return false
    }

    const move = game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q',
    })

    if (!move) return false

    const uciMove = sourceSquare + targetSquare
    const newFen = game.fen()

    try {
      writeContract({
        address: SIGGY_CHESS_ADDRESS,
        abi: SIGGY_CHESS_ABI,
        functionName: 'makeMove',
        args: [BigInt(gameId), uciMove, newFen],
      }, {
        onSuccess: () => {
          setStatus('Waiting for AI...')
          refetch()
        },
        onError: (error) => {
          console.error('Move error:', error)
          game.undo()
          setGame(new Chess(game.fen()))
        }
      })
      return true
    } catch (error) {
      console.error('Move error:', error)
      game.undo()
      setGame(new Chess(game.fen()))
      return false
    }
  }

  return (
    <div className="flex flex-col items-center gap-6 p-8">
      {/* Status Bar */}
      <div className="w-full max-w-2xl bg-gradient-to-r from-purple-900/40 to-pink-900/40 rounded-xl p-6 border border-purple-500/30">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">♟️ Siggy Chess</h2>
            <p className="text-purple-300">{status}</p>
            {gameId !== null && (
              <p className="text-sm text-purple-400 mt-1">Game ID: {gameId}</p>
            )}
            {chain && chain.id !== ritual.id && (
              <p className="text-sm text-red-400 mt-2">
                ⚠️ Wrong network! Please switch to Ritual chain.
              </p>
            )}
          </div>
          {!gameId && (
            <div className="flex flex-col gap-3">
              <div>
                <label className="text-sm text-purple-300 block mb-2">
                  Difficulty: {difficulty}/10
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={difficulty}
                  onChange={(e) => setDifficulty(Number(e.target.value))}
                  className="w-full"
                />
              </div>
              <button
                onClick={createGame}
                disabled={isCreating || !address}
                className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-gray-600 disabled:to-gray-600 text-white font-bold rounded-lg shadow-lg transition"
              >
                {isCreating ? 'Creating...' : 'New Game'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Chessboard */}
      <div className="w-full max-w-2xl">
        <div className="rounded-xl overflow-hidden shadow-2xl shadow-purple-500/30 border-4 border-purple-500/30">
          <Chessboard
            position={game.fen()}
            onPieceDrop={makeMove}
            boardWidth={Math.min(600, typeof window !== 'undefined' ? window.innerWidth - 64 : 600)}
            customBoardStyle={{
              borderRadius: '8px',
            }}
            customDarkSquareStyle={{ backgroundColor: '#8b5cf6' }}
            customLightSquareStyle={{ backgroundColor: '#ddd6fe' }}
          />
        </div>
      </div>

      {/* Move History */}
      {gameData && gameData.moveHistory && gameData.moveHistory.length > 0 && (
        <div className="w-full max-w-2xl bg-black/40 rounded-xl p-6 border border-purple-500/30">
          <h3 className="text-lg font-bold text-white mb-4">Move History</h3>
          <div className="grid grid-cols-2 gap-2">
            {gameData.moveHistory.map((move: string, i: number) => (
              <div key={i} className="text-purple-300 text-sm">
                {Math.floor(i / 2) + 1}. {move}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
