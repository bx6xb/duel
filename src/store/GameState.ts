import { makeAutoObservable } from "mobx"

class Game {
  score = [0, 0]
  spellColor = ["#266d1c", "#fff333"]
  moveSpeed = []
  spellSpeed = []
  currentHero: HeroIndex = 0

  constructor() {
    makeAutoObservable(this)
  }

  increaseScore(heroIndex: HeroIndex) {
    this.score[heroIndex] += 1
  }

  changeSpellColor(color: string) {
    this.spellColor[this.currentHero] = color
  }

  setCurrentHero(heroIndex: HeroIndex) {
    this.currentHero = heroIndex
  }
}

export default new Game()

export type HeroIndex = 0 | 1
