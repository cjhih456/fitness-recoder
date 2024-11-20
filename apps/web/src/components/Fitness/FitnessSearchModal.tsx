import { Button, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import FitnessListSearch from './FitnessListSearch'
import { useEffect, useState } from 'react'
import CModal from '../CustomComponent/CModal'

export interface FitnessSearchModalProps {
  selectedExerciseIdx: number[]
  isOpen: boolean
  onOpenChange: (_isOpen: boolean) => void
  onChangeExerciseIdxList?: (_exerciseList: number[]) => void
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
            <FitnessListSearch selectedList={lazySelectedExerciseIdx} onChangeSelectedList={changeLazySelectedExerciseIdx} needSpace></FitnessListSearch>
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