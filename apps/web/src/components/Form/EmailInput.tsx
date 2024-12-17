import RHFInput from './RHFInput'

interface EmailInputProps {
  name: string
  title: string
  required?: string | boolean
}

export default function EmailInput(props: EmailInputProps) {
  return <RHFInput
    type="email"
    pattern={{
      value: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
      message: 'Wrong Email Patterns'
    }}
    {...props}
  />
}