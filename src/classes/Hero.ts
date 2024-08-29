import { randomNumber } from "../utils/randomNumber"

export const FULL_CIRCLE_RADIANS = 2 * Math.PI

export class Hero {
  heroRadius = 30
  mousePos: ArrayXY = [0, 0]
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  rangeY: ArrayXY
  x: number
  y: number
  isGoingDown: boolean

  constructor(canvas: HTMLCanvasElement, x: number) {
    this.canvas = canvas
    this.ctx = canvas.getContext("2d")!
    this.rangeY = [
      this.heroRadius + 10,
      this.canvas.height - this.heroRadius - 10,
    ] // coordinates of hero line
    this.x = x
    this.y = randomNumber(this.rangeY[0], this.rangeY[1]) // random y init position
    this.isGoingDown = Boolean(Math.round(Math.random())) // random boolean value

    this.draw()
  }

  draw() {
    this.clear()

    // draws a hero
    this.ctx.beginPath()
    this.ctx.fillStyle = "white"
    this.ctx.arc(this.x, this.y, this.heroRadius, 0, FULL_CIRCLE_RADIANS)
    this.ctx.fill()
  }
  move() {
    // checks for mouse collision
    const startX = this.x - 20
    const endX = this.x + 20
    const startY = this.y - 20
    const endY = this.y + 20

    const mouseX = this.mousePos[0]
    const mouseY = this.mousePos[1]

    const betweenXAxis = startX <= mouseX && mouseX <= endX

    if (betweenXAxis && startY <= mouseY && mouseY <= this.y) {
      this.isGoingDown = true
    } else if (betweenXAxis && this.y <= mouseY && mouseY <= endY) {
      this.isGoingDown = false
    }

    // checks for edge collision
    if (this.y <= this.rangeY[0]) {
      this.isGoingDown = true
    } else if (this.y >= this.rangeY[1]) {
      this.isGoingDown = false
    }

    // updates hero direction
    if (this.isGoingDown) {
      this.y += 1
    } else {
      this.y -= 1
    }

    // redraw
    this.draw()
  }

  setMousePos(mousePos: ArrayXY) {
    this.mousePos = mousePos
  }

  clear() {
    this.ctx.clearRect(
      this.x - this.heroRadius - 1,
      this.y - this.heroRadius - 1,
      this.heroRadius * 2 + 2,
      this.heroRadius * 2 + 2
    )
  }
}

export type ArrayXY = [number, number]
