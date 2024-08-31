import { MouseEvent, useEffect, useRef, useState } from "react"
import s from "./Canvas.module.scss"
import { Hero } from "../../classes/Hero"
import { Spell } from "../../classes/Spell"
import { checkHeroCollision } from "../../utils/checkHeroCollision"
import { checkEdgeCollision } from "../../utils/checkEdgeCollision"
import GameState, { HeroIndex } from "../../store/GameState"
import { observer } from "mobx-react-lite"
import { checkMouseClick } from "../../utils/checkMouseClick"
import { getMousePos } from "../../utils/getMousePos"

export const Canvas = observer(() => {
  // local state
  const [heroes, setHeroes] = useState<Hero[]>([]) // [left hero, right hero]

  // refs
  const spells = useRef<Spell[][]>([[], []])
  const intervalsId = useRef<number[]>([])
  const cavnasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // create heroes
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
      heroes.forEach((h, i) => {
        const isLeftHero = i === 0
        // move heroes
        const heroId = setInterval(() => {
          h.move.apply(h)

          spells.current = spells.current.map(checkEdgeCollision) // check edge collision

          checkHeroCollision(spells.current, heroes, i as HeroIndex)
        }, GameState.heroesSpeed[i])

        const spellId = setInterval(() => {
          // create a new spell for each hero
          const spell = new Spell(
            cavnasRef.current!,
            heroes[i].y,
            heroes[i].x + (isLeftHero ? 50 : -50),
            isLeftHero ? cavnasRef.current!.width : 0,
            GameState.spellColor[i]
          )

          spells.current[i] = [...spells.current[i], spell]
        }, GameState.spellsSpawnTime[i])

        intervalsId.current.push(heroId, spellId)
      })

      // move spells
      const moveSpellsId = setInterval(() => {
        spells.current.map((sArr) => sArr.map((s) => s.move.apply(s)))
      }, 10)

      intervalsId.current.push(moveSpellsId)

      return () => {
        intervalsId.current!.map(clearInterval)
        intervalsId.current = []
      }
    }
  }, [heroes, GameState.spellsSpawnTime, GameState.heroesSpeed])

  const onMouseMove = (e: MouseEvent<HTMLCanvasElement>) => {
    const mousePos = getMousePos(e) // get mouse position

    heroes.map((h) => h.setMousePos(mousePos)) // set current position of cursor
  }

  const onClick = (e: MouseEvent<HTMLCanvasElement>) => {
    const mousePos = getMousePos(e) // get mouse position

    heroes.forEach((h, i) => checkMouseClick(h, i, mousePos)) // check mouse click on hero
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
})
