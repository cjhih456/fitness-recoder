import { useMemo } from 'react'
import CRadioCheckBoxInput from './CRadioCheckBoxGroupInput'

interface HobbyInputProps {
  name: string
  title: string
  required?: string | boolean
}

export default function HobbyInput(props: HobbyInputProps) {
  const radioOptions = useMemo(() => {
    return [
      {
        label: 'Game',
        value: 'game'
      },
      {
        label: 'Driving',
        value: 'driving'
      },
      {
        label: 'Bike',
        value: 'bike'
      }
    ]
  }, [])
  return <CRadioCheckBoxInput
    type="checkbox"
    radioOptions={radioOptions}
    required
    {...props}
  />
}