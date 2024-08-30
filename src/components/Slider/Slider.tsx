import { ComponentPropsWithRef } from "react"
import s from "./Slider.module.scss"

type SliderProps = ComponentPropsWithRef<"input">

export const Slider = (props: SliderProps) => {
  return <input className={s.slider} type="range" {...props} />
}
