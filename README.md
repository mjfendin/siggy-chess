# Siggy Chess

AI-powered chess game on Ritual Chain with TEE-secured moves.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

## 🎮 Features

- ♟️ Play chess against Ritual AI
- 🔐 TEE-secured AI moves
- 🎨 Beautiful Siggy-themed UI
- ⛓️ Fully on-chain game state
- 📊 Move history tracking
- 🎯 Adjustable difficulty (1-10)

## 📦 Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Blockchain**: Wagmi, Viem
- **Chess**: chess.js, react-chessboard
- **Styling**: Tailwind CSS
- **AI Backend**: Python + Web3.py

## 🔧 Environment Variables

Create `.env.local`:

```
NEXT_PUBLIC_RITUAL_RPC=https://rpc.ritualfoundation.org
NEXT_PUBLIC_CONTRACT_ADDRESS=0x3a3A628a416A564ba1D968526C2b6889c1B92d4e
NEXT_PUBLIC_RITUAL_AGENT=0x759249105579A9C2286998E9C207eA059BB3cA1d
```

## 🤖 Run Ritual Agent

```bash
pip install web3 python-chess
python ritual-agent.py
```

## 🌐 Deploy to Vercel

```bash
vercel
```

## 📝 Smart Contract

- **Address**: `0x3a3A628a416A564ba1D968526C2b6889c1B92d4e`
- **Chain**: Ritual Testnet (1979)
- **Explorer**: https://explorer.ritualfoundation.org/address/0x3a3A628a416A564ba1D968526C2b6889c1B92d4e

## 🎯 How It Works

1. Player connects wallet and creates game
2. Player makes move → emits `PlayerMove` event
3. Ritual Agent listens to event
4. AI calculates best move in TEE
5. AI calls `aiMove()` → updates on-chain state
6. Frontend updates board automatically

## 📄 License

MIT
