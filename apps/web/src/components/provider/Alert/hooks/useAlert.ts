import { useContext } from 'react'
import AlertContext from '@provider/Alert/AlertProvider/AlertContext'

export default function useAlert() {
  const context = useContext(AlertContext)
  if (!context) {
    throw new Error('Wrong position')
  }
  return context
}