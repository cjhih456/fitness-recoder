import { AsYouType } from 'libphonenumber-js/mobile'
import { useCallback, useRef } from 'react'
import RHFInput from './RHFInput'

interface PhoneInputProps {
  name: string
  title: string
  required?: string | boolean
}

export default function PhoneInput(props: PhoneInputProps) {
  const parser = useRef<AsYouType>()
  const validateRule = useCallback((v: string) => {
    parser.current = parser.current ?? new AsYouType()
    parser.current.reset()
    parser.current.input(v)
    const number = parser.current.getNumber()
    return number?.getType() && number?.isPossible() ? true : 'Wrong Number Pattern'
  }, [])

  return <RHFInput
    pattern={/[0-9+].+/}
    {...props}
    validate={validateRule}
  />
}