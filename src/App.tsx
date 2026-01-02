import React, { useState } from 'react'
import { FootballGame } from './components/Game/FootballGame'
import { MainMenu } from './components/UI/MainMenu'

function App() {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'paused'>('menu')

  if (gameState === 'playing') {
    return <FootballGame onBackToMenu={() => setGameState('menu')} />
  }

  return <MainMenu onStartGame={() => setGameState('playing')} />
}

export default App