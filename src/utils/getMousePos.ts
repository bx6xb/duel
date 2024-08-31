import { MouseEvent } from "react"
import { ArrayXY } from "../classes/Hero"

export const getMousePos = (e: MouseEvent<HTMLCanvasElement>): ArrayXY => {
  const rect = e.currentTarget.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  return [x, y]
}
