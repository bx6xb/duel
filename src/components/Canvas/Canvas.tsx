import { useEffect, useRef } from "react"
import s from "./Canvas.module.scss"
import { Hero } from "../../classes/Hero"

export const Canvas = () => {
  const intervalsId = useRef<[number, number]>()

  const cavnasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const hero1 = new Hero(cavnasRef.current!, 20)
    const hero2 = new Hero(cavnasRef.current!, 780)

    intervalsId.current = [
      setInterval(hero1.move.bind(hero1), 5),
      setInterval(hero2.move.bind(hero2), 5),
    ]

    return () => {
      intervalsId.current!.map(clearInterval)
    }
  }, [])

  return (
    <div className={s.canvas}>
      <canvas ref={cavnasRef} width={800} height={500} />
    </div>
  )
}
