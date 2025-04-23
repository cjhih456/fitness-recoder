import type { FitnessSearchFormData } from '@entities/fitness/model/FitnessSearchFormData'
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ScrollShadow } from '@heroui/react'
import { Suspense, useEffect, useState } from 'react'
import FitnessSearchForm from '@entities/fitness/ui/FitnessSearchForm'
import FitnessListByFilter from '@features/fitness/ui/FitnessListByKeywords'
import useFitnessSearchModal from '@shared/hooks/fitness-search-modal'
import useIdToggle from '@shared/hooks/useIdToggle'
import { BooleanRender } from '@shared/ui/StateRender'

export default function FitnessSearchModal() {
  const { isOpen, setIsOpen, selectedFitnessIds } = useFitnessSearchModal()
  const [searchFormData, setSearchFormData] = useState<FitnessSearchFormData>({
    name: '',
    category: [],
    muscle: []
  })
  const [lazySelectedFitnessIds, setLazySelectedFitnessIds, toggleSelectedFitnessId] = useIdToggle()
  useEffect(() => {
    if (selectedFitnessIds) {
      setLazySelectedFitnessIds(new Set(selectedFitnessIds))
    }
  }, [selectedFitnessIds, setLazySelectedFitnessIds])

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
                <FitnessSearchForm
                  className='px-4'
                  value={searchFormData}
                  onValueChange={setSearchFormData}
                />
                <ScrollShadow className='px-4'>
                  <Suspense>
                    <FitnessListByFilter
                      selectedFitnessIds={lazySelectedFitnessIds}
                      onToggleFitnessIds={toggleSelectedFitnessId}
                      searchFilter={searchFormData}
                    />
                  </Suspense>
                </ScrollShadow>
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