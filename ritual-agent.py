#!/usr/bin/env python3
"""
Ritual Agent Chess Engine Integration
Listens to PlayerMove events and responds with AI moves via TEE
"""
import asyncio
import json
from web3 import Web3
from web3.middleware import ExtraDataToPOAMiddleware

RPC_URL = "https://rpc.ritualfoundation.org"
PRIVATE_KEY = "0xREDACTED_PRIVATE_KEY"
CONTRACT_ADDRESS = "0x3a3A628a416A564ba1D968526C2b6889c1B92d4e"

ABI = [
    {
        "name": "PlayerMove",
        "type": "event",
        "inputs": [
            {"name": "gameId", "type": "uint256", "indexed": True},
            {"name": "player", "type": "address", "indexed": True},
            {"name": "move", "type": "string", "indexed": False},
            {"name": "newFen", "type": "string", "indexed": False}
        ]
    },
    {
        "name": "aiMove",
        "type": "function",
        "inputs": [
            {"name": "gameId", "type": "uint256"},
            {"name": "move", "type": "string"},
            {"name": "newFen", "type": "string"}
        ],
        "outputs": []
    }
]

def calculate_best_move(fen: str, difficulty: int = 5) -> tuple[str, str]:
    """
    Calculate best move using chess engine
    In production: integrate with Stockfish in TEE
    """
    try:
        from chess import Board, engine
        
        board = Board(fen)
        
        # Simple random legal move for demo
        legal_moves = list(board.legal_moves)
        if not legal_moves:
            return None, None
            
        move = legal_moves[0]  # In production: use Stockfish with depth based on difficulty
        board.push(move)
        
        return move.uci(), board.fen()
    except:
        # Fallback
        return "e7e5", fen

async def listen_for_moves():
    """Listen to PlayerMove events and respond"""
    w3 = Web3(Web3.HTTPProvider(RPC_URL))
    w3.middleware_onion.inject(ExtraDataToPOAMiddleware, layer=0)
    
    account = w3.eth.account.from_key(PRIVATE_KEY)
    contract = w3.eth.contract(address=CONTRACT_ADDRESS, abi=ABI)
    
    print(f"🤖 Ritual Chess Agent listening...")
    print(f"Agent: {account.address}")
    print(f"Contract: {CONTRACT_ADDRESS}\n")
    
    # Get current block
    from_block = w3.eth.block_number
    
    while True:
        try:
            # Poll for new PlayerMove events
            events = contract.events.PlayerMove.get_logs(
                fromBlock=from_block,
                toBlock='latest'
            )
            
            for event in events:
                game_id = event['args']['gameId']
                player_move = event['args']['move']
                new_fen = event['args']['newFen']
                
                print(f"📥 Player moved: {player_move} (Game {game_id})")
                print(f"   FEN: {new_fen}")
                
                # Calculate AI response
                print("🧠 Calculating best move...")
                ai_move, ai_fen = calculate_best_move(new_fen)
                
                if not ai_move:
                    print("❌ No legal moves available")
                    continue
                
                print(f"🤖 AI responds: {ai_move}")
                
                # Send move to contract
                tx = contract.functions.aiMove(
                    game_id,
                    ai_move,
                    ai_fen or new_fen
                ).build_transaction({
                    'from': account.address,
                    'nonce': w3.eth.get_transaction_count(account.address),
                    'maxFeePerGas': w3.to_wei(20, 'gwei'),
                    'maxPriorityFeePerGas': w3.to_wei(1, 'gwei'),
                    'chainId': 1979,
                })
                
                signed = w3.eth.account.sign_transaction(tx, PRIVATE_KEY)
                tx_hash = w3.eth.send_raw_transaction(signed.raw_transaction)
                
                print(f"✅ AI move sent: {tx_hash.hex()}\n")
                
            from_block = w3.eth.block_number
            
            # Wait 5 seconds before next poll
            await asyncio.sleep(5)
            
        except Exception as e:
            print(f"❌ Error: {e}")
            await asyncio.sleep(10)

if __name__ == "__main__":
    asyncio.run(listen_for_moves())
