import { Modal, ModalContent } from '@heroui/react';
import { Suspense } from 'react';
import useFitnessDataModal from '@shared/hooks/fitness-data-modal';
import FitnessDataModalContent from './FitnessDataModalContent';

export default function FitnessDataModal() {
  const { fitnessId, setFitnessId } = useFitnessDataModal()
  return <Modal
    isOpen={Boolean(fitnessId)}
    onClose={() => setFitnessId(0)}
    placement='center'
    scrollBehavior='inside'
  >
    <ModalContent>
      {(onCloseAction) =>
        <Suspense>
          <FitnessDataModalContent fitnessId={fitnessId} onCloseAction={onCloseAction} />
        </Suspense>
      }
    </ModalContent>
  </Modal>
}