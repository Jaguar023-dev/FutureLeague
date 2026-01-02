import React, { useState, useRef, useEffect } from 'react'

interface TouchControlsProps {
  onShoot: () => void
  onPass: () => void
}

export const TouchControls: React.FC<TouchControlsProps> = ({ onShoot, onPass }) => {
  const [joystickPos, setJoystickPos] = useState({ x: 0, y: 0 })
  const joystickRef = useRef<HTMLDivElement>(null)
  const [isTouching, setIsTouching] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch(e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          setJoystickPos({ x: 0, y: -1 })
          break
        case 'ArrowDown':
        case 's':
        case 'S':
          setJoystickPos({ x: 0, y: 1 })
          break
        case 'ArrowLeft':
        case 'a':
        case 'A':
          setJoystickPos({ x: -1, y: 0 })
          break
        case 'ArrowRight':
        case 'd':
        case 'D':
          setJoystickPos({ x: 1, y: 0 })
          break
        case ' ':
          onShoot()
          break
        case 'p':
        case 'P':
          onPass()
          break
      }
    }

    const handleKeyUp = () => {
      setJoystickPos({ x: 0, y: 0 })
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [onShoot, onPass])

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsTouching(true)
    updateJoystick(e.touches[0])
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isTouching) return
    e.preventDefault()
    updateJoystick(e.touches[0])
  }

  const handleTouchEnd = () => {
    setIsTouching(false)
    setJoystickPos({ x: 0, y: 0 })
  }

  const updateJoystick = (touch: Touch) => {
    if (!joystickRef.current) return
    
    const rect = joystickRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const deltaX = touch.clientX - centerX
    const deltaY = touch.clientY - centerY
    
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
    const maxDistance = rect.width / 2
    
    const normalizedX = Math.min(Math.max(deltaX / maxDistance, -1), 1)
    const normalizedY = Math.min(Math.max(deltaY / maxDistance, -1), 1)
    
    setJoystickPos({ x: normalizedX, y: normalizedY })
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      height: '200px',
      pointerEvents: 'none',
      zIndex: 100
    }}>
      {/* Movement Joystick (Left Side) */}
      <div
        ref={joystickRef}
        style={{
          position: 'absolute',
          bottom: '50px',
          left: '50px',
          width: '120px',
          height: '120px',
          background: 'rgba(0,0,0,0.3)',
          borderRadius: '50%',
          border: '2px solid rgba(255,255,255,0.5)',
          pointerEvents: 'auto',
          touchAction: 'none'
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '60px',
            height: '60px',
            background: 'rgba(255,255,255,0.8)',
            borderRadius: '50%',
            transform: `translate(-50%, -50%) translate(${joystickPos.x * 30}px, ${joystickPos.y * 30}px)`,
            transition: 'transform 0.1s'
          }}
        />
      </div>

      {/* Action Buttons (Right Side) */}
      <div style={{
        position: 'absolute',
        bottom: '50px',
        right: '50px',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        pointerEvents: 'auto'
      }}>
        <button
          onTouchStart={(e) => {
            e.preventDefault()
            onShoot()
          }}
          onClick={onShoot}
          style={{
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, #ef4444, #dc2626)',
            border: 'none',
            borderRadius: '50%',
            color: 'white',
            fontSize: '14px',
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(220, 38, 38, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          SHOOT
        </button>
        
        <button
          onTouchStart={(e) => {
            e.preventDefault()
            onPass()
          }}
          onClick={onPass}
          style={{
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
            border: 'none',
            borderRadius: '50%',
            color: 'white',
            fontSize: '14px',
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(37, 99, 235, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          PASS
        </button>
      </div>

      {/* Instructions */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        color: 'white',
        fontSize: '12px',
        opacity: 0.7,
        textAlign: 'center'
      }}>
        <p>Use joystick to move • Press buttons to shoot/pass</p>
        <p>Desktop: Use arrow keys (WASD) and Spacebar</p>
      </div>
    </div>
  )
}