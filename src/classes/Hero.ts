import { randomNumber } from "../utils/randomNumber"

export class Hero {
  heroRadius = 20
  heroStep = 1
  spellColor = "white"
  gap = 10
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
      this.heroRadius + this.gap,
      this.canvas.height - this.heroRadius - this.gap,
    ] // range of hero line
    this.x = x
    this.y = randomNumber(this.rangeY[0], this.rangeY[1]) // random y init position
    this.isGoingDown = Boolean(Math.round(Math.random())) // random boolean value

    this.draw()
    this.listen()
  }

  draw() {
    // clears hero vertical line
    this.ctx.clearRect(
      this.x - this.heroRadius,
      0,
      this.heroRadius * 2,
      this.canvas.height
    )

    // draws hero
    this.ctx.beginPath()
    this.ctx.fillStyle = "white"
    this.ctx.arc(this.x, this.y, this.heroRadius, 0, 2 * Math.PI)
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
      this.y += this.heroStep
    } else {
      this.y -= this.heroStep
    }

    // redraw
    this.draw()
  }

  getMousePosCallback() {
    const setMousePos = (mousePos: ArrayXY) => {
      this.mousePos = mousePos
    }
    return setMousePos.bind(this)
  } // for subscribing to changes in mouse position on canvas

  listen() {
    // tracks mouse position
    this.canvas.onmousemove = (e: MouseEvent) => {
      this.mousePos = [e.offsetX, e.offsetY]
    }
  }

  // data manipulation
  getSpellColor() {
    return this.spellColor
  }
  setSpellColor(spellColor: string) {
    this.spellColor = spellColor
  }
}

export type ArrayXY = [number, number]
