import React, { useState } from 'react'

function App() {
  const [gameMode, setGameMode] = useState<'menu' | 'quick' | 'career' | 'tournament'>('menu')

  const handleQuickMatch = () => {
    setGameMode('quick')
    // Load quick match game
  }

  const handleCareerMode = () => {
    setGameMode('career')
    // Load career mode
  }

  const handleTournament = () => {
    setGameMode('tournament')
    // Load tournament
  }

  if (gameMode === 'quick') {
    return <QuickMatchGame />
  }

  if (gameMode === 'career') {
    return <CareerMode />
  }

  if (gameMode === 'tournament') {
    return <TournamentMode />
  }

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        background: 'rgba(0,0,0,0.8)',
        padding: '3rem',
        borderRadius: '20px',
        textAlign: 'center',
        maxWidth: '90%',
        boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
      }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚽ Future League</h1>
        <p style={{ fontSize: '1.5rem', marginBottom: '2rem', opacity: 0.9 }}>
          Realistic Mobile Football Game
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
          <button 
            onClick={handleQuickMatch}
            style={{
              background: 'linear-gradient(135deg, #4ade80, #22c55e)',
              color: 'white',
              border: 'none',
              padding: '1.2rem 2.5rem',
              borderRadius: '15px',
              fontSize: '1.2rem',
              cursor: 'pointer',
              fontWeight: 'bold',
              boxShadow: '0 4px 15px rgba(34, 197, 94, 0.3)',
              transition: 'transform 0.2s'
            }}
            onMouseEnter={e => (e.target as HTMLElement).style.transform = 'scale(1.05)'}
            onMouseLeave={e => (e.target as HTMLElement).style.transform = 'scale(1)'}
          >
            🎮 Quick Match
          </button>
          
          <button 
            onClick={handleCareerMode}
            style={{
              background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
              color: 'white',
              border: 'none',
              padding: '1.2rem 2.5rem',
              borderRadius: '15px',
              fontSize: '1.2rem',
              cursor: 'pointer',
              fontWeight: 'bold',
              boxShadow: '0 4px 15px rgba(37, 99, 235, 0.3)',
              transition: 'transform 0.2s'
            }}
            onMouseEnter={e => (e.target as HTMLElement).style.transform = 'scale(1.05)'}
            onMouseLeave={e => (e.target as HTMLElement).style.transform = 'scale(1)'}
          >
            🏆 Career Mode
          </button>
          
          <button 
            onClick={handleTournament}
            style={{
              background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
              color: 'white',
              border: 'none',
              padding: '1.2rem 2.5rem',
              borderRadius: '15px',
              fontSize: '1.2rem',
              cursor: 'pointer',
              fontWeight: 'bold',
              boxShadow: '0 4px 15px rgba(124, 58, 237, 0.3)',
              transition: 'transform 0.2s'
            }}
            onMouseEnter={e => (e.target as HTMLElement).style.transform = 'scale(1.05)'}
            onMouseLeave={e => (e.target as HTMLElement).style.transform = 'scale(1)'}
          >
            🌍 Tournament
          </button>
        </div>
        
        <div style={{ marginTop: '2rem', fontSize: '0.9rem', opacity: 0.7 }}>
          <p>🎯 Mobile Touch Controls • ⚡ Realistic Physics • 🌐 Multiple Leagues</p>
          <p style={{ marginTop: '1rem', color: '#4ade80', fontWeight: 'bold' }}>
            ✓ Successfully deployed on Render!
          </p>
        </div>
      </div>
    </div>
  )
}

// Placeholder components - we'll build these next
const QuickMatchGame = () => (
  <div style={{
    width: '100vw',
    height: '100vh',
    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Arial, sans-serif'
  }}>
    <h1>⚽ Quick Match</h1>
    <p>Loading football game engine...</p>
    <button 
      onClick={() => window.location.reload()}
      style={{
        marginTop: '2rem',
        background: '#dc2626',
        color: 'white',
        border: 'none',
        padding: '1rem 2rem',
        borderRadius: '10px',
        cursor: 'pointer'
      }}
    >
      Back to Menu
    </button>
  </div>
)

const CareerMode = () => (
  <div style={{
    width: '100vw',
    height: '100vh',
    background: 'linear-gradient(135deg, #0f766e 0%, #115e59 100%)',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Arial, sans-serif'
  }}>
    <h1>🏆 Career Mode</h1>
    <p>Career mode coming soon...</p>
    <button 
      onClick={() => window.location.reload()}
      style={{
        marginTop: '2rem',
        background: '#dc2626',
        color: 'white',
        border: 'none',
        padding: '1rem 2rem',
        borderRadius: '10px',
        cursor: 'pointer'
      }}
    >
      Back to Menu
    </button>
  </div>
)

const TournamentMode = () => (
  <div style={{
    width: '100vw',
    height: '100vh',
    background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Arial, sans-serif'
  }}>
    <h1>🌍 Tournament</h1>
    <p>Tournament mode coming soon...</p>
    <button 
      onClick={() => window.location.reload()}
      style={{
        marginTop: '2rem',
        background: '#dc2626',
        color: 'white',
        border: 'none',
        padding: '1rem 2rem',
        borderRadius: '10px',
        cursor: 'pointer'
      }}
    >
      Back to Menu
    </button>
  </div>
)

export default App