import { randomNumber } from "../utils/randomNumber"
import { v4 } from "uuid"
import { Canvas } from "./Canvas"

export const FULL_CIRCLE_RADIANS = 2 * Math.PI

export class Hero extends Canvas {
  id: string
  x: number
  y: number
  attackDirection: AttackDirection
  heroRadius = 30
  private rangeY: ArrayXY
  private isGoingDown: boolean
  private mousePos: ArrayXY = [0, 0]

  constructor(
    canvas: HTMLCanvasElement,
    x: number,
    attackDirection: AttackDirection = "right"
  ) {
    super(canvas)

    this.id = v4()
    this.x = x
    this.attackDirection = attackDirection
    this.rangeY = [
      this.heroRadius + 10,
      this.canvas.height - this.heroRadius - 10,
    ] // coordinates of hero line
    this.y = randomNumber(this.rangeY[0], this.rangeY[1]) // random y init position
    this.isGoingDown = Boolean(Math.round(Math.random())) // random boolean value

    this.draw()
  }

  private draw() {
    this.clear()

    // draw a hero
    this.ctx.beginPath()
    this.ctx.fillStyle = "white"
    this.ctx.arc(this.x, this.y, this.heroRadius, 0, FULL_CIRCLE_RADIANS)
    this.ctx.fill()
  }

  move() {
    // check for mouse collision
    const startX = this.x - this.heroRadius
    const endX = this.x + this.heroRadius
    const startY = this.y - this.heroRadius
    const endY = this.y + this.heroRadius

    const mouseX = this.mousePos[0]
    const mouseY = this.mousePos[1]

    const betweenXAxis = startX <= mouseX && mouseX <= endX

    if (betweenXAxis && startY <= mouseY && mouseY <= this.y) {
      this.isGoingDown = true
    } else if (betweenXAxis && this.y <= mouseY && mouseY <= endY) {
      this.isGoingDown = false
    }

    // check for edge collision
    if (this.y <= this.rangeY[0]) {
      this.isGoingDown = true
    } else if (this.y >= this.rangeY[1]) {
      this.isGoingDown = false
    }

    // update hero direction
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

  resetMousePos() {
    this.mousePos = [0, 0]
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
type AttackDirection = "left" | "right"
