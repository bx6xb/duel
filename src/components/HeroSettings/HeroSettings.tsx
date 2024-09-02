import s from "./HeroSettings.module.scss"
import { Input, InputType } from "./Input/Input"

export type HeroSettingsProps = {
  title: string
  inputs: InputType[]
  className?: string
}

export const HeroSettings = ({
  title = "",
  inputs = [],
  className = "",
}: HeroSettingsProps) => {
  const mappedInputs = inputs.map((data) => (
    <Input key={data.label} {...data} />
  ))

  return (
    <div className={`${s.heroSettings} ${className || ""}`}>
      <h3>{title}</h3>
      {mappedInputs}
    </div>
  )
}
