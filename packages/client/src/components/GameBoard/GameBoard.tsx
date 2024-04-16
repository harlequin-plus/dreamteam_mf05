import React, { useEffect, useRef, useState } from 'react'
import { GameEngine } from '../../utils/gameEngin'
import { styles } from './tempStyles'
import { FullscreenProvider } from '../FullscreenProvider'
import { Button } from '@mui/material'
import CloseFullscreenIcon from '../../assets/close_fullscreen.svg'
import OpenFullscreenIcon from '../../assets/open_fullscreen.svg'

const gameEngine = new GameEngine()

const GameBoard: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [highScore, setScore] = useState<number>(0)

  useEffect(() => {
    gameEngine.start(canvasRef)
    gameEngine.setScoreCallback = score => setScore(score)
    return gameEngine.finish
  }, [])

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
