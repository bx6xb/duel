import { Canvas } from "./Canvas"
import { FULL_CIRCLE_RADIANS } from "./Hero"

export class Spell extends Canvas {
  spellRadius = 10
  y: number
  startX: number
  currentX: number
  endX: number
  spellColor: string

  constructor(
    canvas: HTMLCanvasElement,
    y: number,
    startX: number,
    endX: number,
    spellColor: string
  ) {
    super(canvas)

    this.y = y
    this.startX = startX
    this.currentX = startX
    this.endX = endX
    this.spellColor = spellColor

    this.draw()
  }

  draw() {
    this.clear()

    // draw a hero's spell
    this.ctx.beginPath()
    this.ctx.strokeStyle = this.spellColor
    this.ctx.lineWidth = 3
    this.ctx.arc(
      this.currentX,
      this.y,
      this.spellRadius,
      0,
      FULL_CIRCLE_RADIANS
    )
    this.ctx.stroke()
  }
  move() {
    // update hero direction
    if (this.startX > this.endX) {
      this.currentX -= 1
    } else {
      this.currentX += 1
    }

    // redraw
    this.draw()
  }
  clear() {
    this.ctx.clearRect(
      this.currentX - this.spellRadius - 3,
      this.y - this.spellRadius - 3,
      this.spellRadius * 2 + 6,
      this.spellRadius * 2 + 5
    )
  }
}
