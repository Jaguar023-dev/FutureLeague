import React, { useState } from 'react'

export const SimpleFootball: React.FC = () => {
  const [scoreA, setScoreA] = useState(0)
  const [scoreB, setScoreB] = useState(0)
  
  const handleShoot = () => {
    if (Math.random() > 0.5) {
      setScoreA(prev => prev + 1)
      alert('GOAL! Team A scores!')
    } else {
      alert('Shot missed!')
    }
  }
  
  const handlePass = () => {
    alert('Pass completed!')
  }

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
      <h1>⚽ Future League Match</h1>
      
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '80%',
        margin: '2rem 0',
        fontSize: '2rem'
      }}>
        <div>Team A: {scoreA}</div>
        <div>VS</div>
        <div>Team B: {scoreB}</div>
      </div>
      
      <div style={{
        width: '90%',
        height: '50%',
        background: '#228B22',
        borderRadius: '10px',
        position: 'relative',
        margin: '2rem 0',
        border: '3px solid white'
      }}>
        {/* Field markings */}
        <div style={{
          position: 'absolute',
          left: '50%',
          top: 0,
          bottom: 0,
          width: '3px',
          background: 'white',
          transform: 'translateX(-50%)'
        }}></div>
        
        <div style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: '80px',
          height: '80px',
          border: '3px solid white',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)'
        }}></div>
      </div>
      
      <div style={{
        display: 'flex',
        gap: '1rem',
        margin: '2rem 0'
      }}>
        <button 
          onClick={handleShoot}
          style={{
            background: '#ef4444',
            color: 'white',
            border: 'none',
            padding: '1rem 2rem',
            borderRadius: '10px',
            fontSize: '1.2rem',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          🎯 SHOOT
        </button>
        <button 
          onClick={handlePass}
          style={{
            background: '#3b82f6',
            color: 'white',
            border: 'none',
            padding: '1rem 2rem',
            borderRadius: '10px',
            fontSize: '1.2rem',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          👟 PASS
        </button>
      </div>
      
      <button 
        onClick={() => window.location.reload()}
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
