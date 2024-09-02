import { ChangeEvent } from "react"
import { Canvas } from "./components/Canvas/Canvas"
import {
  HeroSettings,
  HeroSettingsProps,
} from "./components/HeroSettings/HeroSettings"
import { Modal } from "./components/Modal/Modal"
import { Scoreboard } from "./components/Scoreboard/Scoreboard"
import { observer } from "mobx-react-lite"
import HeroesState from "./store/HeroesState"
import SpellsState from "./store/SpellsState"
import { InputType } from "./components/HeroSettings/Input/Input"
import ModalState from "./store/ModalState"

const App = observer(() => {
  const heroSettingsProps: HeroSettingsProps[] = HeroesState.heroes.map(
    (hero, i) => {
      const id = hero.id

      const value = SpellsState.spells.find(
        (data) => data.id === id
      )!.spellsSpawnTime

      const inputs: InputType[] = [
        {
          label: "Fire rate",
          min: 800,
          minLabel: "0.8s",
          max: 2000,
          maxLabel: "2s",
          step: 100,
          value: value,
          valueLabel: `${value / 1000}s`,
          onChange: (e: ChangeEvent<HTMLInputElement>) => {
            SpellsState.changeSpellsSpawnTime(id, +e.currentTarget.value)
          },
        },
        {
          label: "Hero speed",
          min: 1,
          max: 10,
          step: 1,
          value: HeroesState.heroesData[id].speed,
          onChange: (e: ChangeEvent<HTMLInputElement>) => {
            HeroesState.changeSpeed(id, +e.currentTarget.value)
          },
        },
      ]

      return {
        title: `Hero ${i + 1}`,
        inputs,
        className: i === 0 ? "leftHeroSettings" : "rightHeroSettings",
      }
    }
  )

  return (
    <div className="App">
      {ModalState.isOpen && <Modal />}
      <Scoreboard />
      <HeroSettings {...heroSettingsProps[0]} />
      <Canvas />
      <HeroSettings {...heroSettingsProps[1]} />
    </div>
  )
})

export default App
