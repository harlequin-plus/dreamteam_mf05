import { styles } from '../components/GameBoard/tempStyles'
import { GameEngine } from './gameMoves'

const getColorForValue = (value: number) => {
  switch (value) {
    case 2:
      return '#eee4da'
    case 4:
      return '#ede0c8'
    case 8:
      return '#f2b179'
    case 16:
      return '#f59563'
    case 32:
      return '#f67c5f'
    case 64:
      return '#f65e3b'
    case 128:
      return '#edcf72'
    case 256:
      return '#edcc61'
    case 512:
      return '#edc850'
    case 1024:
      return '#edc53f'
    case 2048:
      return '#edc22e'
    default:
      return '#1D1F34'
  }
}

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
        ctx.fillStyle = getColorForValue(board[i][j])
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
    drawBoard(ctxRef, board)

    if (GameEngine.moveNotPossible(board)) {
      if (confirm(`No moves available. New game will be started`)) {
        for (let i = 0; i < board.length; i++) {
          for (let j = 0; j < board[i].length; j++) {
            board[i][j] = 0
          }
        }
        addNewTile(ctxRef, board)
        drawBoard(ctxRef, board)
        drawTiles(ctxRef, board)
      }
    }
  }

  if (emptyTiles.length > 0) {
    const randomIndex = Math.floor(Math.random() * emptyTiles.length)
    const { row, col } = emptyTiles[randomIndex]

    board[row][col] = 2
    drawBoard(ctxRef, board)
    drawTiles(ctxRef, board)
  }
}
