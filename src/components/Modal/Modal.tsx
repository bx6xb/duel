import { ChangeEvent, useEffect } from "react"
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

  useEffect(() => {
    // reset mouse position to avoid bug
    HeroesState.heroes.forEach((hero) => {
      console.log(hero)
      hero.setMousePos([0, 0])
    })
  }, [])

  return (
    <>
      <div className={s.modal}>
        <button onClick={close}>X</button>
        Change hero color
        <input type="color" value={spellColorInputValue} onChange={getColor} />
      </div>
      <div className={s.blackScreen} />
    </>
  )
})
