import { ChangeEvent } from "react"
import s from "./Modal.module.scss"
import GameState from "../../store/GameState"
import ModalState from "../../store/ModalState"
import { observer } from "mobx-react-lite"

export const Modal = observer(() => {
  const close = () => ModalState.setIsOpen(false)

  const getColor = (e: ChangeEvent<HTMLInputElement>) => {
    GameState.changeSpellColor(e.currentTarget.value)
  }

  return ModalState.isOpen ? (
    <>
      <div className={s.modal}>
        <button onClick={close}>X</button>
        Change hero color
        <input
          type="color"
          value={GameState.spellColor[GameState.currentHero]}
          onChange={getColor}
        />
      </div>
      <div className={s.blackScreen} />
    </>
  ) : null
})
