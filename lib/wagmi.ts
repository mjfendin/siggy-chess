import { http, createConfig } from 'wagmi'
import { ritualTestnet } from 'wagmi/chains'

// Define Ritual Chain
export const ritual = {
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
} as const

export const config = createConfig({
  chains: [ritual],
  transports: {
    [ritual.id]: http(),
  },
})
