import { drawBoard, drawTiles } from './gameDraw'
import 'jest-canvas-mock'

describe('drawBoard', () => {
  let canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D
  let ctxRef: React.MutableRefObject<CanvasRenderingContext2D>
  const board = [
    [2, 4],
    [8, 8],
  ]
  beforeEach(function () {
    canvas = document.createElement('canvas')
    ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    ctxRef = { current: ctx }
  })

  it(`должен вернуть снимок границы поля игры`, function () {
    drawBoard(ctxRef, board)
    const events = ctxRef.current.__getEvents()

    expect(events).toMatchSnapshot()
  })
  it(`должен вернуть снимок ячеек поля игры`, function () {
    drawTiles(ctxRef, board)
    const events = ctxRef.current.__getEvents()
    console.log(events)
    expect(events).toMatchSnapshot()
  })
})
