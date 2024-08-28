import { randomNumber } from "../utils/randomNumber"

export class Hero {
  heroRadius = 20
  heroStep = 1
  spellColor = "white"
  gap = 10
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  rangeY: [number, number]
  x: number
  y: number
  isGoingDown: boolean

  constructor(canvas: HTMLCanvasElement, x: number) {
    this.canvas = canvas
    this.ctx = canvas.getContext("2d")!
    this.rangeY = [
      this.heroRadius + this.gap,
      this.canvas.height - this.heroRadius - this.gap,
    ] // range of hero line
    this.x = x
    this.y = randomNumber(this.rangeY[0], this.rangeY[1]) // random y init position
    this.isGoingDown = Boolean(Math.round(Math.random())) // random boolean value

    this.draw()
  }

  getSpellColor() {
    return this.spellColor
  }
  setSpellColor(spellColor: string) {
    this.spellColor = spellColor
  }

  draw() {
    this.ctx.clearRect(
      this.x - this.heroRadius,
      0,
      this.heroRadius * 2,
      this.canvas.height
    )

    this.ctx.beginPath()
    this.ctx.fillStyle = "white"
    this.ctx.arc(this.x, this.y, this.heroRadius, 0, 2 * Math.PI)
    this.ctx.fill()
  }

  move() {
    if (this.y <= this.rangeY[0]) {
      this.isGoingDown = true
    } else if (this.y >= this.rangeY[1]) {
      this.isGoingDown = false
    }

    if (this.isGoingDown) {
      this.y += this.heroStep
    } else {
      this.y -= this.heroStep
    }

    this.draw()
  }
}
