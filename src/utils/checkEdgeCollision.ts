import { Spell } from "../classes/Spell"

export const checkEdgeCollision = (spells: Spell[]) =>
  spells.filter((s) => {
    const isCollision =
      s.currentX + s.spellRadius >= s.canvas.width ||
      s.currentX - s.spellRadius <= 0 // right and left edge collision

    if (isCollision) {
      s.clear()
    }
    return !isCollision
  })
