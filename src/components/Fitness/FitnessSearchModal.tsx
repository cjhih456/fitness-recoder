import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import FitnessListSearch from './FitnessListSearch'

interface FitnessSearchModalProps {
  selectedExercise: IExercise[]
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  onChangeExerciseList: (exerciseList: IExercise[]) => void
}

export default function FitnessSearchModal({
  isOpen,
  onOpenChange,
  selectedExercise,
  onChangeExerciseList
}: FitnessSearchModalProps) {

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
            <FitnessListSearch selectedList={selectedExercise} changeSelectedList={onChangeExerciseList}></FitnessListSearch>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => {
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