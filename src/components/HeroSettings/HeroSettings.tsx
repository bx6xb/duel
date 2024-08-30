import { ComponentPropsWithoutRef, Fragment } from "react"
import s from "./HeroSettings.module.scss"

type HeroSettingsProps = {
  title: string
  inputs: InputType[]
  className: string
}

export type InputType = {
  label: string
} & Omit<ComponentPropsWithoutRef<"input">, "type" | "id">

export const HeroSettings = ({
  title,
  inputs,
  className,
}: HeroSettingsProps) => {
  const mappedInputs = inputs.map((i) => {
    const { label, ...restInputProps } = i

    return (
      <Fragment key={label}>
        <label htmlFor={label}>{label}</label>
        <div className={s.input}>
          {restInputProps.min}
          <input type="range" id={label} {...restInputProps} />
          {restInputProps.max}
        </div>
        {restInputProps.value}
      </Fragment>
    )
  })

  return (
    <div className={`${s.heroSettings} ${className || ""}`}>
      {title}
      {mappedInputs}
    </div>
  )
}
