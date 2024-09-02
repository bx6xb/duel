import { Hero } from "../classes/Hero"
import { Spell } from "../classes/Spell"
import HeroesState from "../store/HeroesState"

export const checkHeroCollision = (
  attackingHeroId: string,
  spells: Spell[],
  enemyHero: Hero
) =>
  spells.filter((s, i) => {
    if ([0, 1, 2].includes(i)) {
      const xEnemyHeroCoords = [
        enemyHero.x - enemyHero.heroRadius,
        enemyHero.x + enemyHero.heroRadius,
      ]
      const yEnemyHeroCoords = [
        enemyHero.y - enemyHero.heroRadius,
        enemyHero.y + enemyHero.heroRadius,
      ]

      const xSpellCoords = [
        s.currentX - s.spellRadius,
        s.currentX + s.spellRadius,
      ]
      const ySpellCoords = [s.y - s.spellRadius, s.y + s.spellRadius]

      let xCollision = false
      let yCollision = false

      if (
        (xEnemyHeroCoords[0] <= xSpellCoords[0] &&
          xSpellCoords[0] <= xEnemyHeroCoords[1]) ||
        (xEnemyHeroCoords[0] <= xSpellCoords[1] &&
          xSpellCoords[1] <= xEnemyHeroCoords[1])
      ) {
        xCollision = true
      }
      if (
        (yEnemyHeroCoords[0] <= ySpellCoords[0] &&
          ySpellCoords[0] <= yEnemyHeroCoords[1]) ||
        (yEnemyHeroCoords[0] <= ySpellCoords[1] &&
          ySpellCoords[1] <= yEnemyHeroCoords[1])
      ) {
        yCollision = true
      }

      const isCollision = xCollision && yCollision

      if (isCollision) {
        s.clear()
        HeroesState.increaseScore(attackingHeroId)
      }

      return !isCollision
    } else {
      return true
    }
  })
