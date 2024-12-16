import { useMemo } from 'react'
import CRadioCheckBoxInput from './CRadioCheckBoxGroupInput'

interface GenderInputProps {
  name: string
  title: string
  required?: string | boolean
}

export default function GenderInput(props: GenderInputProps) {
  const radioOptions = useMemo(() => {
    return [
      {
        label: 'Male',
        value: 'male'
      },
      {
        label: 'Female',
        value: 'female'
      }
    ]
  }, [])
  return <CRadioCheckBoxInput
    type="radio"
    radioOptions={radioOptions}
    required
    {...props}
  />
}