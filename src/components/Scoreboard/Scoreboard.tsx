import { observer } from "mobx-react-lite"
import s from "./Scoreboard.module.scss"
import HeroesState from "../../store/HeroesState"

export const Scoreboard = observer(() => {
  return (
    <div className={s.scoreboard}>
      {HeroesState.heroes
        .map((hero) => HeroesState.heroesData[hero.id].score)
        .join(" : ")}
    </div>
  )
})
