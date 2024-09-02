import { ArrayXY, Hero } from "../classes/Hero"
import ModalState from "../store/ModalState"

export const checkMouseClick = (hero: Hero, id: string, mousePos: ArrayXY) => {
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
    ModalState.setCurrentHeroId(id)
    ModalState.setIsOpen(true)
  }
}
