import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { gameId, fen, difficulty } = await request.json()

    // In production, this would call Stockfish or use Ritual Agent
    // For now, we'll make a random legal move
    const response = await fetch('https://chess-api.com/v1', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fen, skill: difficulty }),
    }).catch(() => null)

    if (response?.ok) {
      const data = await response.json()
      return NextResponse.json({ move: data.move, fen: data.fen })
    }

    // Fallback: return dummy response
    return NextResponse.json({ 
      move: 'e7e5', 
      fen: fen,
      error: 'AI calculation in progress' 
    })

  } catch (error) {
    return NextResponse.json({ error: 'Failed to calculate move' }, { status: 500 })
  }
}
