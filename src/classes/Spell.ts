import { FULL_CIRCLE_RADIANS } from "./Hero"

export class Spell {
  spellRadius = 10
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
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
    this.canvas = canvas
    this.ctx = canvas.getContext("2d")!
    this.y = y
    this.startX = startX
    this.currentX = startX
    this.endX = endX
    this.spellColor = spellColor

    this.draw()
  }

  draw() {
    this.clear()

    // draws a hero's spell
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
    // updates hero direction
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
