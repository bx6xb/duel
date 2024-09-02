import { MouseEvent, useEffect, useRef } from "react"
import s from "./Canvas.module.scss"
import { Hero } from "../../classes/Hero"
import { Spell } from "../../classes/Spell"
import { checkHeroCollision } from "../../utils/checkHeroCollision"
import { checkEdgeCollision } from "../../utils/checkEdgeCollision"
import { observer } from "mobx-react-lite"
import { checkMouseClick } from "../../utils/checkMouseClick"
import { getMousePos } from "../../utils/getMousePos"
import HeroesState from "../../store/HeroesState"
import SpellsState from "../../store/SpellsState"

export const Canvas = observer(() => {
  // refs
  const intervalsId = useRef<number[]>([])
  const cavnasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // create heroes
    const leftHero = new Hero(cavnasRef.current!, 35)
    const rightHero = new Hero(cavnasRef.current!, 765, "left")

    HeroesState.addHeroes(leftHero, rightHero)

    return () => {
      // clear state
      HeroesState.resetState()
      SpellsState.resetState()
    }
  }, [])

  useEffect(() => {
    if (HeroesState.heroes.length) {
      // move spells
      const moveSpellsId = setInterval(() => {
        SpellsState.spells.forEach((data) =>
          data.spells.forEach((spell) => spell.move.apply(spell))
        )
      }, 1)

      intervalsId.current.push(moveSpellsId)

      HeroesState.heroes.forEach((hero) => {
        const heroId = hero.id

        const isAttackDirectionIsRight = hero.attackDirection === "right"

        // move heroes
        const heroIntervalId = setInterval(() => {
          hero.move.apply(hero)

          const filteredSpells1 = checkEdgeCollision(
            SpellsState.spells.find((data) => data.id === heroId)!.spells
          ) // check edge collision

          const filteredSpells2 = checkHeroCollision(
            heroId,
            filteredSpells1,
            HeroesState.heroes.find((hero) => hero.id !== heroId)! // find enemy hero
          ) // check hero collision

          SpellsState.setSpells(heroId, filteredSpells2)
        }, HeroesState.heroesData[heroId].speed)

        // create a new spell for each hero
        const spellIntervalId = setInterval(() => {
          const spell = new Spell(
            cavnasRef.current!,
            hero.y,
            hero.x + (isAttackDirectionIsRight ? 50 : -50),
            isAttackDirectionIsRight ? cavnasRef.current!.width : 0,
            HeroesState.heroesData[heroId].spellColor
          )

          SpellsState.addSpell(heroId, spell)
        }, SpellsState.spells.find((data) => data.id === heroId)!.spellsSpawnTime)

        intervalsId.current.push(heroIntervalId, spellIntervalId)
      })

      return () => {
        intervalsId.current!.map(clearInterval)
        intervalsId.current = []
      }
    }
  }, [HeroesState.heroes, HeroesState.heroesData, SpellsState.spells])

  const onMouseMove = (e: MouseEvent<HTMLCanvasElement>) => {
    const mousePos = getMousePos(e) // get mouse position

    HeroesState.heroes.map((hero) => hero.setMousePos(mousePos)) // set current position of cursor
  }

  const onClick = (e: MouseEvent<HTMLCanvasElement>) => {
    const mousePos = getMousePos(e) // get mouse position

    HeroesState.heroes.forEach((hero) =>
      checkMouseClick(hero, hero.id, mousePos)
    ) // check mouse click on hero
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
