import { useContext } from 'react'
import { ModalContext } from './ExerciseDataModalContext'

export const useExerciseDataModalProvider = () => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('Wrong position')
  }
  return context
}