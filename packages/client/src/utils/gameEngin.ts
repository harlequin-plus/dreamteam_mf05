import { styles } from '../components/GameBoard/tempStyles'
import { GameMoves } from './gameMoves'
import { getColorForValue, keysMapper } from './helpers'
import { Cell } from './gameMoves'
import { Explosion } from './gameMoves'

export class GameEngine extends GameMoves {
  constructor() {
    super()
  }

  public ctxRef: CanvasRenderingContext2D | null = null
  public completed = false
  public score = 0
  public timerMs = 0
  explosions: Explosion[] = []
  speed = 0.15
  public timerMs = 0

  setScore = (score: number) => {
    this.score = score
    if (this.scoreChangedCallback) {
      this.scoreChangedCallback(score)
    }
  }

  start = (canvasRef: React.MutableRefObject<HTMLCanvasElement | null>) => {
    this.completed = false
    this.cellBoard = this.emptyCellBoard()
    this.setScore(0)
    this.timerMs = performance.now()

    if (canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')

      if (ctx) {
        this.ctxRef = ctx
        window.addEventListener('keydown', this.onKeyboardPress)
      }
    }
    this.addNewTile(this.ctxRef)
    this.loop(this.ctxRef)
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
      this.addNewTile(this.ctxRef)
    }

    this.checkFinish()
  }

  checkFinish = (): boolean => {
    let largestElement = Number.NEGATIVE_INFINITY

    for (const row of this.cellBoard) {
      for (const element of row) {
        if (element && element.value > largestElement) {
          largestElement = element.value
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

    for (let i = 0; i < this.cellBoard.length; i++) {
      for (let j = 0; j < this.cellBoard[i].length; j++) {
        if (this.cellBoard[i][j] === null) {
          emptyTiles.push({ row: i, col: j })
        }
      }
    }
    if (emptyTiles.length === 1) {
      const randomIndex = Math.floor(Math.random() * emptyTiles.length)
      const { row, col } = emptyTiles[randomIndex]
      this.cellBoard[row][col] = new Cell(
        2,
        row,
        col,
        getColorForValue(2)
      ).setFontSize(0)

      if (this.moveNotPossible()) {
        this.gameOverCallback?.(
          this.score,
          Math.floor((performance.now() - this.timerMs) / 1000)
        )

        if (confirm(`No moves available. New game will be started`)) {
          this.setScore(0)
          this.cellBoard = this.emptyCellBoard()
          //   this.addNewTile(ctxRef) убрал добавление 2ой плитки в начале игры
        }
      }
    }

    if (emptyTiles.length > 0) {
      const randomIndex = Math.floor(Math.random() * emptyTiles.length)
      const { row, col } = emptyTiles[randomIndex]
      this.cellBoard[row][col] = new Cell(
        2,
        row,
        col,
        getColorForValue(2)
      ).setFontSize(0)
    }
  }

  drawCells = (ctxRef: CanvasRenderingContext2D | null) => {
    if (ctxRef) {
      const ctx = ctxRef
      ctx.fillStyle = '#bbada0'
      ctx.fillRect(4, 4, 387, 387)
      for (let i = 0; i < 4; i++)
        for (let j = 0; j < 4; j++) {
          ctx.clearRect(10 + i * 95, 10 + j * 95, 90, 90)
        }

      for (let i = 0; i < this.cellBoard.length; i++) {
        for (let j = 0; j < this.cellBoard[i].length; j++) {
          const currentCell = this.cellBoard[i][j]
          if (currentCell) {
            if (currentCell.row < i) {
              if (currentCell.boom) {
                drawTempCell(ctx, i, j, currentCell.value)
              }
              currentCell.setRow(currentCell.row + this.speed)
              if (currentCell.row > i) {
                currentCell.setRow(i)
                if (currentCell.boom) {
                  boomAction(currentCell, this.explosions)
                }
              }
            }
            if (currentCell.row > i) {
              if (currentCell.boom) {
                drawTempCell(ctx, i, j, currentCell.value)
              }
              currentCell.setRow(currentCell.row - this.speed)
              if (currentCell.row < i) {
                currentCell.setRow(i)
                if (currentCell.boom) {
                  boomAction(currentCell, this.explosions)
                }
              }
            }
            if (currentCell.column < j) {
              if (currentCell.boom) {
                drawTempCell(ctx, i, j, currentCell.value)
              }
              currentCell.setColumn(currentCell.column + this.speed)
              if (currentCell.column > j) {
                currentCell.setColumn(j)
                if (currentCell.boom) {
                  boomAction(currentCell, this.explosions)
                }
              }
            }
            if (currentCell.column > j) {
              if (currentCell.boom) {
                drawTempCell(ctx, i, j, currentCell.value)
              }
              currentCell.setColumn(currentCell.column - this.speed)
              if (currentCell.column < j) {
                currentCell.setColumn(j)
                if (currentCell.boom) {
                  boomAction(currentCell, this.explosions)
                }
              }
            }
            drawRect(ctx, currentCell as Cell)
          }
        }
      }
    }
  }
  loop = (ctxRef: CanvasRenderingContext2D | null) => {
    if (ctxRef) {
      ctxRef.clearRect(0, 0, 400, 400)
      this.drawCells(ctxRef)
      if (this.explosions.length > 0) {
        for (let i = 0; i < this.explosions.length; i++) {
          this.explosions[i].update()
          this.explosions[i].draw(ctxRef)
        }
      }
      window.requestAnimationFrame(() => this.loop(ctxRef))
    }
  }
}

function drawRect(ctx: CanvasRenderingContext2D, cell: Cell) {
  ctx.fillStyle = getColorForValue(cell.value)
  ctx.fillRect(cell.getCoordinates().x, cell.getCoordinates().y, 90, 90)
  ctx.fillStyle = styles.color
  if (cell.fontSize < 80 && cell.fontSize !== 40) {
    cell.setFontSize(cell.fontSize + 2.4) // параметр 2.4 - скорость увелечения текста при появлении новой ячейки. 40 не должно быть кратно этой скорости
  }
  if (cell.fontSize >= 60) {
    cell.setFontSize(40)
  }
  ctx.font = `bold ${cell.fontSize}px Arial`
  ctx.textAlign = <CanvasTextAlign>styles.alignItems
  ctx.textBaseline = <CanvasTextBaseline>styles.textBaseline
  ctx.fillText(
    String(cell.value),
    cell.getCoordinates().x + 45,
    cell.getCoordinates().y + 45
  )
}

function drawTempCell(
  ctx: CanvasRenderingContext2D,
  row: number,
  column: number,
  value: number
) {
  const cell = new Cell(value, row, column, getColorForValue(value))
  ctx.fillStyle = cell.color
  ctx.fillRect(cell.getCoordinates().x, cell.getCoordinates().y, 90, 90)
  ctx.fillStyle = styles.color
  ctx.font = <CanvasTextAlign>styles.font
  ctx.textAlign = <CanvasTextAlign>styles.alignItems
  ctx.textBaseline = <CanvasTextBaseline>styles.textBaseline
  ctx.fillText(
    String(cell.value),
    cell.getCoordinates().x + 45,
    cell.getCoordinates().y + 45
  )
}

function boomAction(cell: Cell, boomArray: Explosion[]) {
  cell.setBoom(false)
  //   .setValue(cell.value * 2)
  boomArray.push(
    new Explosion(cell.getCoordinates().x, cell.getCoordinates().y)
  )
}
