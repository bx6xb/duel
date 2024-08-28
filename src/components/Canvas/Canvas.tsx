import { MouseEvent, useEffect, useRef, useState } from "react"
import s from "./Canvas.module.scss"
import { ArrayXY, Hero } from "../../classes/Hero"

type GetMousePosCallback = ([x, y]: ArrayXY) => void

export const Canvas = () => {
  // local state
  const [callbacks, setCallbacks] = useState<GetMousePosCallback[]>([])

  // refs
  const intervalsId = useRef<number[]>([])
  const cavnasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // creating heroes
    ;[new Hero(cavnasRef.current!, 20), new Hero(cavnasRef.current!, 780)].map(
      (hero) => {
        setCallbacks((prev) => [...prev, hero.getMousePosCallback()]) // add callback to subscribe heroes on mouse position changes
        intervalsId.current.push(setInterval(hero.move.bind(hero), 5)) // save interval id
      }
    )

    return () => {
      intervalsId.current!.map(clearInterval)
    }
  }, [])

  const onMouseMove = (e: MouseEvent<HTMLCanvasElement>) => {
    // get mouse position
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const mousePos: ArrayXY = [x, y]

    callbacks.map((f) => f(mousePos)) // subscribe heroes to changes in mouse position on canvas
  }

  return (
    <div className={s.canvas}>
      <canvas
        ref={cavnasRef}
        width={800}
        height={500}
        onMouseMove={onMouseMove}
      />
    </div>
  )
}
