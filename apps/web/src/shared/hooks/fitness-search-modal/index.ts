import { useAtomValue, useSetAtom } from 'jotai'
import { fitnessSearchModalAtom } from '../../lib/store/fitness-search-modal'

export const useFitnessSearchModalState = () => {
  return useAtomValue(fitnessSearchModalAtom)
}

export const useFitnessSearchModalAction = () => {
  const setIsOpen = useSetAtom(fitnessSearchModalAtom)
  const fitnessSearchModalAction = ({ type, resolveList }: { type: boolean, resolveList?: number[] }) => {
    if (type) {
      return new Promise<number[] | undefined>((resolver) => {
        setIsOpen({
          isOpen: type,
          selectedFitnessIds: resolveList,
          response: resolver
        })
      })
    } else {
      setIsOpen((prev) => {
        prev.response?.(resolveList)
        return {
          isOpen: false,
          selectedFitnessIds: undefined,
          response: undefined
        }
      })
    }

  }
  return fitnessSearchModalAction
}

export default function useFitnessSearchModal() {
  const { isOpen, selectedFitnessIds } = useFitnessSearchModalState()
  const setIsOpen = useFitnessSearchModalAction()
  return {
    isOpen,
    selectedFitnessIds,
    setIsOpen
  }
}