import type { ChangeEventHandler } from 'react'
import type { Control, FieldValues } from 'react-hook-form'
import RHFInput from './RHFInput'

interface NickNameInputProps {
  name: string
  title: string
  control?: Control<FieldValues>
  required?: string | boolean
  min?: number
  max?: number
  onChange?: ChangeEventHandler<HTMLInputElement>
}

export default function NickNameInput(props: NickNameInputProps) {
  // TODO: add nickname validator
  return <RHFInput
    {...props}
  />
}