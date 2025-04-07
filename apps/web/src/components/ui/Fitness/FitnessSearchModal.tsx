import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/react'
import { Suspense, useEffect } from 'react'
import useIdToggle from '@shared/hooks/useIdToggle'
import FitnessListSearch from './FitnessListSearch'

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
  return <Modal
    isOpen={isOpen}
    placement='top'
    scrollBehavior="inside"
    onOpenChange={(v) => onOpenChange(v)}
  >
    <ModalContent>
      {(onCloseAction) => <>
        <ModalHeader>Select Exercises</ModalHeader>
        <ModalBody className="overflow-y-hidden -mx-4">
          <Suspense>
            <FitnessListSearch selectedFitnessIds={lazySelectedFitnessIds} onToggleFitnessIds={toggleSelectedFitnessIds} needSpace></FitnessListSearch>
          </Suspense>
        </ModalBody>
        <ModalFooter>
          <Button onPress={() => {
            saveSelectedExercise()
            onCloseAction()
          }}>Save</Button>
          <Button onPress={() => {
            onCloseAction()
          }}>Cancel</Button>
        </ModalFooter>
      </>
      }
    </ModalContent>
  </Modal>
}