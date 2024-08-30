import { Hero } from "../classes/Hero"
import { Spell } from "../classes/Spell"
import Game, { HeroIndex } from "../store/GameState"

export const checkHeroCollision = (
  spells: Spell[][],
  heroes: Hero[],
  heroIndex: HeroIndex
) => {
  spells[heroIndex] = spells[heroIndex].filter((s, i) => {
    if ([0, 1, 2].includes(i)) {
      const enemyHeroIndex = heroIndex === 0 ? 1 : 0

      const xEnemyHeroCoords = [
        heroes[enemyHeroIndex].x - heroes[enemyHeroIndex].heroRadius,
        heroes[enemyHeroIndex].x + heroes[enemyHeroIndex].heroRadius,
      ]
      const yEnemyHeroCoords = [
        heroes[enemyHeroIndex].y - heroes[enemyHeroIndex].heroRadius,
        heroes[enemyHeroIndex].y + heroes[enemyHeroIndex].heroRadius,
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
        Game.increaseScore(heroIndex)
      }

      return !isCollision
    } else {
      return true
    }
  })
}
