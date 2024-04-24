const boarderLineWidth = 10
const cellWidth = 90
const gap = 5

export class GameMoves extends Function {
  constructor() {
    super()
  }
  public emptyCellBoard = () => createEmptyBoard(4) //add empty cell board
  public cellBoard = this.emptyCellBoard() as (Cell | null)[][]
  public score = 0

  public scoreChangedCallback?: (score: number) => void
  public gameOverCallback?: (score: number, secondsInGame: number) => void

  setScore = (score: number) => {
    this.score = score
    if (this.scoreChangedCallback) {
      this.scoreChangedCallback(score)
    }
  }

  moveUp = (): boolean => {
    let moved = false

    for (let j = 0; j < this.cellBoard[0].length; j++) {
      for (let i = 1; i < this.cellBoard.length; i++) {
        const currentCell = this.cellBoard[i][j]
        if (currentCell) {
          let k = i
          while (k > 0 && this.cellBoard[k - 1][j] === null) {
            this.cellBoard[k - 1][j] = currentCell
            this.cellBoard[k][j] = null
            k--
            moved = true
          }
          if (
            k > 0 &&
            this.cellBoard[k - 1][j]?.value === this.cellBoard[k][j]?.value &&
            this.cellBoard[k][j]?.value
          ) {
            this.cellBoard[k - 1][j] = currentCell.setBoom(true)
            this.cellBoard[k][j] = null
            moved = true
            this.setScore(this.score + currentCell.value)
          }
        }
      }
    }
    return moved
  }

  moveDown = (): boolean => {
    let moved = false
    for (let j = 0; j < this.cellBoard[0].length; j++) {
      for (let i = this.cellBoard.length - 2; i >= 0; i--) {
        const currentCell = this.cellBoard[i][j]
        if (currentCell) {
          let k = i
          while (
            k < this.cellBoard.length - 1 &&
            this.cellBoard[k + 1][j] === null
          ) {
            this.cellBoard[k + 1][j] = currentCell
            this.cellBoard[k][j] = null
            k++
            moved = true
          }
          if (
            k < this.cellBoard.length - 1 &&
            this.cellBoard[k + 1][j]?.value === this.cellBoard[k][j]?.value &&
            this.cellBoard[k][j]?.value
          ) {
            this.cellBoard[k + 1][j] = currentCell.setBoom(true)
            this.cellBoard[k][j] = null
            moved = true
            this.setScore(this.score + currentCell.value)
          }
        }
      }
    }

    return moved
  }

  moveLeft = (): boolean => {
    let moved = false
    for (let i = 0; i < this.cellBoard.length; i++) {
      for (let j = 1; j < this.cellBoard[i].length; j++) {
        const currentCell = this.cellBoard[i][j]
        if (currentCell) {
          let k = j
          while (k > 0 && this.cellBoard[i][k - 1] === null) {
            this.cellBoard[i][k - 1] = currentCell
            this.cellBoard[i][k] = null
            k--
            moved = true
          }
          if (
            k > 0 &&
            this.cellBoard[i][k - 1]?.value === this.cellBoard[i][k]?.value &&
            this.cellBoard[i][k]?.value !== undefined
          ) {
            this.cellBoard[i][k - 1] = currentCell.setBoom(true)
            this.cellBoard[i][k] = null
            moved = true
            this.setScore(this.score + currentCell.value)
          }
        }
      }
    }

    return moved
  }

  moveRight = (): boolean => {
    let moved = false
    for (let i = 0; i < this.cellBoard.length; i++) {
      for (let j = this.cellBoard[i].length - 2; j >= 0; j--) {
        const currentCell = this.cellBoard[i][j]
        if (currentCell) {
          let k = j
          while (
            k < this.cellBoard[i].length - 1 &&
            this.cellBoard[i][k + 1] === null
          ) {
            this.cellBoard[i][k + 1] = currentCell
            this.cellBoard[i][k] = null
            k++
            moved = true
          }
          if (
            k < this.cellBoard[i].length - 1 &&
            this.cellBoard[i][k + 1]?.value === this.cellBoard[i][k]?.value &&
            this.cellBoard[i][k]?.value !== undefined
          ) {
            this.cellBoard[i][k + 1] = currentCell.setBoom(true)
            this.cellBoard[i][k] = null
            moved = true
            this.setScore(this.score + currentCell.value)
          }
        }
      }
    }
    return moved
  }

  moveNotPossible = () => {
    const n = this.cellBoard.length

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n - 1; j++) {
        if (this.cellBoard[i][j]?.value === this.cellBoard[i][j + 1]?.value) {
          return false
        }
      }
    }

    for (let j = 0; j < n; j++) {
      for (let i = 0; i < n - 1; i++) {
        if (this.cellBoard[i][j]?.value === this.cellBoard[i + 1][j]?.value) {
          return false
        }
      }
    }
    console.log(true)
    return true
  }
}

export class Cell {
  boom: boolean
  value: number
  row: number
  column: number
  color: string
  fontSize: number
  constructor(value: number, row: number, column: number, color: string) {
    this.value = value
    this.row = row
    this.column = column
    this.color = color
    this.fontSize = 40
    this.boom = false
  }
  setBoom(value: boolean) {
    this.boom = value
    return this
  }
  setFontSize(value: number) {
    this.fontSize = value
    return this
  }
  setValue(value: number) {
    this.value = value
    return this
  }
  setColumn(value: number) {
    this.column = value
    return this
  }
  setRow(value: number) {
    this.row = value
    return this
  }
  setRowAndColumn(x: number, y: number) {
    this.row = x
    this.column = y
    return this
  }
  setColor(color: string) {
    this.color = color
    return this
  }
  getCoordinates() {
    return {
      x: boarderLineWidth + this.column * (cellWidth + gap),
      y: boarderLineWidth + this.row * (cellWidth + gap),
    }
  }
}

function createEmptyBoard(n: number) {
  const board: Cell | null[][] = []
  for (let i = 0; i < n; i++) {
    board[i] = []
    for (let j = 0; j < n; j++) {
      board[i][j] = null
    }
  }
  return board
}

export class Explosion {
  x: number
  y: number
  spriteWidth: number
  spriteHeight: number
  width: number
  height: number
  image: HTMLImageElement
  frame: number
  timer: 0
  sound: HTMLAudioElement
  constructor(x: number, y: number) {
    this.x = x
    this.y = y
    this.spriteWidth = 200
    this.spriteHeight = 179
    this.width = this.spriteWidth / 2.2
    this.height = this.spriteHeight / 2
    this.image = new Image()
    this.image.src = '/src/utils/boom.png'
    this.frame = 0
    this.timer = 0
    this.sound = new Audio()
    this.sound.src = '/src/utils/boom.wav'
  }
  update() {
    if (this.frame === 0) {
      this.sound.play()
    }
    this.timer++
    if (this.timer % 10 === 0) {
      this.frame++
    }
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(
      this.image,
      this.frame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    )
  }
}

// ниже вариант с минимальными изменениями в смещениях:
// moveUp = (): boolean => {
//     let moved = false

//     for (let j = 0; j < this.cellBoard[0].length; j++) {
//       for (let i = 1; i < this.cellBoard.length; i++) {
//         // const currentCell = this.cellBoard[i][j]
//         if (this.cellBoard[i][j]) {
//           let k = i
//           while (k > 0 && this.cellBoard[k - 1][j] === null) {
//             this.cellBoard[k - 1][j] = this.cellBoard[k][j]
//             this.cellBoard[k][j] = null
//             k--
//             moved = true
//           }
//           if (
//             k > 0 &&
//             this.cellBoard[k - 1][j]?.value === this.cellBoard[k][j]?.value &&
//             this.cellBoard[k][j]?.value
//           ) {
//             this.cellBoard[k - 1][j] = this.cellBoard[k][j].setBoom(true)
//             this.cellBoard[k][j] = null
//             moved = true
//             this.setScore(this.score + this.cellBoard[k - 1][j].value)
//           }
//         }
//       }
//     }
//     return moved
//   }

//   moveDown = (): boolean => {
//     let moved = false
//     for (let j = 0; j < this.cellBoard[0].length; j++) {
//       for (let i = this.cellBoard.length - 2; i >= 0; i--) {
//         if (this.cellBoard[i][j]) {
//           let k = i
//           while (
//             k < this.cellBoard.length - 1 &&
//             this.cellBoard[k + 1][j] === null
//           ) {
//             this.cellBoard[k + 1][j] = this.cellBoard[k][j]
//             this.cellBoard[k][j] = null
//             k++
//             moved = true
//           }
//           if (
//             k < this.cellBoard.length - 1 &&
//             this.cellBoard[k + 1][j]?.value === this.cellBoard[k][j]?.value &&
//             this.cellBoard[k][j]?.value
//           ) {
//             this.cellBoard[k + 1][j] = this.cellBoard[k][j].setBoom(true)
//             this.cellBoard[k][j] = null
//             moved = true
//             this.setScore(this.score + this.cellBoard[k + 1][j].value)
//           }
//         }
//       }
//     }

//     return moved
//   }

//   moveLeft = (): boolean => {
//     let moved = false
//     for (let i = 0; i < this.cellBoard.length; i++) {
//       for (let j = 1; j < this.cellBoard[i].length; j++) {
//         if (this.cellBoard[i][j]) {
//           let k = j
//           while (k > 0 && this.cellBoard[i][k - 1] === null) {
//             this.cellBoard[i][k - 1] = this.cellBoard[i][k]
//             this.cellBoard[i][k] = null
//             k--
//             moved = true
//           }
//           if (
//             k > 0 &&
//             this.cellBoard[i][k - 1]?.value === this.cellBoard[i][k]?.value &&
//             this.cellBoard[i][k]?.value !== undefined
//           ) {
//             this.cellBoard[i][k - 1] = this.cellBoard[i][k].setBoom(true)
//             this.cellBoard[i][k] = null
//             moved = true
//             this.setScore(this.score + this.cellBoard[i][k - 1].value)
//           }
//         }
//       }
//     }

//     return moved
//   }

//   moveRight = (): boolean => {
//     let moved = false
//     for (let i = 0; i < this.cellBoard.length; i++) {
//       for (let j = this.cellBoard[i].length - 2; j >= 0; j--) {
//         if (this.cellBoard[i][j]) {
//           let k = j
//           while (
//             k < this.cellBoard[i].length - 1 &&
//             this.cellBoard[i][k + 1] === null
//           ) {
//             this.cellBoard[i][k + 1] = this.cellBoard[i][k]
//             this.cellBoard[i][k] = null
//             k++
//             moved = true
//           }
//           if (
//             k < this.cellBoard[i].length - 1 &&
//             this.cellBoard[i][k + 1]?.value === this.cellBoard[i][k]?.value &&
//             this.cellBoard[i][k]?.value !== undefined
//           ) {
//             this.cellBoard[i][k + 1] = this.cellBoard[i][k].setBoom(true)
//             this.cellBoard[i][k] = null
//             moved = true
//             this.setScore(this.score + this.cellBoard[i][k + 1].value)
//           }
//         }
//       }
//     }
//     return moved
//   }
