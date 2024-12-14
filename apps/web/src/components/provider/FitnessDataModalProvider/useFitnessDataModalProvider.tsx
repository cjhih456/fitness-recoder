import { useContext } from 'react'
import { ModalContext } from './FitnessDataModalContext'

export const useFitnessDataModalProvider = () => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('Wrong position')
  }
  return context
}