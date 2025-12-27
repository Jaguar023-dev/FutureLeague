import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, Circle, Square, Triangle, Cross } from 'lucide-react';
import { useGameStore } from '@/stores/gameStore';

export const TouchControls: React.FC = () => {
  const [joystickPosition, setJoystickPosition] = useState({ x: 0, y: 0 });
  const [isTouching, setIsTouching] = useState(false);
  const joystickRef = useRef<HTMLDivElement>(null);
  const { 
    movePlayer, 
    kickBall, 
    passBall, 
    sprint, 
    togglePlayer 
  } = useGameStore();

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsTouching(true);
    updateJoystick(e.touches[0]);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isTouching) return;
    e.preventDefault();
    updateJoystick(e.touches[0]);
  };

  const handleTouchEnd = () => {
    setIsTouching(false);
    setJoystickPosition({ x: 0, y: 0 });
    movePlayer({ x: 0, y: 0 });
  };

  const updateJoystick = (touch: Touch) => {
    if (!joystickRef.current) return;
    
    const rect = joystickRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = touch.clientX - centerX;
    const deltaY = touch.clientY - centerY;
    
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const maxDistance = rect.width / 2;
    const clampedDistance = Math.min(distance, maxDistance);
    
    const normalizedX = (deltaX / maxDistance) * (clampedDistance / distance) || 0;
    const normalizedY = (deltaY / maxDistance) * (clampedDistance / distance) || 0;
    
    setJoystickPosition({ x: normalizedX, y: normalizedY });
    movePlayer({ x: normalizedX, y: normalizedY });
  };

  const handleActionButton = (action: 'pass' | 'shoot' | 'through' | 'sprint') => {
    switch (action) {
      case 'pass':
        passBall();
        break;
      case 'shoot':
        kickBall();
        break;
      case 'through':
        // Through ball logic
        break;
      case 'sprint':
        sprint();
        break;
    }
  };

  // Handle swipe gestures
  useEffect(() => {
    let touchStartX = 0;
    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      
      const deltaX = touchEndX - touchStartX;
      const deltaY = touchEndY - touchStartY;
      
      // Detect swipe gestures
      if (Math.abs(deltaX) > 50 || Math.abs(deltaY) > 50) {
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          // Horizontal swipe - switch player
          if (deltaX > 0) {
            togglePlayer('next');
          } else {
            togglePlayer('prev');
          }
        }
      }
    };

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [togglePlayer]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Left side - Movement Joystick */}
      <div className="absolute bottom-6 left-6">
        <div
          ref={joystickRef}
          className="w-32 h-32 rounded-full bg-black/30 border-2 border-white/50 
                     backdrop-blur-sm pointer-events-auto touch-none"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Joystick handle */}
          <motion.div
            className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 
                       border-2 border-white shadow-lg absolute top-1/2 left-1/2 
                       -translate-x-1/2 -translate-y-1/2"
            animate={{
              x: joystickPosition.x * 30,
              y: joystickPosition.y * 30
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          />
          
          {/* Direction indicators */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-1 h-4 bg-white/50 rounded-full" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-1 bg-white/50 rounded-full" />
          </div>
        </div>
        
        {/* Instructions */}
        <div className="mt-2 text-white text-xs text-center opacity-70">
          Move Player
        </div>
      </div>

      {/* Right side - Action Buttons */}
      <div className="absolute bottom-6 right-6 flex flex-col items-end gap-4">
        {/* Sprint Button */}
        <motion.button
          className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 
                     border-2 border-white/50 shadow-xl flex items-center justify-center
                     pointer-events-auto touch-none active:scale-95"
          whileTap={{ scale: 0.9 }}
          onTouchStart={() => handleActionButton('sprint')}
        >
          <Gamepad2 className="w-8 h-8 text-white" />
        </motion.button>

        {/* Action Buttons Grid */}
        <div className="grid grid-cols-2 gap-3">
          {/* Pass Button */}
          <motion.button
            className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 
                       border-2 border-white/50 shadow-xl flex items-center justify-center
                       pointer-events-auto touch-none"
            whileTap={{ scale: 0.9 }}
            onTouchStart={() => handleActionButton('pass')}
          >
            <Cross className="w-6 h-6 text-white" />
          </motion.button>

          {/* Shoot Button */}
          <motion.button
            className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-pink-600 
                       border-2 border-white/50 shadow-xl flex items-center justify-center
                       pointer-events-auto touch-none"
            whileTap={{ scale: 0.9 }}
            onTouchStart={() => handleActionButton('shoot')}
          >
            <Circle className="w-6 h-6 text-white" />
          </motion.button>

          {/* Through Ball Button */}
          <motion.button
            className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-500 to-orange-600 
                       border-2 border-white/50 shadow-xl flex items-center justify-center
                       pointer-events-auto touch-none"
            whileTap={{ scale: 0.9 }}
            onTouchStart={() => handleActionButton('through')}
          >
            <Triangle className="w-6 h-6 text-white" />
          </motion.button>

          {/* Player Switch Button */}
          <motion.button
            className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 
                       border-2 border-white/50 shadow-xl flex items-center justify-center
                       pointer-events-auto touch-none"
            whileTap={{ scale: 0.9 }}
            onTouchStart={() => togglePlayer('next')}
          >
            <Square className="w-6 h-6 text-white" />
          </motion.button>
        </div>

        {/* Action Labels */}
        <div className="grid grid-cols-2 gap-3 mt-2">
          <div className="text-white text-xs text-center opacity-70">Pass</div>
          <div className="text-white text-xs text-center opacity-70">Shoot</div>
          <div className="text-white text-xs text-center opacity-70">Through</div>
          <div className="text-white text-xs text-center opacity-70">Switch</div>
        </div>
      </div>

      {/* Swipe Indicator */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 text-white text-xs 
                      bg-black/50 px-4 py-2 rounded-full opacity-70">
        Swipe horizontally to switch players
      </div>

      {/* Settings Button */}
      <button className="absolute top-4 right-4 w-12 h-12 rounded-full bg-black/50 
                         border border-white/30 flex items-center justify-center
                         pointer-events-auto touch-none">
        <span className="text-white text-lg">⚙️</span>
      </button>
    </div>
  );
};