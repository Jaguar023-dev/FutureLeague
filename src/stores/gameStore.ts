import { create } from 'zustand'

interface GameState {
  isPlaying: boolean
  score: { home: number; away: number }
  time: number
  playerPosition: { x: number; z: number }
  ballPosition: { x: number; y: number; z: number }
  
  startGame: () => void
  pauseGame: () => void
  scoreGoal: (team: 'home' | 'away') => void
  updatePlayerPosition: (x: number, z: number) => void
  updateBallPosition: (x: number, y: number, z: number) => void
}

export const useGameStore = create<GameState>((set) => ({
  isPlaying: false,
  score: { home: 0, away: 0 },
  time: 0,
  playerPosition: { x: 0, z: -20 },
  ballPosition: { x: 0, y: 0.5, z: 0 },
  
  startGame: () => set({ isPlaying: true, time: 0, score: { home: 0, away: 0 } }),
  pauseGame: () => set((state) => ({ isPlaying: !state.isPlaying })),
  scoreGoal: (team) => set((state) => ({
    score: {
      ...state.score,
      [team]: state.score[team] + 1
    }
  })),
  updatePlayerPosition: (x, z) => set({ playerPosition: { x, z } }),
  updateBallPosition: (x, y, z) => set({ ballPosition: { x, y, z } })
}))