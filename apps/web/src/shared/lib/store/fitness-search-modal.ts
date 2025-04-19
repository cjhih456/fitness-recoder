import { atom } from 'jotai'

interface FitnessSearchModalAtom {
  isOpen: boolean
  selectedFitnessIds?: number[]
  response?: (_list?: number[]) => void
}

export const fitnessSearchModalAtom = atom<FitnessSearchModalAtom>({
  isOpen: false,
  selectedFitnessIds: undefined,
  response: undefined
})
