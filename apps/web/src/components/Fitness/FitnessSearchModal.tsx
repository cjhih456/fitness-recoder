import { Button, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import FitnessListSearch from './FitnessListSearch'
import { useEffect } from 'react'
import CModal from '@components/CustomComponent/CModal'
import useIdToggle from '@hooks/useIdToggle'

export interface FitnessSearchModalProps {
  selectedFitnessIds: number[]
  isOpen: boolean
  onOpenChange: (_isOpen: boolean) => void
  onChangeFitnessIds?: (_exerciseList: number[]) => void
}

export default function FitnessSearchModal({
  isOpen,
  onOpenChange,
  selectedFitnessIds,
  onChangeFitnessIds
}: FitnessSearchModalProps) {
  const [lazySelectedFitnessIds, setLazySelectedExerciseIds, toggleSelectedFitnessIds] = useIdToggle()
  useEffect(() => {
    if (isOpen) setLazySelectedExerciseIds(new Set(selectedFitnessIds))
  }, [isOpen, setLazySelectedExerciseIds, selectedFitnessIds])
  /**
   * Save changes when action save button
   * @returns void
   */
  function saveSelectedExercise() {
    if (!selectedFitnessIds) return
    onChangeFitnessIds && onChangeFitnessIds(lazySelectedFitnessIds)
  }
  return <CModal
    isOpen={isOpen}
    placement='top'
    scrollBehavior="inside"
    onOpenChange={(v) => onOpenChange(v)}
  >
    <ModalContent>
      {(onCloseAction) => (
        <>
          <ModalHeader>Select Exercises</ModalHeader>
          <ModalBody className="overflow-y-hidden -mx-4">
            <FitnessListSearch selectedFitnessIds={lazySelectedFitnessIds} onToggleFitnessIds={toggleSelectedFitnessIds} needSpace></FitnessListSearch>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => {
              saveSelectedExercise()
              onCloseAction()
            }}>Save</Button>
            <Button onClick={() => {
              onCloseAction()
            }}>Cancel</Button>
          </ModalFooter>
        </>
      )}
    </ModalContent>
  </CModal>
}