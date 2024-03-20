import React, { useEffect, useRef, useState } from 'react'
import { moveDown, moveLeft, moveRight, moveUp } from '../../utils/gameMoves'
import { addNewTile, drawBoard, drawTiles } from '../../utils/gameDraw'
import { styles } from './tempStyles'

const GameBoard: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null)

  const [highScore, setScore] = useState<number>(2)
  const board: number[][] = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]

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
  }, [])

  let completed = false // REWORK

  function findLargestElement(matrix: number[][]): number {
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
      completed = true
    }
    return largestElement
  }

  const handleKeyDown = (event: KeyboardEvent) => {
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
  }

  return (
    <>
      <div style={styles}>
        <div> High Score: {highScore}</div>
        <canvas ref={canvasRef} width={400} height={420} />
      </div>
    </>
  )
}

export default GameBoard
