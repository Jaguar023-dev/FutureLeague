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
        
        {/* Simple football field */}
        <div style={{
          width: '90%',
          height: '60%',
          background: '#228B22',
          borderRadius: '10px',
          position: 'relative',
          margin: '2rem 0',
          border: '2px solid white'
        }}>
          {/* Center line */}
          <div style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            bottom: 0,
            width: '2px',
            background: 'white',
            transform: 'translateX(-50%)'
          }}></div>
          
          {/* Center circle */}
          <div style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: '60px',
            height: '60px',
            border: '2px solid white',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)'
          }}></div>
          
          {/* Ball */}
          <div style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: '20px',
            height: '20px',
            background: 'white',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            boxShadow: '0 0 10px rgba(0,0,0,0.5)'
          }}></div>
          
          {/* Goals */}
          <div style={{
            position: 'absolute',
            left: '0',
            top: '50%',
            width: '20px',
            height: '80px',
            border: '2px solid white',
            transform: 'translateY(-50%)'
          }}></div>
          <div style={{
            position: 'absolute',
            right: '0',
            top: '50%',
            width: '20px',
            height: '80px',
            border: '2px solid white',
            transform: 'translateY(-50%)'
          }}></div>
        </div>
        
        {/* Score */}
        <div style={{
          display: 'flex',
          gap: '2rem',
          fontSize: '2rem',
          marginBottom: '2rem'
        }}>
          <div>Team A: 0</div>
          <div>Team B: 0</div>
        </div>
        
        {/* Controls */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <button style={{
            background: '#4ade80',
            color: 'white',
            border: 'none',
            padding: '1rem 2rem',
            borderRadius: '10px',
            fontSize: '1rem',
            cursor: 'pointer'
          }}>
            🎯 Shoot
          </button>
          <button style={{
            background: '#3b82f6',
            color: 'white',
            border: 'none',
            padding: '1rem 2rem',
            borderRadius: '10px',
            fontSize: '1rem',
            cursor: 'pointer'
          }}>
            👟 Pass
          </button>
          <button style={{
            background: '#f59e0b',
            color: 'white',
            border: 'none',
            padding: '1rem 2rem',
            borderRadius: '10px',
            fontSize: '1rem',
            cursor: 'pointer'
          }}>
            💨 Sprint
          </button>
        </div>
        
        <button 
          onClick={() => setGameMode('menu')}
          style={{
            background: '#dc2626',
            color: 'white',
            border: 'none',
            padding: '1rem 2rem',
            borderRadius: '10px',
            fontSize: '1rem',
            cursor: 'pointer'
          }}
        >
          ← Back to Menu
        </button>
      </div>
    )
  }

  return (
    // ... your existing menu code ...
  )
}