import { makeAutoObservable } from "mobx"
import { Hero } from "../classes/Hero"
import SpellsState from "./SpellsState"

class HeroesState {
  heroes: Hero[] = []
  heroesData: HeroesData = {}

  constructor() {
    makeAutoObservable(this)
  }

  addHeroes(...heroes: Hero[]) {
    heroes.forEach((hero) => {
      const id = hero.id
      this.heroes.push(hero)
      this.heroesData[id] = {
        score: 0,
        spellColor: "#ffffff",
        speed: 5,
      }
      SpellsState.initHeroesSpells(id)
    })
  }

  increaseScore(id: string) {
    this.heroesData[id].score++
  }

  changeSpellColor(id: string, spellColor: string) {
    this.heroesData[id].spellColor = spellColor
  }

  getSpellColor(id: string) {
    return this.heroesData[id]?.spellColor
  }

  changeSpeed(id: string, speed: number) {
    this.heroesData = {
      ...this.heroesData,
      [id]: {
        ...this.heroesData[id],
        speed,
      },
    } // to trigger render
  }

  resetState() {
    this.heroes.forEach((hero) => hero.clear())
    this.heroes = []
    this.heroesData = {}
  }
}

type HeroesData = {
  [id: string]: {
    score: number
    spellColor: string
    speed: number
  }
}

export default new HeroesState()
