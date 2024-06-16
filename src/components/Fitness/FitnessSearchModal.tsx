import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import FitnessListSearch from './FitnessListSearch'
import { useEffect, useState } from 'react'

interface FitnessSearchModalProps {
  selectedExerciseIdx: number[]
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  onChangeExerciseIdxList?: (exerciseList: number[]) => void
}

export default function FitnessSearchModal({
  isOpen,
  onOpenChange,
  selectedExerciseIdx,
  onChangeExerciseIdxList
}: FitnessSearchModalProps) {
  const [lazySelectedExerciseIdx, changeLazySelectedExerciseIdx] = useState<number[]>([])
  function saveSelectedExercise() {
    if (!selectedExerciseIdx) return
    onChangeExerciseIdxList && onChangeExerciseIdxList(lazySelectedExerciseIdx)
  }
  useEffect(() => {
    changeLazySelectedExerciseIdx(selectedExerciseIdx)
  }, [selectedExerciseIdx, isOpen])
  return <Modal
    isOpen={isOpen}
    placement='top'
    scrollBehavior="inside"
    onOpenChange={(v) => onOpenChange(v)}
  >
    <ModalContent>
      {(onCloseAction) => (
        <>
          <ModalHeader>Select Exercises</ModalHeader>
          <ModalBody>
            <FitnessListSearch selectedList={lazySelectedExerciseIdx} changeSelectedList={changeLazySelectedExerciseIdx}></FitnessListSearch>
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