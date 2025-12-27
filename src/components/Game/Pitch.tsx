import React, { useRef } from 'react';
import { MeshReflectorMaterial, Plane } from '@react-three/drei';
import { Mesh } from 'three';

export const Pitch: React.FC = () => {
  const pitchRef = useRef<Mesh>(null);
  
  return (
    <group>
      {/* Grass */}
      <Plane
        args={[68, 105]} // FIFA standard dimensions in meters
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.01, 0]}
      >
        <meshStandardMaterial
          color="#228B22"
          roughness={0.8}
          metalness={0.1}
        />
      </Plane>
      
      {/* Pitch markings */}
      <group>
        {/* Center circle */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
          <ringGeometry args={[9.15, 9.25, 64]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        
        {/* Center line */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
          <planeGeometry args={[68, 0.12]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        
        {/* Center spot */}
        <mesh position={[0, 0.03, 0]}>
          <circleGeometry args={[0.1, 16]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        
        {/* Penalty areas */}
        {[-1, 1].map((side) => (
          <group key={side}>
            {/* Penalty box */}
            <mesh
              rotation={[-Math.PI / 2, 0, 0]}
              position={[0, 0.02, side * (52.5 - 16.5)]}
            >
              <planeGeometry args={[40.32, 16.5]} />
              <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
            </mesh>
            
            {/* Goal area */}
            <mesh
              rotation={[-Math.PI / 2, 0, 0]}
              position={[0, 0.02, side * (52.5 - 5.5)]}
            >
              <planeGeometry args={[18.32, 5.5]} />
              <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
            </mesh>
            
            {/* Penalty spot */}
            <mesh position={[0, 0.03, side * (52.5 - 11)]}>
              <circleGeometry args={[0.1, 16]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>
            
            {/* Penalty arc */}
            <mesh
              rotation={[-Math.PI / 2, 0, 0]}
              position={[0, 0.02, side * (52.5 - 11)]}
            >
              <ringGeometry args={[9.15, 9.25, 32, 1, -Math.PI / 2, Math.PI]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>
          </group>
        ))}
        
        {/* Corner arcs */}
        {[
          [-34, 52.5],
          [34, 52.5],
          [-34, -52.5],
          [34, -52.5]
        ].map(([x, z], i) => (
          <mesh
            key={i}
            rotation={[-Math.PI / 2, 0, 0]}
            position={[x, 0.02, z]}
          >
            <ringGeometry args={[0.1, 1, 16, 1, 0, Math.PI / 2]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        ))}
      </group>
      
      {/* Goals */}
      <group>
        {/* Goal 1 */}
        <mesh position={[0, 2.44, 52.5]}>
          <boxGeometry args={[7.32, 0.1, 0.1]} />
          <meshStandardMaterial color="#ffffff" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[-3.66, 1.22, 52.5]}>
          <boxGeometry args={[0.1, 2.44, 0.1]} />
          <meshStandardMaterial color="#ffffff" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[3.66, 1.22, 52.5]}>
          <boxGeometry args={[0.1, 2.44, 0.1]} />
          <meshStandardMaterial color="#ffffff" metalness={0.8} roughness={0.2} />
        </mesh>
        
        {/* Goal 2 */}
        <mesh position={[0, 2.44, -52.5]}>
          <boxGeometry args={[7.32, 0.1, 0.1]} />
          <meshStandardMaterial color="#ffffff" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[-3.66, 1.22, -52.5]}>
          <boxGeometry args={[0.1, 2.44, 0.1]} />
          <meshStandardMaterial color="#ffffff" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[3.66, 1.22, -52.5]}>
          <boxGeometry args={[0.1, 2.44, 0.1]} />
          <meshStandardMaterial color="#ffffff" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>
    </group>
  );
};