import { styles } from '../components/GameBoard/tempStyles'

const emptyBoard = () => [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
]

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

export class GameEngine extends Function {
  constructor() {
    super()
  }

  public ctxRef: CanvasRenderingContext2D | null = null
  public completed = false
  public score = 0
  public board = emptyBoard()
  public setScoreCallback?: (score: number) => void

  setScore = (score: number) => {
    this.score = score
    if (this.setScoreCallback) {
      this.setScoreCallback(score)
    }
  }

  start = (canvasRef: React.MutableRefObject<HTMLCanvasElement | null>) => {
    this.completed = false
    this.board = emptyBoard()
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

    switch (event.key) {
      case 'ArrowUp':
        moved = this.moveUp()
        break
      case 'ArrowDown':
        moved = this.moveDown()
        break
      case 'ArrowLeft':
        moved = this.moveLeft()
        break
      case 'ArrowRight':
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

  moveUp = (): boolean => {
    let moved = false

    for (let j = 0; j < this.board[0].length; j++) {
      for (let i = 1; i < this.board.length; i++) {
        if (this.board[i][j] !== 0) {
          let k = i
          while (k > 0 && this.board[k - 1][j] === 0) {
            this.board[k - 1][j] = this.board[k][j]
            this.board[k][j] = 0
            k--
            moved = true
          }
          if (k > 0 && this.board[k - 1][j] === this.board[k][j]) {
            this.board[k - 1][j] *= 2
            this.board[k][j] = 0
            moved = true
            this.setScore(this.score + this.board[k - 1][j])
          }
        }
      }
    }

    return moved
  }

  moveDown = (): boolean => {
    let moved = false

    for (let j = 0; j < this.board[0].length; j++) {
      for (let i = this.board.length - 2; i >= 0; i--) {
        if (this.board[i][j] !== 0) {
          let k = i
          while (k < this.board.length - 1 && this.board[k + 1][j] === 0) {
            this.board[k + 1][j] = this.board[k][j]
            this.board[k][j] = 0
            k++
            moved = true
          }
          if (
            k < this.board.length - 1 &&
            this.board[k + 1][j] === this.board[k][j]
          ) {
            this.board[k + 1][j] *= 2
            this.board[k][j] = 0
            moved = true
            this.setScore(this.score + this.board[k + 1][j])
          }
        }
      }
    }

    return moved
  }

  moveLeft = (): boolean => {
    let moved = false

    for (let i = 0; i < this.board.length; i++) {
      for (let j = 1; j < this.board[i].length; j++) {
        if (this.board[i][j] !== 0) {
          let k = j
          while (k > 0 && this.board[i][k - 1] === 0) {
            this.board[i][k - 1] = this.board[i][k]
            this.board[i][k] = 0
            k--
            moved = true
          }
          if (k > 0 && this.board[i][k - 1] === this.board[i][k]) {
            this.board[i][k - 1] *= 2
            this.board[i][k] = 0
            moved = true
            this.setScore(this.score + this.board[i][k - 1])
          }
        }
      }
    }

    return moved
  }

  moveRight = (): boolean => {
    let moved = false

    for (let i = 0; i < this.board.length; i++) {
      for (let j = this.board[i].length - 2; j >= 0; j--) {
        if (this.board[i][j] !== 0) {
          let k = j
          while (k < this.board[i].length - 1 && this.board[i][k + 1] === 0) {
            this.board[i][k + 1] = this.board[i][k]
            this.board[i][k] = 0
            k++
            moved = true
          }
          if (
            k < this.board[i].length - 1 &&
            this.board[i][k + 1] === this.board[i][k]
          ) {
            this.board[i][k + 1] *= 2
            this.board[i][k] = 0
            moved = true
            this.setScore(this.score + this.board[i][k + 1])
          }
        }
      }
    }

    return moved
  }

  moveNotPossible = () => {
    const n = this.board.length

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n - 1; j++) {
        if (this.board[i][j] === this.board[i][j + 1]) {
          return false
        }
      }
    }

    for (let j = 0; j < n; j++) {
      for (let i = 0; i < n - 1; i++) {
        if (this.board[i][j] === this.board[i + 1][j]) {
          return false
        }
      }
    }

    return true
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
}
