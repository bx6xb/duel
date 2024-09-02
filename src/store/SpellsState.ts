import { makeAutoObservable } from "mobx"
import { Spell } from "../classes/Spell"

class SpellsState {
  spells: SpellsData[] = []

  constructor() {
    makeAutoObservable(this)
  }

  initHeroesSpells(heroId: string) {
    this.spells.push({ id: heroId, spells: [], spellsSpawnTime: 1400 })
  }

  addSpell(heroId: string, spell: Spell) {
    this.spells.forEach((data) => data.id === heroId && data.spells.push(spell))
  }

  setSpells(heroId: string, spells: Spell[]) {
    this.spells.forEach((data) => data.id === heroId && (data.spells = spells))
  }

  changeSpellsSpawnTime(heroId: string, spellsSpawnTime: number) {
    this.spells = this.spells.map((data) =>
      data.id === heroId ? { ...data, spellsSpawnTime } : data
    ) // to triger render
  }

  resetState() {
    this.spells.forEach((data) => data.spells.forEach((spell) => spell.clear()))
    this.spells = []
  }
}

export type SpellsData = {
  id: string
  spells: Spell[]
  spellsSpawnTime: number
}

export default new SpellsState()
