import { ChangeEvent } from "react"
import s from "./Modal.module.scss"
import ModalState from "../../store/ModalState"
import { observer } from "mobx-react-lite"
import HeroesState from "../../store/HeroesState"

export const Modal = observer(() => {
  const currentHeroId = ModalState.currentHeroId

  const close = () => ModalState.setIsOpen(false)

  const getColor = (e: ChangeEvent<HTMLInputElement>) => {
    const spellColor = e.currentTarget.value
    HeroesState.changeSpellColor(currentHeroId, spellColor)
  }

  const spellColorInputValue = HeroesState.getSpellColor(currentHeroId)

  return ModalState.isOpen ? (
    <>
      <div className={s.modal}>
        <button onClick={close}>X</button>
        Change hero color
        <input type="color" value={spellColorInputValue} onChange={getColor} />
      </div>
      <div className={s.blackScreen} />
    </>
  ) : null
})
