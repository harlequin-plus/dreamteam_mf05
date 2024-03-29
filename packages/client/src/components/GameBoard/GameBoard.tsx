import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react'
import { moveDown, moveLeft, moveRight, moveUp } from '../../utils/gameMoves'
import { addNewTile, drawBoard, drawTiles } from '../../utils/gameDraw'
import { styles } from './tempStyles'
import { FullscreenProvider } from '../FullscreenProvider'
import { Button } from '@mui/material'
import CloseFullscreenIcon from '../../assets/close_fullscreen.svg'
import OpenFullscreenIcon from '../../assets/open_fullscreen.svg'

const GameBoard: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null)

  const [highScore, setScore] = useState<number>(2)
  const [completed, setCompleted] = useState<boolean>(false)

  const findLargestElement = useCallback(
    (matrix: number[][]): number => {
      let largestElement = Number.NEGATIVE_INFINITY

      for (const row of matrix) {
        for (const element of row) {
          if (element > largestElement) {
            largestElement = element
          }
        }
      }

      if (largestElement === 2048 && !completed) {
        alert(
          `Congrats! You are about to score 2048! Continue if you want bigger score`
        )

        setCompleted(true)
      }
      return largestElement
    },
    [completed]
  )

  const board = useMemo(
    () => [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    []
  )

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      let moved = false

      switch (event.key) {
        case 'ArrowUp':
          moved = moveUp(board)
          setScore(findLargestElement(board))
          break
        case 'ArrowDown':
          moved = moveDown(board)
          setScore(findLargestElement(board))
          break
        case 'ArrowLeft':
          moved = moveLeft(board)
          setScore(findLargestElement(board))
          break
        case 'ArrowRight':
          moved = moveRight(board)
          setScore(findLargestElement(board))
          break
        default:
          break
      }

      if (moved) {
        drawBoard(ctxRef, board)
        addNewTile(ctxRef, board)
      }
    },
    [board, findLargestElement]
  )

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')

      if (ctx) {
        ctxRef.current = ctx
        drawBoard(ctxRef, board)
        drawTiles(ctxRef, board)
        addNewTile(ctxRef, board)
        window.addEventListener('keydown', handleKeyDown)
      }
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [board, handleKeyDown])

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
