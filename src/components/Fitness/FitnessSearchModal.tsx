import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import FitnessListSearch from './FitnessListSearch'
import { useEffect, useState } from 'react'

interface FitnessSearchModalProps {
  selectedExercise: IExercise[]
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  onChangeExerciseList?: (exerciseList: IExercise[]) => void
}

export default function FitnessSearchModal({
  isOpen,
  onOpenChange,
  selectedExercise,
  onChangeExerciseList
}: FitnessSearchModalProps) {
  const [lazySelectedExercise, changeLazySelectedExercise] = useState<IExercise[]>([])
  function saveSelectedExercise() {
    if (!selectedExercise) return
    onChangeExerciseList && onChangeExerciseList(lazySelectedExercise)
  }
  useEffect(() => {
    changeLazySelectedExercise(selectedExercise)
  }, [selectedExercise, isOpen])
  return <Modal
    isOpen={isOpen}
    placement='bottom-center'
    scrollBehavior="inside"
    onOpenChange={(v) => onOpenChange(v)}
  >
    <ModalContent>
      {(onCloseAction) => (
        <>
          <ModalHeader>Select Exercises</ModalHeader>
          <ModalBody>
            <FitnessListSearch selectedList={lazySelectedExercise} changeSelectedList={changeLazySelectedExercise}></FitnessListSearch>
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
  </Modal>
}