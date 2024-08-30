import { ChangeEvent } from "react"
import { Canvas } from "./components/Canvas/Canvas"
import { HeroSettings, InputType } from "./components/HeroSettings/HeroSettings"
import { Modal } from "./components/Modal/Modal"
import { Scoreboard } from "./components/Scoreboard/Scoreboard"
import GameState from "./store/GameState"
import { observer } from "mobx-react-lite"

const App = observer(() => {
  const leftHeroInputs: InputType[] = [
    {
      label: "Fire rate",
      min: 800,
      max: 2000,
      step: 100,
      value: GameState.spellsSpawnTime[0],
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        GameState.changeSpellsSpawnTime(0, +e.currentTarget.value)
      },
    },
    {
      label: "Hero speed",
      min: 1,
      max: 10,
      step: 1,
      value: GameState.heroesSpeed[0],
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        GameState.changeHeroSpeed(0, +e.currentTarget.value)
      },
    },
  ]

  const rightHeroInputs: InputType[] = [
    {
      label: "Fire rate",
      min: 800,
      max: 2000,
      step: 100,
      value: GameState.spellsSpawnTime[1],
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        GameState.changeSpellsSpawnTime(1, +e.currentTarget.value)
      },
    },
    {
      label: "Hero speed",
      min: 1,
      max: 10,
      step: 1,
      value: GameState.heroesSpeed[1],
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        GameState.changeHeroSpeed(1, +e.currentTarget.value)
      },
    },
  ]

  return (
    <div className="App">
      <Modal />
      <Scoreboard />
      <HeroSettings
        title="Hero 1"
        inputs={leftHeroInputs}
        className="leftHeroSettings"
      />
      <Canvas />
      <HeroSettings
        title="Hero 2"
        inputs={rightHeroInputs}
        className="rightHeroSettings"
      />
    </div>
  )
})

export default App
