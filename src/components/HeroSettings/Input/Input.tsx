import s from "./Input.module.scss"
import { ComponentPropsWithoutRef } from "react"

export type InputType = {
  label: string
  minLabel?: string
  maxLabel?: string
  valueLabel?: string
} & Omit<ComponentPropsWithoutRef<"input">, "type" | "id">

export const Input = ({
  label,
  minLabel,
  maxLabel,
  valueLabel,
  ...restInputProps
}: InputType) => {
  return (
    <div className={s.inputWrapper}>
      <label htmlFor={label}>{label}</label>

      <div className={s.input}>
        {minLabel || restInputProps.min}
        <input type="range" id={label} {...restInputProps} />
        {maxLabel || restInputProps.max}
      </div>

      <div className={s.currentValue}>{valueLabel || restInputProps.value}</div>
    </div>
  )
}
