import { makeAutoObservable } from "mobx"

class Game {
  score = [0, 0]
  spellColor = ["#266d1c", "#fff333"]
  heroesSpeed = [5, 5]
  spellsSpawnTime = [1400, 1400]
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

  changeHeroSpeed(heroIndex: HeroIndex, speed: number) {
    const arr = [...this.heroesSpeed]
    arr[heroIndex] = speed
    this.heroesSpeed = arr // gives new array to reactivate intervals
  }

  changeSpellsSpawnTime(heroIndex: HeroIndex, speed: number) {
    const arr = [...this.spellsSpawnTime]
    arr[heroIndex] = speed
    this.spellsSpawnTime = arr // gives new array to reactivate intervals
  }
}

export default new Game()

export type HeroIndex = 0 | 1
