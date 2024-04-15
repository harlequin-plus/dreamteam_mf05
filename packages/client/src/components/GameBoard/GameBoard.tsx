import React, { useEffect, useRef, useState, useCallback } from 'react'
import { GameEngine } from '../../utils/gameEngin'
import { styles } from './tempStyles'
import { FullscreenProvider } from '../FullscreenProvider'
import { Button } from '@mui/material'
import CloseFullscreenIcon from '../../assets/close_fullscreen.svg'
import OpenFullscreenIcon from '../../assets/open_fullscreen.svg'

const gameEngine = new GameEngine()

const GameBoard: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null)

  const [highScore, setScore] = useState<number>(0)

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    gameEngine.onKeyboardPress(ctxRef, event)
    setScore(gameEngine.score)
  }, [])

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')

      if (ctx) {
        ctxRef.current = ctx
        gameEngine.drawBoard(ctxRef)
        gameEngine.drawTiles(ctxRef)
        gameEngine.addNewTile(ctxRef)
        window.addEventListener('keydown', handleKeyDown)
      }
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  const [isFullscreenEnabled, setFullscreenEnabled] = useState<boolean>(false)
  return (
    <FullscreenProvider
      enabled={isFullscreenEnabled}
      onChange={setFullscreenEnabled}>
      <div style={styles}>
        <Button
          className="fullscreen-btn"
          aria-label="OpenInFull"
          onClick={() => setFullscreenEnabled(prev => !prev)}
          sx={{
            position: 'absolute',
            right: 0,
            top: 0,
            width: 75,
            height: 75,
          }}>
          <img
            src={isFullscreenEnabled ? CloseFullscreenIcon : OpenFullscreenIcon}
            alt={
              isFullscreenEnabled
                ? 'Close fullscreen button'
                : 'Open fullscreen button'
            }
          />
        </Button>
        <div> High Score: {highScore}</div>
        <canvas ref={canvasRef} width={400} height={420} />
      </div>
    </FullscreenProvider>
  )
}

export default GameBoard
