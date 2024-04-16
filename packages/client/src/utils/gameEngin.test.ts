import { GameEngine } from './gameEngin'
import 'jest-canvas-mock'

describe('GameEngine', () => {
  let gameEngine: GameEngine
  let fullBoard: number[][]
  beforeEach(function () {
    gameEngine = new GameEngine()
    fullBoard = [
      [2, 4],
      [8, 16],
    ]
  })

  it(`moveUp должен вернуть False при заполненных ячейках`, function () {
    gameEngine.board = fullBoard
    const result = gameEngine.moveUp()
    expect(result).toBeFalsy()
  })
  it(`moveUp  должен переместить значения с нижнего ряда на верхний и сложить равные ячейки`, function () {
    gameEngine.board = [
      [0, 4],
      [4, 4],
    ]
    gameEngine.moveUp()
    expect(gameEngine.board).toEqual([
      [4, 8],
      [0, 0],
    ])
  })

  it(`moveDown должен вернуть False при заполненных ячейках`, function () {
    gameEngine.board = fullBoard
    const result = gameEngine.moveDown()
    expect(result).toBeFalsy()
  })
  it(`moveDown  должен переместить значения с верхнего ряда на нижний и сложить равные ячейки`, function () {
    gameEngine.board = [
      [2, 4],
      [0, 4],
    ]
    gameEngine.moveDown()
    expect(gameEngine.board).toEqual([
      [0, 0],
      [2, 8],
    ])
  })

  it(`moveRight должен вернуть False при заполненных ячейках`, function () {
    gameEngine.board = fullBoard
    const result = gameEngine.moveRight()
    expect(result).toBeFalsy()
  })
  it(`moveRight  должен переместить значения с левой части на правую и сложить равные ячейки`, function () {
    gameEngine.board = [
      [2, 0],
      [4, 4],
    ]
    gameEngine.moveRight()
    expect(gameEngine.board).toEqual([
      [0, 2],
      [0, 8],
    ])
  })

  it(`moveLeft должен вернуть False при заполненных ячейках`, function () {
    gameEngine.board = fullBoard
    const result = gameEngine.moveLeft()
    expect(result).toBeFalsy()
  })
  it(`moveLeft  должен переместить значения с правой части на левую и сложить равные ячейки`, function () {
    gameEngine.board = [
      [0, 2],
      [4, 4],
    ]
    gameEngine.moveLeft()
    expect(gameEngine.board).toEqual([
      [2, 0],
      [8, 0],
    ])
  })

  it(`moveNotPossible должен вернуть true при заполненных ячейках`, function () {
    gameEngine.board = fullBoard
    const result = gameEngine.moveNotPossible()
    expect(result).toBeTruthy()
  })
})

describe('drawBoard', () => {
  let canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D
  let ctxRef: React.MutableRefObject<CanvasRenderingContext2D>
  let gameEngine: GameEngine
  const board = [
    [2, 4],
    [8, 8],
  ]
  beforeEach(function () {
    canvas = document.createElement('canvas')
    ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    ctxRef = { current: ctx }
    gameEngine = new GameEngine()
  })

  it(`должен вернуть снимок границы поля игры`, function () {
    gameEngine.board = board
    gameEngine.drawBoard(ctxRef.current)
    const events = ctxRef.current.__getEvents()

    expect(events).toMatchSnapshot()
  })
  it(`должен вернуть снимок ячеек поля игры`, function () {
    gameEngine.board = board
    gameEngine.drawTiles(ctxRef.current)
    const events = ctxRef.current.__getEvents()
    console.log(events)
    expect(events).toMatchSnapshot()
  })
})
