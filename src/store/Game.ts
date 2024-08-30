import { makeAutoObservable } from "mobx"

class Game {
  score = [0, 0]

  constructor() {
    makeAutoObservable(this)
  }

  increaseScore(heroNumber: HeroIndex) {
    this.score[heroNumber] += 1
  }
}

export default new Game()

export type HeroIndex = 0 | 1