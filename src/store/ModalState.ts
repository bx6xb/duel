import { makeAutoObservable } from "mobx"

class Modal {
  isOpen = false
  currentHeroId = ""

  constructor() {
    makeAutoObservable(this)
  }

  setIsOpen(isOpen: boolean) {
    this.isOpen = isOpen
  }

  setCurrentHeroId(currentHeroId: string) {
    this.currentHeroId = currentHeroId
  }
}

export default new Modal()
