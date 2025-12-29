import React from 'react'

function App() {
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
        <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>⚽</div>
        <h1 style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>Future League</h1>
        <p style={{ fontSize: '1.5rem', marginBottom: '2rem', opacity: 0.9 }}>
          Realistic Mobile Football Game
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
          <button style={{
            background: 'linear-gradient(135deg, #4ade80, #22c55e)',
            color: 'white',
            border: 'none',
            padding: '1.2rem 2.5rem',
            borderRadius: '15px',
            fontSize: '1.2rem',
            cursor: 'pointer',
            fontWeight: 'bold',
            boxShadow: '0 4px 15px rgba(34, 197, 94, 0.3)'
          }}>
            🎮 Quick Match
          </button>
          
          <button style={{
            background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
            color: 'white',
            border: 'none',
            padding: '1.2rem 2.5rem',
            borderRadius: '15px',
            fontSize: '1.2rem',
            cursor: 'pointer',
            fontWeight: 'bold',
            boxShadow: '0 4px 15px rgba(37, 99, 235, 0.3)'
          }}>
            🏆 Career Mode
          </button>
          
          <button style={{
            background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
            color: 'white',
            border: 'none',
            padding: '1.2rem 2.5rem',
            borderRadius: '15px',
            fontSize: '1.2rem',
            cursor: 'pointer',
            fontWeight: 'bold',
            boxShadow: '0 4px 15px rgba(124, 58, 237, 0.3)'
          }}>
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

export default App