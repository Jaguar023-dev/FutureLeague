import React from 'react'

interface MainMenuProps {
  onStartGame: () => void
}

export const MainMenu: React.FC<MainMenuProps> = ({ onStartGame }) => {
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
      <div style={{
        textAlign: 'center',
        background: 'rgba(0,0,0,0.7)',
        padding: '3rem',
        borderRadius: '20px',
        maxWidth: '90%',
        boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
      }}>
        <h1 style={{ fontSize: '4rem', marginBottom: '0.5rem' }}>⚽</h1>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>FUTURE LEAGUE</h1>
        <p style={{ fontSize: '1.2rem', opacity: 0.8, marginBottom: '3rem' }}>
          Realistic 3D Football Game
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <button
            onClick={onStartGame}
            style={{
              background: 'linear-gradient(135deg, #4ade80, #22c55e)',
              color: 'white',
              border: 'none',
              padding: '1.5rem 3rem',
              borderRadius: '15px',
              fontSize: '1.5rem',
              cursor: 'pointer',
              fontWeight: 'bold',
              boxShadow: '0 8px 20px rgba(34, 197, 94, 0.4)',
              transition: 'transform 0.2s'
            }}
            onMouseEnter={e => (e.target as HTMLElement).style.transform = 'scale(1.05)'}
            onMouseLeave={e => (e.target as HTMLElement).style.transform = 'scale(1)'}
          >
            🎮 PLAY NOW
          </button>
          
          <button
            onClick={() => alert('Career Mode coming soon!')}
            style={{
              background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
              color: 'white',
              border: 'none',
              padding: '1.2rem 2.5rem',
              borderRadius: '15px',
              fontSize: '1.2rem',
              cursor: 'pointer',
              fontWeight: 'bold',
              boxShadow: '0 6px 15px rgba(37, 99, 235, 0.4)'
            }}
          >
            🏆 Career Mode
          </button>
          
          <button
            onClick={() => alert('Tournament Mode coming soon!')}
            style={{
              background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
              color: 'white',
              border: 'none',
              padding: '1.2rem 2.5rem',
              borderRadius: '15px',
              fontSize: '1.2rem',
              cursor: 'pointer',
              fontWeight: 'bold',
              boxShadow: '0 6px 15px rgba(124, 58, 237, 0.4)'
            }}
          >
            🌍 Tournament
          </button>
          
          <button
            onClick={() => alert('Multiplayer coming soon!')}
            style={{
              background: 'linear-gradient(135deg, #f59e0b, #d97706)',
              color: 'white',
              border: 'none',
              padding: '1.2rem 2.5rem',
              borderRadius: '15px',
              fontSize: '1.2rem',
              cursor: 'pointer',
              fontWeight: 'bold',
              boxShadow: '0 6px 15px rgba(217, 119, 6, 0.4)'
            }}
          >
            👥 Multiplayer
          </button>
        </div>
        
        <div style={{ marginTop: '3rem', fontSize: '0.9rem', opacity: 0.7 }}>
          <p>🎯 Realistic 3D Physics • ⚡ Touch Controls • 🏆 Multiple Leagues</p>
          <p style={{ marginTop: '0.5rem' }}>
            Use touch controls or arrow keys to play!
          </p>
        </div>
      </div>
    </div>
  )
}