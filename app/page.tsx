import { ConnectWallet } from "@/components/connect-wallet";
import { ChessGame } from "@/components/chess-game";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-purple-500/30 bg-black/40 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-4xl">♟️</div>
            <div>
              <h1 className="text-2xl font-bold text-white">Siggy Chess</h1>
              <p className="text-sm text-purple-400">Powered by Ritual AI</p>
            </div>
          </div>
          <ConnectWallet />
        </div>
      </header>

      {/* Main Game */}
      <ChessGame />

      {/* Footer */}
      <footer className="border-t border-purple-500/30 bg-black/40 backdrop-blur-sm mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-purple-400 text-sm">
          <p>Built on Ritual Chain Testnet • Contract: 0x3a3A...2d4e</p>
          <p className="mt-2">
            <a 
              href="https://explorer.ritualfoundation.org/address/0x3a3A628a416A564ba1D968526C2b6889c1B92d4e"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-300 hover:text-purple-200 underline"
            >
              View on Explorer
            </a>
          </p>
        </div>
      </footer>
    </main>
  );
}
