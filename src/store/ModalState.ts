import { makeAutoObservable } from "mobx"

class Modal {
  isOpen = false

  constructor() {
    makeAutoObservable(this)
  }

  setIsOpen(isOpen: boolean) {
    this.isOpen = isOpen
  }
}

export default new Modal()
