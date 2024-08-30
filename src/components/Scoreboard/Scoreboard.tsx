import { observer } from "mobx-react-lite"
import Game from "../../store/Game"
import s from "./Scoreboard.module.scss"

export const Scoreboard = observer(() => {
  return (
    <div className={s.scoreboard}>
      {Game.score[0]}:{Game.score[1]}
    </div>
  )
})
