import { MouseEvent, useEffect, useRef, useState } from "react"
import s from "./Canvas.module.scss"
import { ArrayXY, Hero } from "../../classes/Hero"
import { Spell } from "../../classes/Spell"
import { checkHeroCollision } from "../../utils/checkHeroCollision"
import { checkEdgeCollision } from "../../utils/checkEdgeCollision"
import GameState, { HeroIndex } from "../../store/GameState"
import ModalState from "../../store/ModalState"

export const Canvas = () => {
  // local state
  const [heroes, setHeroes] = useState<Hero[]>([]) // [left hero, right hero]

  // refs
  const intervalsId = useRef<number[]>([])
  const cavnasRef = useRef<HTMLCanvasElement>(null)
  const spells = useRef<Spell[][]>([[], []])

  useEffect(() => {
    // creating heroes
    const leftHero = new Hero(cavnasRef.current!, 35)
    const rightHero = new Hero(cavnasRef.current!, 765)

    const heroesArray = [leftHero, rightHero]

    setHeroes(heroesArray)

    return () => {
      heroesArray.map((h) => h.clear())
      spells.current.map((sArr) => sArr.map((s) => s.clear()))
    }
  }, [])

  useEffect(() => {
    if (heroes.length) {
      // move heroes
      const id1 = setInterval(() => {
        heroes.map((h) => h.move.apply(h))

        // checks edge collision
        spells.current = spells.current.map(checkEdgeCollision)

        checkHeroCollision(spells.current, heroes, 0)
        checkHeroCollision(spells.current, heroes, 1)
      }, 200)

      // move spells
      const id2 = setInterval(() => {
        spells.current.map((sArr) => sArr.map((s) => s.move.apply(s)))
      }, 10)

      // creates a new spell
      const id3 = setInterval(() => {
        const leftHeroSpell = new Spell(
          cavnasRef.current!,
          heroes[0].y,
          heroes[0].x + 50,
          cavnasRef.current!.width,
          GameState.spellColor[0]
        )

        const rightHeroSpell = new Spell(
          cavnasRef.current!,
          heroes[1].y,
          heroes[1].x - 50,
          0,
          GameState.spellColor[1]
        )

        spells.current[0] = [...spells.current[0], leftHeroSpell]
        spells.current[1] = [...spells.current[1], rightHeroSpell]
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

  const onClick = (e: MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const mousePos: ArrayXY = [x, y]

    // checks mouse click on hero
    heroes.forEach((hero, i) => {
      const xHeroCoords = [hero.x - hero.heroRadius, hero.x + hero.heroRadius]
      const yHeroCoords = [hero.y - hero.heroRadius, hero.y + hero.heroRadius]

      let xCollision = false
      let yCollision = false

      if (xHeroCoords[0] <= mousePos[0] && mousePos[0] <= xHeroCoords[1]) {
        xCollision = true
      }
      if (yHeroCoords[0] <= mousePos[1] && mousePos[1] <= yHeroCoords[1]) {
        yCollision = true
      }

      if (xCollision && yCollision) {
        GameState.setCurrentHero(i as HeroIndex)
        ModalState.setIsOpen(true)
      }
    })
  }

  return (
    <div className={s.canvas}>
      <canvas
        ref={cavnasRef}
        width={800}
        height={500}
        onMouseMove={onMouseMove}
        onClick={onClick}
      />
    </div>
  )
}
