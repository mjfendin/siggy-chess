import { http, createConfig } from 'wagmi'
import { defineChain } from 'viem'

// Define Ritual Chain
export const ritual = defineChain({
  id: 1979,
  name: 'Ritual',
  nativeCurrency: { name: 'Ritual', symbol: 'RITUAL', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://rpc.ritualfoundation.org'] },
  },
  blockExplorers: {
    default: { name: 'Ritual Explorer', url: 'https://explorer.ritualfoundation.org' },
  },
  testnet: true,
})

export const config = createConfig({
  chains: [ritual],
  transports: {
    [ritual.id]: http(),
  },
})
