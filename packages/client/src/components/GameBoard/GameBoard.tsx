import React, { useCallback, useEffect, useRef, useState } from 'react'
import { GameEngine } from '../../utils/gameEngin'
import { styles } from './tempStyles'
import { FullscreenProvider } from '../FullscreenProvider'
import { FullscreenButton } from '../FullscreenButton'
import { scoreVariableName } from '../../constants'
import { addUserToLeaderboard } from '../../services/leaderboard'
import { useAppSelector } from '../../hooks/reduxTsHook'

const gameEngine = new GameEngine()

const GameBoard: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [highScore, setScore] = useState<number>(0)
  const user = useAppSelector(state => state.userState.item)

  const addToLeaderboard = useCallback(
    (score: number, secondsInGame: number) => {
      addUserToLeaderboard({
        [scoreVariableName]: score,
        userId: user.id,
        secondsInGame,
      }).catch(error => console.warn('add user to leaderboard error:', error))
    },
    [user.id]
  )

  useEffect(() => {
    gameEngine.start(canvasRef)
    gameEngine.scoreChangedCallback = score => setScore(score)
    gameEngine.gameOverCallback = addToLeaderboard
    return gameEngine.finish
  }, [addToLeaderboard])

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
        <canvas
          ref={canvasRef}
          width={395}
          height={395}
          style={{ backgroundColor: 'black' }}
        />
      </div>
    </FullscreenProvider>
  )
}

export default GameBoard
