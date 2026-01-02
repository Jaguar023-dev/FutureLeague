import React, { Suspense, useState, useRef, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Physics, RigidBody, BallCollider } from '@react-three/rapier'
import { OrbitControls, Sky, Environment, Text } from '@react-three/drei'
import * as THREE from 'three'
import { useGameStore } from '../../stores/gameStore'
import { TouchControls } from '../UI/TouchControls'
import { Scoreboard } from '../UI/Scoreboard'

// Football field dimensions (FIFA standard)
const PITCH_WIDTH = 68
const PITCH_LENGTH = 105
const GOAL_WIDTH = 7.32
const GOAL_HEIGHT = 2.44

interface FootballGameProps {
  onBackToMenu: () => void
}

export const FootballGame: React.FC<FootballGameProps> = ({ onBackToMenu }) => {
  const [score, setScore] = useState({ home: 0, away: 0 })
  const [time, setTime] = useState(0) // in seconds
  const [isPlaying, setIsPlaying] = useState(true)
  const ballRef = useRef<any>(null)
  const playerRef = useRef<any>(null)

  // Game timer
  useEffect(() => {
    if (!isPlaying) return
    
    const timer = setInterval(() => {
      setTime(prev => {
        if (prev >= 90 * 60) { // 90 minutes
          setIsPlaying(false)
          return prev
        }
        return prev + 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isPlaying])

  const handleShoot = () => {
    if (ballRef.current) {
      const impulse = { x: 0, y: 5, z: -15 }
      ballRef.current.applyImpulse(impulse)
    }
  }

  const handlePass = () => {
    if (ballRef.current) {
      const impulse = { x: 0, y: 2, z: -10 }
      ballRef.current.applyImpulse(impulse)
    }
  }

  const handleGoal = (team: 'home' | 'away') => {
    setScore(prev => ({
      ...prev,
      [team]: prev[team] + 1
    }))
    // Reset ball position
    if (ballRef.current) {
      ballRef.current.setTranslation({ x: 0, y: 0.5, z: 0 })
      ballRef.current.setLinvel({ x: 0, y: 0, z: 0 })
    }
  }

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      {/* 3D Game Canvas */}
      <Canvas
        shadows
        camera={{ position: [0, 30, 40], fov: 60 }}
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
            {/* Football Pitch */}
            <Pitch />
            
            {/* Football Ball */}
            <RigidBody
              ref={ballRef}
              position={[0, 0.5, 0]}
              colliders="ball"
              restitution={0.8}
              friction={0.1}
            >
              <mesh castShadow>
                <sphereGeometry args={[0.11, 32, 32]} />
                <meshStandardMaterial color="white" />
              </mesh>
            </RigidBody>
            
            {/* Player (User Controlled) */}
            <RigidBody
              ref={playerRef}
              position={[0, 1, -20]}
              type="dynamic"
              lockRotations
            >
              <Player color="#2563eb" number={7} />
            </RigidBody>
            
            {/* Teammates */}
            <RigidBody position={[5, 1, -15]} type="dynamic" lockRotations>
              <Player color="#2563eb" number={10} />
            </RigidBody>
            
            <RigidBody position={[-5, 1, -15]} type="dynamic" lockRotations>
              <Player color="#2563eb" number={9} />
            </RigidBody>
            
            {/* Opponents */}
            <RigidBody position={[0, 1, 20]} type="dynamic" lockRotations>
              <Player color="#dc2626" number={1} />
            </RigidBody>
            
            <RigidBody position={[5, 1, 15]} type="dynamic" lockRotations>
              <Player color="#dc2626" number={4} />
            </RigidBody>
            
            <RigidBody position={[-5, 1, 15]} type="dynamic" lockRotations>
              <Player color="#dc2626" number={5} />
            </RigidBody>
            
            {/* Goals */}
            <Goal position={[0, GOAL_HEIGHT/2, PITCH_LENGTH/2]} onGoal={() => handleGoal('away')} />
            <Goal position={[0, GOAL_HEIGHT/2, -PITCH_LENGTH/2]} onGoal={() => handleGoal('home')} />
          </Physics>
          
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            minDistance={20}
            maxDistance={100}
            maxPolarAngle={Math.PI / 2}
          />
          
          {/* Score Display in 3D */}
          <Text
            position={[0, 15, -40]}
            fontSize={3}
            color="white"
            outlineWidth={0.2}
            outlineColor="black"
          >
            {score.home} - {score.away}
          </Text>
        </Suspense>
      </Canvas>

      {/* UI Overlay */}
      <Scoreboard 
        homeScore={score.home}
        awayScore={score.away}
        time={time}
        onPause={() => setIsPlaying(!isPlaying)}
      />
      
      <TouchControls onShoot={handleShoot} onPass={handlePass} />
      
      {/* Back to Menu Button */}
      <button
        onClick={onBackToMenu}
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
        ← Menu
      </button>
    </div>
  )
}

// 3D Player Component
const Player = ({ color, number }: { color: string; number: number }) => {
  return (
    <group>
      {/* Body */}
      <mesh castShadow position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.8, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Head */}
      <mesh castShadow position={[0, 0.9, 0]}>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial color="#d2b48c" />
      </mesh>
      
      {/* Legs */}
      <mesh castShadow position={[-0.1, -0.1, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.6, 8]} />
        <meshStandardMaterial color="black" />
      </mesh>
      
      <mesh castShadow position={[0.1, -0.1, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.6, 8]} />
        <meshStandardMaterial color="black" />
      </mesh>
      
      {/* Player Number */}
      <Text
        position={[0, 0.9, 0.2]}
        fontSize={0.15}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {number}
      </Text>
    </group>
  )
}

// Goal Component with Collision Detection
const Goal = ({ position, onGoal }: { position: [number, number, number]; onGoal: () => void }) => {
  return (
    <group position={position}>
      {/* Goal Posts */}
      <mesh position={[-GOAL_WIDTH/2, 0, 0]}>
        <boxGeometry args={[0.1, GOAL_HEIGHT, 0.1]} />
        <meshStandardMaterial color="white" metalness={0.8} />
      </mesh>
      
      <mesh position={[GOAL_WIDTH/2, 0, 0]}>
        <boxGeometry args={[0.1, GOAL_HEIGHT, 0.1]} />
        <meshStandardMaterial color="white" metalness={0.8} />
      </mesh>
      
      <mesh position={[0, GOAL_HEIGHT/2, 0]}>
        <boxGeometry args={[GOAL_WIDTH, 0.1, 0.1]} />
        <meshStandardMaterial color="white" metalness={0.8} />
      </mesh>
      
      {/* Goal Collision Detection Area */}
      <RigidBody type="fixed" sensor onIntersectionEnter={onGoal}>
        <mesh>
          <boxGeometry args={[GOAL_WIDTH, GOAL_HEIGHT, 2]} />
          <meshBasicMaterial visible={false} />
        </mesh>
      </RigidBody>
    </group>
  )
}

// Pitch Component
const Pitch = () => {
  return (
    <group>
      {/* Grass */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
        <planeGeometry args={[PITCH_WIDTH, PITCH_LENGTH]} />
        <meshStandardMaterial color="#228B22" roughness={0.8} />
      </mesh>
      
      {/* Pitch Markings */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <planeGeometry args={[PITCH_WIDTH, 0.12]} />
        <meshBasicMaterial color="white" />
      </mesh>
      
      {/* Center Circle */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <ringGeometry args={[9.15, 9.25, 32]} />
        <meshBasicMaterial color="white" />
      </mesh>
      
      {/* Penalty Areas */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, PITCH_LENGTH/2 - 16.5]}>
        <planeGeometry args={[40.32, 16.5]} />
        <meshBasicMaterial color="white" transparent opacity={0.3} />
      </mesh>
      
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, -PITCH_LENGTH/2 + 16.5]}>
        <planeGeometry args={[40.32, 16.5]} />
        <meshBasicMaterial color="white" transparent opacity={0.3} />
      </mesh>
    </group>
  )
}