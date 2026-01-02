import React, { useState } from 'react'

function App() {
  const [gameMode, setGameMode] = useState<'menu' | 'game'>('menu')

  if (gameMode === 'game') {
    return (
      <div style={{
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontFamily: 'Arial, sans-serif'
      }}>
        <h1>⚽ Football Match</h1>
        <p>Click buttons to play!</p>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <button 
            onClick={() => alert('Goal! 🎯')}
            style={{
              background: '#ef4444',
              color: 'white',
              border: 'none',
              padding: '1rem 2rem',
              borderRadius: '10px',
              cursor: 'pointer'
            }}
          >
            Shoot
          </button>
          <button 
            onClick={() => alert('Pass! 👟')}
            style={{
              background: '#3b82f6',
              color: 'white',
              border: 'none',
              padding: '1rem 2rem',
              borderRadius: '10px',
              cursor: 'pointer'
            }}
          >
            Pass
          </button>
        </div>
        <button 
          onClick={() => setGameMode('menu')}
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
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
          <button 
            onClick={() => setGameMode('game')}
            style={{
              background: 'linear-gradient(135deg, #4ade80, #22c55e)',
              color: 'white',
              border: 'none',
              padding: '1.2rem 2.5rem',
              borderRadius: '15px',
              fontSize: '1.2rem',
              cursor: 'pointer',
              fontWeight: 'bold',
              boxShadow: '0 4px 15px rgba(34, 197, 94, 0.3)'
            }}
          >
            🎮 PLAY GAME
          </button>
          
          <button 
            onClick={() => alert('Career mode coming soon! 🏆')}
            style={{
              background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
              color: 'white',
              border: 'none',
              padding: '1.2rem 2.5rem',
              borderRadius: '15px',
              fontSize: '1.2rem',
              cursor: 'pointer',
              fontWeight: 'bold',
              boxShadow: '0 4px 15px rgba(37, 99, 235, 0.3)'
            }}
          >
            🏆 Career Mode
          </button>
          
          <button 
            onClick={() => alert('Tournament coming soon! 🌍')}
            style={{
              background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
              color: 'white',
              border: 'none',
              padding: '1.2rem 2.5rem',
              borderRadius: '15px',
              fontSize: '1.2rem',
              cursor: 'pointer',
              fontWeight: 'bold',
              boxShadow: '0 4px 15px rgba(124, 58, 237, 0.3)'
            }}
          >
            🌍 Tournament
          </button>
        </div>
        
        <div style={{ marginTop: '2rem', fontSize: '0.9rem', opacity: 0.7 }}>
          <p>Click PLAY GAME to start the football match!</p>
          <p style={{ marginTop: '0.5rem', color: '#4ade80', fontWeight: 'bold' }}>
            ✓ Game deployed successfully!
          </p>
        </div>
      </div>
    </div>
  )
}

export default App