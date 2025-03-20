import { useContext } from 'react'
import { ModalContext } from '@ui/provider/FitnessDataModalProvider/FitnessDataModalContext'

export default function useFitnessDataModalProvider() {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('Wrong position')
  }
  return context
}