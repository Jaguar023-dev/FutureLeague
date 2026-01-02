import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Box, Sphere, Cylinder } from '@react-three/drei'
import * as THREE from 'three'

interface PlayerProps {
  position: [number, number, number]
  color: string
  number: number
  isUserControlled?: boolean
}

export const Player: React.FC<PlayerProps> = ({
  position,
  color,
  number,
  isUserControlled = false
}) => {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (groupRef.current && isUserControlled) {
      // Add player movement logic here
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Body */}
      <Cylinder args={[0.2, 0.2, 0.8, 8]} position={[0, 0.4, 0]}>
        <meshStandardMaterial color={color} />
      </Cylinder>

      {/* Head */}
      <Sphere args={[0.18, 16, 16]} position={[0, 0.9, 0]}>
        <meshStandardMaterial color="#d2b48c" />
      </Sphere>

      {/* Legs */}
      <Cylinder args={[0.08, 0.08, 0.6, 8]} position={[-0.1, -0.1, 0]}>
        <meshStandardMaterial color="black" />
      </Cylinder>
      <Cylinder args={[0.08, 0.08, 0.6, 8]} position={[0.1, -0.1, 0]}>
        <meshStandardMaterial color="black" />
      </Cylinder>

      {/* Arms */}
      <Cylinder args={[0.06, 0.06, 0.5, 8]} position={[-0.3, 0.4, 0]} rotation={[0, 0, Math.PI / 4]}>
        <meshStandardMaterial color="#d2b48c" />
      </Cylinder>
      <Cylinder args={[0.06, 0.06, 0.5, 8]} position={[0.3, 0.4, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <meshStandardMaterial color="#d2b48c" />
      </Cylinder>

      {/* Player Number */}
      <mesh position={[0, 0.9, 0.2]}>
        <planeGeometry args={[0.3, 0.4]} />
        <meshBasicMaterial color="white" />
      </mesh>
    </group>
  )
}