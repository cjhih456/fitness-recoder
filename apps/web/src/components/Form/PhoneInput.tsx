import type { ChangeEventHandler } from 'react'
import type { Control, FieldValues } from 'react-hook-form'
import { AsYouType } from 'libphonenumber-js/mobile'
import RHFInput from './RHFInput'

interface PhoneInputProps {
  name: string
  title: string
  required?: string | boolean
  control?: Control<FieldValues>
  onChange?: ChangeEventHandler<HTMLInputElement>
}

const validator = {
  phoneType: (v: string) => {
    const phoneTypeChecker = new AsYouType()
    phoneTypeChecker.reset()
    phoneTypeChecker.input(v)
    const number = phoneTypeChecker.getNumber()
    return number?.getType() && number?.isPossible() || 'Wrong Number Pattern'
  }
}

export default function PhoneInput(props: PhoneInputProps) {
  return <RHFInput
    rules={{
      validate: validator
    }}
    {...props}
  />
}