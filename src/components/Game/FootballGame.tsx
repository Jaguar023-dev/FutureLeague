import React, { Suspense, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sky, Environment, Stats } from '@react-three/drei'
import { Physics } from '@react-three/rapier'
import { Pitch } from './Pitch'
import { Player } from './Player'
import { Ball } from './Ball'
import { TouchControls } from '../UI/TouchControls'
import { Scoreboard } from '../UI/Scoreboard'

export const FootballGame: React.FC = () => {
  const [score, setScore] = useState({ home: 0, away: 0 })
  const [time, setTime] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  useEffect(() => {
    if (!isPlaying) return
    
    const timer = setInterval(() => {
      setTime(prev => {
        if (prev >= 90 * 60) { // 90 minutes in seconds
          setIsPlaying(false)
          return prev
        }
        return prev + 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isPlaying])

  const handleGoal = (team: 'home' | 'away') => {
    setScore(prev => ({
      ...prev,
      [team]: prev[team] + 1
    }))
  }

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      {/* 3D Canvas */}
      <Canvas
        shadows
        camera={{ position: [0, 50, 80], fov: 45 }}
        style={{ background: '#87CEEB' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[50, 100, 50]}
            intensity={1}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          
          <Sky sunPosition={[100, 20, 100]} />
          <Environment preset="sunset" />
          
          <Physics gravity={[0, -9.81, 0]}>
            <Pitch />
            <Ball position={[0, 0.2, 0]} onGoal={handleGoal} />
            
            {/* Players */}
            <Player
              position={[0, 0.8, -20]}
              color="#2563eb"
              number={7}
              isUserControlled
            />
            <Player
              position={[5, 0.8, -15]}
              color="#2563eb"
              number={10}
            />
            <Player
              position={[-5, 0.8, -15]}
              color="#2563eb"
              number={9}
            />
            
            {/* Opponents */}
            <Player
              position={[0, 0.8, 20]}
              color="#dc2626"
              number={1}
            />
            <Player
              position={[5, 0.8, 15]}
              color="#dc2626"
              number={4}
            />
            <Player
              position={[-5, 0.8, 15]}
              color="#dc2626"
              number={5}
            />
          </Physics>
          
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            minDistance={30}
            maxDistance={100}
            maxPolarAngle={Math.PI / 2}
          />
          <Stats />
        </Suspense>
      </Canvas>

      {/* UI Overlay */}
      <Scoreboard 
        homeScore={score.home}
        awayScore={score.away}
        time={time}
        onPause={() => setIsPlaying(!isPlaying)}
      />
      
      <TouchControls />
      
      {/* Back to Menu Button */}
      <button
        onClick={() => window.location.reload()}
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          background: 'rgba(0,0,0,0.7)',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '10px',
          cursor: 'pointer',
          zIndex: 100
        }}
      >
        ← Back to Menu
      </button>
    </div>
  )
}