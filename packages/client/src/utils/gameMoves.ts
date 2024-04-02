export class GameEngine extends Function {
  constructor() {
    super()
  }

  static moveUp = (board: number[][]): boolean => {
    let moved = false

    for (let j = 0; j < board[0].length; j++) {
      for (let i = 1; i < board.length; i++) {
        if (board[i][j] !== 0) {
          let k = i
          while (k > 0 && board[k - 1][j] === 0) {
            board[k - 1][j] = board[k][j]
            board[k][j] = 0
            k--
            moved = true
          }
          if (k > 0 && board[k - 1][j] === board[k][j]) {
            board[k - 1][j] *= 2
            board[k][j] = 0
            moved = true
          }
        }
      }
    }

    return moved
  }

  static moveDown = (board: number[][]): boolean => {
    let moved = false

    for (let j = 0; j < board[0].length; j++) {
      for (let i = board.length - 2; i >= 0; i--) {
        if (board[i][j] !== 0) {
          let k = i
          while (k < board.length - 1 && board[k + 1][j] === 0) {
            board[k + 1][j] = board[k][j]
            board[k][j] = 0
            k++
            moved = true
          }
          if (k < board.length - 1 && board[k + 1][j] === board[k][j]) {
            board[k + 1][j] *= 2
            board[k][j] = 0
            moved = true
          }
        }
      }
    }

    return moved
  }

  static moveLeft = (board: number[][]): boolean => {
    let moved = false

    for (let i = 0; i < board.length; i++) {
      for (let j = 1; j < board[i].length; j++) {
        if (board[i][j] !== 0) {
          let k = j
          while (k > 0 && board[i][k - 1] === 0) {
            board[i][k - 1] = board[i][k]
            board[i][k] = 0
            k--
            moved = true
          }
          if (k > 0 && board[i][k - 1] === board[i][k]) {
            board[i][k - 1] *= 2
            board[i][k] = 0
            moved = true
          }
        }
      }
    }

    return moved
  }

  static moveRight = (board: number[][]): boolean => {
    let moved = false

    for (let i = 0; i < board.length; i++) {
      for (let j = board[i].length - 2; j >= 0; j--) {
        if (board[i][j] !== 0) {
          let k = j
          while (k < board[i].length - 1 && board[i][k + 1] === 0) {
            board[i][k + 1] = board[i][k]
            board[i][k] = 0
            k++
            moved = true
          }
          if (k < board[i].length - 1 && board[i][k + 1] === board[i][k]) {
            board[i][k + 1] *= 2
            board[i][k] = 0
            moved = true
          }
        }
      }
    }

    return moved
  }

  static moveNotPossible = (matrix: number[][]) => {
    const n = matrix.length

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n - 1; j++) {
        if (matrix[i][j] === matrix[i][j + 1]) {
          return false
        }
      }
    }

    for (let j = 0; j < n; j++) {
      for (let i = 0; i < n - 1; i++) {
        if (matrix[i][j] === matrix[i + 1][j]) {
          return false
        }
      }
    }

    return true
  }
}
