import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { MainMenu } from '@components/Menus/MainMenu';
import { Pitch } from '@components/Game/Pitch';
import { Player3D } from '@components/Game/Player3D';
import { Ball } from '@components/Game/Ball';
import { TouchControls } from '@components/UI/TouchControls';
import { Scoreboard } from '@components/UI/Scoreboard';
import { useGameStore } from '@/stores/gameStore';
import { LoadingScreen } from '@components/UI/LoadingScreen';

function App() {
  const { isPlaying, homeTeamColor, awayTeamColor } = useGameStore();
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading assets
  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="w-screen h-screen bg-gradient-to-b from-gray-900 to-black">
      {!isPlaying ? (
        <MainMenu />
      ) : (
        <>
          {/* Game Canvas */}
          <div className="absolute inset-0">
            <Canvas shadows>
              <Suspense fallback={null}>
                <PerspectiveCamera
                  makeDefault
                  position={[0, 50, 80]}
                  fov={45}
                />
                <OrbitControls
                  enablePan={false}
                  enableZoom={true}
                  minDistance={30}
                  maxDistance={100}
                  maxPolarAngle={Math.PI / 2}
                />
                
                <Environment preset="sunset" />
                
                {/* Lighting */}
                <ambientLight intensity={0.5} />
                <directionalLight
                  position={[50, 100, 50]}
                  intensity={1}
                  castShadow
                  shadow-mapSize-width={2048}
                  shadow-mapSize-height={2048}
                />
                
                <Physics gravity={[0, -9.81, 0]}>
                  <Pitch />
                  
                  {/* Players */}
                  <Player3D
                    player={{
                      id: 'player_1',
                      name: 'Player 1',
                      number: 7,
                      position: 'ST',
                      skinTone: '#d2b48c'
                    }}
                    position={[0, 0.8, -20]}
                    teamColor={homeTeamColor}
                    isUserControlled
                  />
                  
                  <Player3D
                    player={{
                      id: 'player_2',
                      name: 'Player 2',
                      number: 10,
                      position: 'CAM',
                      skinTone: '#8d5524'
                    }}
                    position={[5, 0.8, -15]}
                    teamColor={homeTeamColor}
                  />
                  
                  {/* Opponent players */}
                  <Player3D
                    player={{
                      id: 'opponent_1',
                      name: 'Opponent 1',
                      number: 1,
                      position: 'GK',
                      skinTone: '#f8d9b7'
                    }}
                    position={[0, 0.8, 20]}
                    teamColor={awayTeamColor}
                  />
                  
                  <Ball position={[0, 0.2, 0]} />
                </Physics>
              </Suspense>
            </Canvas>
          </div>
          
          {/* UI Overlay */}
          <Scoreboard />
          <TouchControls />
        </>
      )}
    </div>
  );
}

export default App;