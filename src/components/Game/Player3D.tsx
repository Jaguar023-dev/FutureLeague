import React, { useRef, useEffect, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Mesh, MeshStandardMaterial, TextureLoader, Vector3 } from 'three';
import { Player } from '@data/players';
import { useGameStore } from '@/stores/gameStore';

interface Player3DProps {
  player: Player;
  position: Vector3;
  rotation?: number;
  isUserControlled?: boolean;
  teamColor: string;
}

export const Player3D: React.FC<Player3DProps> = ({
  player,
  position,
  rotation = 0,
  isUserControlled = false,
  teamColor
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const [model, setModel] = useState<THREE.Group | null>(null);
  const { selectedPlayer } = useGameStore();
  
  // Load player model
  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load(
      '/assets/models/players/base_player.glb',
      (gltf) => {
        setModel(gltf.scene);
        
        // Apply team color to materials
        gltf.scene.traverse((child) => {
          if (child instanceof Mesh && child.material instanceof MeshStandardMaterial) {
            if (child.name.includes('Jersey')) {
              child.material.color.set(teamColor);
            }
          }
        });
      },
      undefined,
      (error) => {
        console.error('Error loading player model:', error);
        // Fallback to primitive model
        setModel(createPrimitiveModel());
      }
    );
  }, [teamColor]);
  
  const createPrimitiveModel = () => {
    // Fallback primitive model
    const group = new THREE.Group();
    
    // Body (cylinder for better rotation)
    const bodyGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.8, 8);
    const bodyMaterial = new THREE.MeshStandardMaterial({ color: teamColor });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.4;
    group.add(body);
    
    // Head
    const headGeometry = new THREE.SphereGeometry(0.18, 16, 16);
    const headMaterial = new THREE.MeshStandardMaterial({ 
      color: player.skinTone || '#d2b48c' 
    });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 1.0;
    group.add(head);
    
    // Legs
    const legGeometry = new THREE.CylinderGeometry(0.08, 0.08, 0.6, 8);
    const legMaterial = new THREE.MeshStandardMaterial({ color: '#000000' });
    
    const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
    leftLeg.position.set(-0.1, -0.1, 0);
    group.add(leftLeg);
    
    const rightLeg = new THREE.Mesh(legGeometry, legMaterial);
    rightLeg.position.set(0.1, -0.1, 0);
    group.add(rightLeg);
    
    // Arms
    const armGeometry = new THREE.CylinderGeometry(0.06, 0.06, 0.5, 8);
    const armMaterial = new THREE.MeshStandardMaterial({ 
      color: player.skinTone || '#d2b48c' 
    });
    
    const leftArm = new THREE.Mesh(armGeometry, armMaterial);
    leftArm.position.set(-0.3, 0.4, 0);
    leftArm.rotation.z = Math.PI / 4;
    group.add(leftArm);
    
    const rightArm = new THREE.Mesh(armGeometry, armMaterial);
    rightArm.position.set(0.3, 0.4, 0);
    rightArm.rotation.z = -Math.PI / 4;
    group.add(rightArm);
    
    return group;
  };
  
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.position.lerp(position, 0.2);
      groupRef.current.rotation.y = rotation;
      
      // Highlight selected player
      if (isUserControlled || selectedPlayer?.id === player.id) {
        groupRef.current.scale.setScalar(1.05);
      } else {
        groupRef.current.scale.setScalar(1);
      }
    }
  });
  
  return (
    <group ref={groupRef}>
      {model ? (
        <primitive object={model} />
      ) : (
        // Loading fallback
        <mesh position={[0, 1, 0]}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial color={teamColor} />
        </mesh>
      )}
      
      {/* Player number */}
      <mesh position={[0, 1.8, 0.3]}>
        <planeGeometry args={[0.3, 0.4]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      
      {/* Selection indicator */}
      {isUserControlled && (
        <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.4, 0.5, 16]} />
          <meshBasicMaterial color="#00ff00" transparent opacity={0.5} />
        </mesh>
      )}
    </group>
  );
};