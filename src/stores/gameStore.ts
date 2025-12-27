import { create } from 'zustand';
import { Vector3 } from 'three';

interface GameState {
  // Game state
  isPlaying: boolean;
  isPaused: boolean;
  matchTime: number;
  score: [number, number];
  currentMinute: number;
  
  // Player state
  selectedPlayerId: string | null;
  players: Record<string, PlayerState>;
  ballPosition: Vector3;
  ballVelocity: Vector3;
  
  // Teams
  homeTeamId: string | null;
  awayTeamId: string | null;
  homeTeamColor: string;
  awayTeamColor: string;
  
  // Controls
  playerMovement: { x: number; y: number };
  isSprinting: boolean;
  
  // Actions
  startMatch: (homeTeamId: string, awayTeamId: string) => void;
  pauseMatch: () => void;
  resumeMatch: () => void;
  endMatch: () => void;
  movePlayer: (movement: { x: number; y: number }) => void;
  kickBall: () => void;
  passBall: () => void;
  sprint: (sprinting?: boolean) => void;
  togglePlayer: (direction: 'next' | 'prev') => void;
  updateBallPosition: (position: Vector3) => void;
  updateBallVelocity: (velocity: Vector3) => void;
  scoreGoal: (team: 'home' | 'away') => void;
  resetGame: () => void;
}

interface PlayerState {
  id: string;
  position: Vector3;
  rotation: number;
  velocity: Vector3;
  stamina: number;
  isSelected: boolean;
}

export const useGameStore = create<GameState>((set, get) => ({
  // Initial state
  isPlaying: false,
  isPaused: false,
  matchTime: 0,
  score: [0, 0],
  currentMinute: 0,
  
  selectedPlayerId: null,
  players: {},
  ballPosition: new Vector3(0, 0.2, 0),
  ballVelocity: new Vector3(0, 0, 0),
  
  homeTeamId: null,
  awayTeamId: null,
  homeTeamColor: '#2563eb',
  awayTeamColor: '#dc2626',
  
  playerMovement: { x: 0, y: 0 },
  isSprinting: false,
  
  // Actions
  startMatch: (homeTeamId, awayTeamId) => {
    set({
      isPlaying: true,
      isPaused: false,
      matchTime: 0,
      score: [0, 0],
      homeTeamId,
      awayTeamId,
      selectedPlayerId: 'player_1' // Initial player
    });
  },
  
  pauseMatch: () => set({ isPaused: true }),
  
  resumeMatch: () => set({ isPaused: false }),
  
  endMatch: () => set({ isPlaying: false, isPaused: false }),
  
  movePlayer: (movement) => {
    set({ playerMovement: movement });
    
    // Update selected player position
    const state = get();
    if (state.selectedPlayerId) {
      const player = state.players[state.selectedPlayerId];
      if (player) {
        const newPosition = player.position.clone();
        newPosition.x += movement.x * (state.isSprinting ? 1.5 : 1);
        newPosition.z += movement.y * (state.isSprinting ? 1.5 : 1);
        
        set({
          players: {
            ...state.players,
            [state.selectedPlayerId]: {
              ...player,
              position: newPosition,
              velocity: new Vector3(movement.x, 0, movement.y)
            }
          }
        });
      }
    }
  },
  
  kickBall: () => {
    const state = get();
    if (state.selectedPlayerId) {
      const player = state.players[state.selectedPlayerId];
      if (player) {
        // Calculate kick direction
        const direction = new Vector3(
          Math.sin(player.rotation),
          0.3, // Add some lift
          Math.cos(player.rotation)
        ).normalize();
        
        // Apply kick force
        const newVelocity = direction.multiplyScalar(30); // Kick power
        set({ ballVelocity: newVelocity });
      }
    }
  },
  
  passBall: () => {
    // Similar to kick but with less power
    const state = get();
    if (state.selectedPlayerId) {
      const player = state.players[state.selectedPlayerId];
      if (player) {
        const direction = new Vector3(
          Math.sin(player.rotation),
          0.1,
          Math.cos(player.rotation)
        ).normalize();
        
        const newVelocity = direction.multiplyScalar(20);
        set({ ballVelocity: newVelocity });
      }
    }
  },
  
  sprint: (sprinting) => {
    set({ isSprinting: sprinting ?? !get().isSprinting });
    
    // Reduce stamina when sprinting
    if (sprinting ?? !get().isSprinting) {
      const state = get();
      if (state.selectedPlayerId) {
        const player = state.players[state.selectedPlayerId];
        if (player && player.stamina > 0) {
          set({
            players: {
              ...state.players,
              [state.selectedPlayerId]: {
                ...player,
                stamina: player.stamina - 0.5
              }
            }
          });
        }
      }
    }
  },
  
  togglePlayer: (direction) => {
    const state = get();
    const playerIds = Object.keys(state.players);
    if (playerIds.length === 0) return;
    
    const currentIndex = state.selectedPlayerId 
      ? playerIds.indexOf(state.selectedPlayerId)
      : -1;
    
    let newIndex = currentIndex;
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % playerIds.length;
    } else {
      newIndex = (currentIndex - 1 + playerIds.length) % playerIds.length;
    }
    
    set({ selectedPlayerId: playerIds[newIndex] });
  },
  
  updateBallPosition: (position) => set({ ballPosition: position }),
  
  updateBallVelocity: (velocity) => set({ ballVelocity: velocity }),
  
  scoreGoal: (team) => {
    const state = get();
    if (team === 'home') {
      set({ score: [state.score[0] + 1, state.score[1]] });
    } else {
      set({ score: [state.score[0], state.score[1] + 1] });
    }
  },
  
  resetGame: () => {
    set({
      isPlaying: false,
      isPaused: false,
      matchTime: 0,
      score: [0, 0],
      currentMinute: 0,
      selectedPlayerId: null,
      players: {},
      ballPosition: new Vector3(0, 0.2, 0),
      ballVelocity: new Vector3(0, 0, 0),
      playerMovement: { x: 0, y: 0 },
      isSprinting: false
    });
  }
}));