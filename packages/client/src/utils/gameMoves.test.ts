import { GameEngine } from './gameMoves'

describe('GameEngine', () => {
  let fullBoard: number[][]
  beforeEach(function () {
    fullBoard = [
      [2, 4],
      [8, 16],
    ]
  })

  it(`moveUp должен вернуть False при заполненных ячейках`, function () {
    const result = GameEngine.moveUp(fullBoard)
    expect(result).toBeFalsy()
  })
  it(`moveUp  должен переместить значения с нижнего ряда на верхний и сложить равные ячейки`, function () {
    const board = [
      [0, 4],
      [4, 4],
    ]
    GameEngine.moveUp(board)
    expect(board).toEqual([
      [4, 8],
      [0, 0],
    ])
  })

  it(`moveDown должен вернуть False при заполненных ячейках`, function () {
    const result = GameEngine.moveDown(fullBoard)
    expect(result).toBeFalsy()
  })
  it(`moveDown  должен переместить значения с верхнего ряда на нижний и сложить равные ячейки`, function () {
    const board = [
      [2, 4],
      [0, 4],
    ]
    GameEngine.moveDown(board)
    expect(board).toEqual([
      [0, 0],
      [2, 8],
    ])
  })

  it(`moveRight должен вернуть False при заполненных ячейках`, function () {
    const result = GameEngine.moveRight(fullBoard)
    expect(result).toBeFalsy()
  })
  it(`moveRight  должен переместить значения с левой части на правую и сложить равные ячейки`, function () {
    const board = [
      [2, 0],
      [4, 4],
    ]
    GameEngine.moveRight(board)
    expect(board).toEqual([
      [0, 2],
      [0, 8],
    ])
  })

  it(`moveLeft должен вернуть False при заполненных ячейках`, function () {
    const result = GameEngine.moveLeft(fullBoard)
    expect(result).toBeFalsy()
  })
  it(`moveLeft  должен переместить значения с правой части на левую и сложить равные ячейки`, function () {
    const board = [
      [0, 2],
      [4, 4],
    ]
    GameEngine.moveLeft(board)
    expect(board).toEqual([
      [2, 0],
      [8, 0],
    ])
  })

  it(`moveNotPossible должен вернуть true при заполненных ячейках`, function () {
    const result = GameEngine.moveNotPossible(fullBoard)
    expect(result).toBeTruthy()
  })
})
