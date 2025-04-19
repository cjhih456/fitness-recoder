import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/react'
import { Suspense, useOptimistic } from 'react'
import FitnessListSearch from '@entities/fitness/ui/FitnessListSearch'
import useFitnessSearchModal from '@shared/hooks/fitness-search-modal'
import { BooleanRender } from '@shared/ui/StateRender'

export default function FitnessSearchModal() {
  const { isOpen, setIsOpen, selectedFitnessIds } = useFitnessSearchModal()
  const [lazySelectedFitnessIds, toggleSelectedFitnessIds] = useOptimistic<number[], number>(
    selectedFitnessIds || [],
    (prev, action) => {
      if (prev.includes(action)) {
        return prev.filter(v => v !== action)
      } else {
        return [...prev, action]
      }
    }
  )

  return <Modal
    isOpen={isOpen}
    placement='top'
    scrollBehavior="inside"
    onOpenChange={(v) => setIsOpen({ type: v })}
  >
    <ModalContent>
      {() => <>
        <ModalHeader>Select Exercises</ModalHeader>
        <ModalBody className="overflow-y-hidden -mx-4">
          <BooleanRender
            state={isOpen}
            render={{
              true: () => <>
                <Suspense>
                  <FitnessListSearch selectedFitnessIds={lazySelectedFitnessIds} onToggleFitnessIds={toggleSelectedFitnessIds} needSpace />
                </Suspense>
              </>
            }}
          />
        </ModalBody>
        <ModalFooter>
          <Button onPress={() => {
            setIsOpen({ type: false, resolveList: Array.from(lazySelectedFitnessIds) })
          }}>Save</Button>
          <Button onPress={() => {
            setIsOpen({ type: false })
          }}>Cancel</Button>
        </ModalFooter>
      </>
      }
    </ModalContent>
  </Modal>
}