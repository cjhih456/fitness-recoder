import { useContext } from 'react'
import { ModalContext } from './ExerciseDataInfoModal'

export const useExerciseDataModalProvider = () => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('Wrong position')
  }
  return context
}