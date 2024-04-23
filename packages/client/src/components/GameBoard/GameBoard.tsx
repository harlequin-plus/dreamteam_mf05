import React, { useEffect, useRef, useState } from 'react'
import { GameEngine } from '../../utils/gameEngin'
import { styles } from './tempStyles'
import { FullscreenProvider } from '../FullscreenProvider'
import { FullscreenButton } from '../FullscreenButton'

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
        <FullscreenButton
          isFullscreenEnabled={isFullscreenEnabled}
          setFullscreenEnabled={setFullscreenEnabled}
        />
        <div> High Score: {highScore}</div>
        <canvas ref={canvasRef} width={400} height={420} />
      </div>
    </FullscreenProvider>
  )
}

export default GameBoard
