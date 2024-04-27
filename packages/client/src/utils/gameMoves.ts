export class GameMoves extends Function {
  constructor() {
    super()
  }
  public emptyBoard = () => [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]

  public board = this.emptyBoard()
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
}
