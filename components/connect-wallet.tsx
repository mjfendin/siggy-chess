'use client'

import { useAccount, useConnect, useDisconnect, useSwitchChain } from 'wagmi'
import { injected } from 'wagmi/connectors'
import { ritual } from '@/lib/wagmi'
import { useEffect } from 'react'

export function ConnectWallet() {
  const { address, isConnected, chain } = useAccount()
  const { connect } = useConnect()
  const { disconnect } = useDisconnect()
  const { switchChain } = useSwitchChain()

  // Auto-switch to Ritual chain when wallet connects
  useEffect(() => {
    if (isConnected && chain?.id !== ritual.id) {
      console.log('Auto-switching to Ritual chain...')
      switchChain({ chainId: ritual.id }).catch((error) => {
        console.log('User rejected chain switch:', error)
      })
    }
  }, [isConnected, chain, switchChain])

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-3">
        <div className="px-4 py-2 bg-purple-900/30 rounded-lg border border-purple-500/30">
          <div className="text-sm text-purple-300">
            {address.slice(0, 6)}...{address.slice(-4)}
          </div>
          <div className="text-xs text-purple-400 mt-1">
            {chain?.name || 'Unknown'}
            {chain?.id !== ritual.id && (
              <span className="ml-1 text-red-400">⚠️</span>
            )}
          </div>
        </div>
        {chain?.id !== ritual.id && (
          <button
            onClick={() => switchChain({ chainId: ritual.id })}
            className="px-4 py-2 bg-yellow-600/20 hover:bg-yellow-600/30 text-yellow-400 rounded-lg border border-yellow-500/30 transition text-sm"
          >
            Switch to Ritual
          </button>
        )}
        <button
          onClick={() => disconnect()}
          className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg border border-red-500/30 transition"
        >
          Disconnect
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={() => connect({ connector: injected() })}
      className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-lg shadow-lg shadow-purple-500/50 transition transform hover:scale-105"
    >
      Connect Wallet
    </button>
  )
}
