import { MouseEvent, useEffect, useRef, useState } from "react"
import s from "./Canvas.module.scss"
import { ArrayXY, Hero } from "../../classes/Hero"
import { Spell } from "../../classes/Spell"

export const Canvas = () => {
  // local state
  const [heroes, setHeroes] = useState<Hero[]>([])

  // refs
  const intervalsId = useRef<number[]>([])
  const cavnasRef = useRef<HTMLCanvasElement>(null)
  const spells = useRef<Spell[]>([])

  useEffect(() => {
    // creating heroes
    const leftHero = new Hero(cavnasRef.current!, 35)
    const rightHero = new Hero(cavnasRef.current!, 765)

    const heroesArray = [leftHero, rightHero]

    setHeroes(heroesArray)

    return () => {
      heroesArray.map((h) => h.clear())
      spells.current.map((s) => s.clear())
    }
  }, [])

  useEffect(() => {
    if (heroes.length) {
      // move heroes
      const id1 = setInterval(() => {
        heroes.map((h) => h.move.apply(h))

        // check edge collision
        spells.current = spells.current.filter((s) => {
          const isCollision =
            s.currentX + s.spellRadius >= s.canvas.width ||
            s.currentX - s.spellRadius <= 0 // right and left edge collision

          if (isCollision) {
            s.clear()
          }
          return !isCollision
        })
      }, 10)

      // move spells
      const id2 = setInterval(() => {
        spells.current.map((s) => s.move.apply(s))
      }, 10)

      // creates a new spell
      const id3 = setInterval(() => {
        const leftHerospell = new Spell(
          cavnasRef.current!,
          heroes[0].y,
          heroes[0].x + 50,
          cavnasRef.current!.width,
          "green"
        )

        const rightHeroSpell = new Spell(
          cavnasRef.current!,
          heroes[1].y,
          heroes[1].x - 50,
          0,
          "white"
        )

        spells.current = [...spells.current, leftHerospell, rightHeroSpell]
      }, 1000)

      intervalsId.current = [id1, id2, id3]

      return () => {
        intervalsId.current!.map(clearInterval)
        intervalsId.current = []
      }
    }
  }, [heroes])

  const onMouseMove = (e: MouseEvent<HTMLCanvasElement>) => {
    // get mouse position
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const mousePos: ArrayXY = [x, y]

    heroes.map((h) => h.setMousePos(mousePos)) // get current position of cursor
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
