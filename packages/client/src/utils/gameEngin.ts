import { styles } from '../components/GameBoard/tempStyles'
import { GameMoves } from './gameMoves'
import { getColorForValue, keysMapper } from './helpers'

export class GameEngine extends GameMoves {
  constructor() {
    super()
  }

  public ctxRef: CanvasRenderingContext2D | null = null
  public completed = false
  public score = 0

  setScore = (score: number) => {
    this.score = score
    if (this.setScoreCallback) {
      this.setScoreCallback(score)
    }
  }

  start = (canvasRef: React.MutableRefObject<HTMLCanvasElement | null>) => {
    this.completed = false
    this.board = this.emptyBoard()
    this.setScore(0)

    if (canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')

      if (ctx) {
        this.ctxRef = ctx
        window.addEventListener('keydown', this.onKeyboardPress)
      }
    }

    this.drawBoard(this.ctxRef)
    this.drawTiles(this.ctxRef)
    this.addNewTile(this.ctxRef)
  }

  finish = () => {
    window.removeEventListener('keydown', this.onKeyboardPress)
  }

  onKeyboardPress = (event: KeyboardEvent) => {
    let moved = false

    // remove from gameEngie
    switch (keysMapper[event.key]) {
      case 'up':
        event.preventDefault()
        moved = this.moveUp()
        break
      case 'down':
        event.preventDefault()
        moved = this.moveDown()
        break
      case 'left':
        event.preventDefault()
        moved = this.moveLeft()
        break
      case 'right':
        event.preventDefault()
        moved = this.moveRight()
        break

      default:
        break
    }

    if (moved) {
      this.drawBoard(this.ctxRef)
      this.addNewTile(this.ctxRef)
    }

    this.checkFinish()
  }

  checkFinish = (): boolean => {
    let largestElement = Number.NEGATIVE_INFINITY

    for (const row of this.board) {
      for (const element of row) {
        if (element > largestElement) {
          largestElement = element
        }
      }
    }

    if (largestElement === 2048 && !this.completed) {
      alert(
        `Congrats! You are about to score 2048! Continue if you want bigger score`
      )

      this.completed = true
      return true
    }
    return false
  }

  addNewTile = (ctxRef: CanvasRenderingContext2D | null) => {
    const emptyTiles: { row: number; col: number }[] = []

    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        if (this.board[i][j] === 0) {
          emptyTiles.push({ row: i, col: j })
        }
      }
    }

    if (emptyTiles.length === 1) {
      const randomIndex = Math.floor(Math.random() * emptyTiles.length)
      const { row, col } = emptyTiles[randomIndex]

      this.board[row][col] = 2

      this.drawTiles(ctxRef)
      this.drawBoard(ctxRef)

      if (this.moveNotPossible()) {
        if (confirm(`No moves available. New game will be started`)) {
          this.setScore(0)
          for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[i].length; j++) {
              this.board[i][j] = 0
            }
          }
          this.addNewTile(ctxRef)
          this.drawBoard(ctxRef)
          this.drawTiles(ctxRef)
        }
      }
    }

    if (emptyTiles.length > 0) {
      const randomIndex = Math.floor(Math.random() * emptyTiles.length)
      const { row, col } = emptyTiles[randomIndex]

      this.board[row][col] = 2
      this.drawBoard(ctxRef)
      this.drawTiles(ctxRef)
    }
  }
  drawBoard = (ctxRef: CanvasRenderingContext2D | null) => {
    if (ctxRef) {
      const ctx = ctxRef
      ctx.fillStyle = '#bbada0'
      ctx.fillRect(5, 5, 385, 385)

      for (let i = 0; i < this.board.length; i++) {
        for (let j = 0; j < this.board[i].length; j++) {
          ctx.fillStyle = getColorForValue(this.board[i][j])
          ctx.fillRect(10 + j * 95, 10 + i * 95, 90, 90)
        }
      }
    }
  }

  drawTiles = (ctxRef: CanvasRenderingContext2D | null) => {
    if (ctxRef) {
      const ctx = ctxRef
      ctx.fillStyle = styles.color
      ctx.font = styles.font
      ctx.textAlign = <CanvasTextAlign>styles.alignItems
      ctx.textBaseline = <CanvasTextBaseline>styles.textBaseline

      for (let i = 0; i < this.board.length; i++) {
        for (let j = 0; j < this.board[i].length; j++) {
          if (this.board[i][j] !== 0) {
            ctx.fillText(String(this.board[i][j]), 55 + j * 95, 55 + i * 95)
          }
        }
      }
    }
  }
}
