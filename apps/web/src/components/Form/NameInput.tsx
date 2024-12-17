import type { ChangeEventHandler } from 'react'
import type { Control, FieldValues } from 'react-hook-form'
import CInput from './RHFInput'

interface NameInputProps {
  name: string
  title: string
  control?: Control<FieldValues>
  required?: string | boolean
  min?: number
  max?: number
  onChange?: ChangeEventHandler<HTMLInputElement>
}

export default function NameInput(props: NameInputProps) {
  // TODO: add name validator
  return <CInput
    type="text"
    {...props}
  />
}