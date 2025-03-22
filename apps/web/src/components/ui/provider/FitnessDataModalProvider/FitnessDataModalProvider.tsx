import type { ModalContextType } from './FitnessDataModalContext';
import type { ReactNode } from 'react';
import { Modal, ModalContent } from '@heroui/react';
import { Suspense, useState } from 'react';
import FitnessDataModalContent from './FitnessDataModal';
import { ModalContext } from './FitnessDataModalContext';

interface ExerciseDataInfoModalProps {
  children: ReactNode
}

export default function FitnessDataModalProvider({
  children
}: ExerciseDataInfoModalProps) {
  // Modal Display Context
  const [fitnessId, setFitnessId] = useState<number>(0)
  const contextValue = {
    showModal(fitnessId) {
      setFitnessId(fitnessId)
    }
  } as ModalContextType

  return <ModalContext.Provider value={contextValue}>
    {children}
    <Modal
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
  </ModalContext.Provider>
}