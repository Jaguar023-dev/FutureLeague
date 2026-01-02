import React from 'react'

interface ScoreboardProps {
  homeScore: number
  awayScore: number
  time: number
  onPause: () => void
}

export const Scoreboard: React.FC<ScoreboardProps> = ({ homeScore, awayScore, time, onPause }) => {
  const minutes = Math.floor(time / 60)
  const seconds = time % 60
  
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      background: 'rgba(0,0,0,0.7)',
      color: 'white',
      padding: '10px 20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      zIndex: 100,
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '12px', opacity: 0.7 }}>HOME</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{homeScore}</div>
        </div>
        
        <div style={{ fontSize: '20px', opacity: 0.7 }}>VS</div>
        
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '12px', opacity: 0.7 }}>AWAY</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{awayScore}</div>
        </div>
      </div>
      
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '12px', opacity: 0.7 }}>TIME</div>
        <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
          {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
        </div>
      </div>
      
      <button
        onClick={onPause}
        style={{
          background: 'rgba(255,255,255,0.2)',
          color: 'white',
          border: '1px solid rgba(255,255,255,0.3)',
          padding: '8px 16px',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        ⏸️ Pause
      </button>
    </div>
  )
}