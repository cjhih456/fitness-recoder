import type { ChangeEventHandler } from 'react'
import RHFInput from './RHFInput'

interface EmailInputProps {
  name: string
  title: string
  required?: string | boolean
  onChange?: ChangeEventHandler<HTMLInputElement>
}

const validator = {
  emailTypeCheck: (v: string) => {
    return /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(v)
      || 'Wrong Email Patterns'
  }
}

export default function EmailInput(props: EmailInputProps) {
  return <RHFInput
    type="email"
    rules={{ validate: validator }}
    {...props}
  />
}