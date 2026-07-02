export const SIGGY_CHESS_ADDRESS = "0x3a3A628a416A564ba1D968526C2b6889c1B92d4e" as const;
export const RITUAL_AGENT_ADDRESS = "0x759249105579A9C2286998E9C207eA059BB3cA1d" as const;
export const RITUAL_CHAIN_ID = 1979;

export const SIGGY_CHESS_ABI = [
  {
    "type": "constructor",
    "inputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "ABANDON_TIMEOUT",
    "inputs": [],
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "STARTING_FEN",
    "inputs": [],
    "outputs": [{"name": "", "type": "string"}],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "abandonGame",
    "inputs": [{"name": "gameId", "type": "uint256"}],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "aiMove",
    "inputs": [
      {"name": "gameId", "type": "uint256"},
      {"name": "move", "type": "string"},
      {"name": "newFen", "type": "string"}
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "authorizedAgents",
    "inputs": [{"name": "", "type": "address"}],
    "outputs": [{"name": "", "type": "bool"}],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "createGame",
    "inputs": [
      {"name": "ritualAgent", "type": "address"},
      {"name": "difficulty", "type": "uint8"}
    ],
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "endGame",
    "inputs": [
      {"name": "gameId", "type": "uint256"},
      {"name": "finalStatus", "type": "uint8"}
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "gameIdCounter",
    "inputs": [],
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "games",
    "inputs": [{"name": "", "type": "uint256"}],
    "outputs": [
      {"name": "player", "type": "address"},
      {"name": "ritualAgent", "type": "address"},
      {"name": "status", "type": "uint8"},
      {"name": "fen", "type": "string"},
      {"name": "moveCount", "type": "uint256"},
      {"name": "lastMoveTime", "type": "uint256"},
      {"name": "createdAt", "type": "uint256"},
      {"name": "difficulty", "type": "uint8"}
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getCurrentPosition",
    "inputs": [{"name": "gameId", "type": "uint256"}],
    "outputs": [{"name": "", "type": "string"}],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getGame",
    "inputs": [{"name": "gameId", "type": "uint256"}],
    "outputs": [
      {
        "name": "",
        "type": "tuple",
        "components": [
          {"name": "player", "type": "address"},
          {"name": "ritualAgent", "type": "address"},
          {"name": "status", "type": "uint8"},
          {"name": "fen", "type": "string"},
          {"name": "moveCount", "type": "uint256"},
          {"name": "lastMoveTime", "type": "uint256"},
          {"name": "createdAt", "type": "uint256"},
          {"name": "moveHistory", "type": "string[]"},
          {"name": "difficulty", "type": "uint8"}
        ]
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getMoveHistory",
    "inputs": [{"name": "gameId", "type": "uint256"}],
    "outputs": [{"name": "", "type": "string[]"}],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getPlayerGames",
    "inputs": [{"name": "player", "type": "address"}],
    "outputs": [{"name": "", "type": "uint256[]"}],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "makeMove",
    "inputs": [
      {"name": "gameId", "type": "uint256"},
      {"name": "move", "type": "string"},
      {"name": "newFen", "type": "string"}
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "owner",
    "inputs": [],
    "outputs": [{"name": "", "type": "address"}],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "playerGames",
    "inputs": [
      {"name": "", "type": "address"},
      {"name": "", "type": "uint256"}
    ],
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "setAuthorizedAgent",
    "inputs": [
      {"name": "agent", "type": "address"},
      {"name": "authorized", "type": "bool"}
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "event",
    "name": "AIMove",
    "inputs": [
      {"name": "gameId", "type": "uint256", "indexed": true},
      {"name": "ritualAgent", "type": "address", "indexed": true},
      {"name": "move", "type": "string", "indexed": false},
      {"name": "newFen", "type": "string", "indexed": false}
    ]
  },
  {
    "type": "event",
    "name": "AgentAuthorized",
    "inputs": [
      {"name": "agent", "type": "address", "indexed": true},
      {"name": "authorized", "type": "bool", "indexed": false}
    ]
  },
  {
    "type": "event",
    "name": "GameCreated",
    "inputs": [
      {"name": "gameId", "type": "uint256", "indexed": true},
      {"name": "player", "type": "address", "indexed": true},
      {"name": "ritualAgent", "type": "address", "indexed": false},
      {"name": "difficulty", "type": "uint8", "indexed": false}
    ]
  },
  {
    "type": "event",
    "name": "GameEnded",
    "inputs": [
      {"name": "gameId", "type": "uint256", "indexed": true},
      {"name": "finalStatus", "type": "uint8", "indexed": false},
      {"name": "winner", "type": "address", "indexed": false}
    ]
  },
  {
    "type": "event",
    "name": "PlayerMove",
    "inputs": [
      {"name": "gameId", "type": "uint256", "indexed": true},
      {"name": "player", "type": "address", "indexed": true},
      {"name": "move", "type": "string", "indexed": false},
      {"name": "newFen", "type": "string", "indexed": false}
    ]
  }
] as const;

export const GameStatus = {
  WAITING_FOR_AI: 0,
  IN_PROGRESS: 1,
  WAITING_AI_MOVE: 2,
  PLAYER_WON: 3,
  AI_WON: 4,
  DRAW: 5,
  ABANDONED: 6,
} as const;

export const GameStatusLabel = {
  [GameStatus.WAITING_FOR_AI]: "Waiting for AI",
  [GameStatus.IN_PROGRESS]: "Your Turn",
  [GameStatus.WAITING_AI_MOVE]: "AI Thinking...",
  [GameStatus.PLAYER_WON]: "You Won! 🎉",
  [GameStatus.AI_WON]: "AI Won 🤖",
  [GameStatus.DRAW]: "Draw",
  [GameStatus.ABANDONED]: "Abandoned",
} as const;
