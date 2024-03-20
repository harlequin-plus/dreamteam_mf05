import { styles } from '../components/GameBoard/tempStyles'
import { moveNotPossible } from './gameMoves'

export const drawTiles = (
  ctxRef: React.MutableRefObject<CanvasRenderingContext2D | null>,
  board: number[][]
) => {
  if (ctxRef.current) {
    const ctx = ctxRef.current
    ctx.fillStyle = styles.color
    ctx.font = styles.font
    ctx.textAlign = <CanvasTextAlign>styles.alignItems
    ctx.textBaseline = <CanvasTextBaseline>styles.textBaseline

    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] !== 0) {
          ctx.fillText(String(board[i][j]), 55 + j * 95, 55 + i * 95)
        }
      }
    }
  }
}

export const drawBoard = (
  ctxRef: React.MutableRefObject<CanvasRenderingContext2D | null>,
  board: number[][]
) => {
  if (ctxRef.current) {
    const ctx = ctxRef.current
    ctx.fillStyle = '#bbada0'
    ctx.fillRect(5, 5, 390, 390)

    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        ctx.fillStyle = '#cdc1b4'
        ctx.fillRect(10 + j * 95, 10 + i * 95, 90, 90)
      }
    }
  }
}

export const addNewTile = (
  ctxRef: React.MutableRefObject<CanvasRenderingContext2D | null>,
  board: number[][]
) => {
  const emptyTiles: { row: number; col: number }[] = []

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === 0) {
        emptyTiles.push({ row: i, col: j })
      }
    }
  }

  if (emptyTiles.length === 1) {
    const randomIndex = Math.floor(Math.random() * emptyTiles.length)
    const { row, col } = emptyTiles[randomIndex]

    board[row][col] = 2

    drawTiles(ctxRef, board)
    if (moveNotPossible(board)) {
      if (confirm(`No moves available. New game will be started`)) {
        for (let i = 0; i < board.length; i++) {
          for (let j = 0; j < board[i].length; j++) {
            board[i][j] = 0
          }
        }
        drawBoard(ctxRef, board)
        drawTiles(ctxRef, board)
        addNewTile(ctxRef, board)
      }
    }
  }

  if (emptyTiles.length > 0) {
    const randomIndex = Math.floor(Math.random() * emptyTiles.length)
    const { row, col } = emptyTiles[randomIndex]

    board[row][col] = 2

    drawTiles(ctxRef, board)
  }
}
