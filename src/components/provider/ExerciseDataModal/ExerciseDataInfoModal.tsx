import { Button, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import { createContext, useEffect, useMemo, useState } from 'react';
import { getExerciseByIdx } from '../../../service/Fitness/FitnessDatas';
import CModal from '../../CustomComponent/CModal';
import ExercisePreviewVideo from './ExercisePreviewVideo';

type ModalContextType = {
  showModal: (exerciseId: number) => void
}

export const ModalContext = createContext<ModalContextType>({
  showModal: () => { }
})

interface ExerciseDataInfoModal {
  children: React.ReactNode
}

export default function ExerciseDataInfoModal({
  children
}: ExerciseDataInfoModal) {

  const [exerciseDataId, setExerciseDataId] = useState<number | undefined>()
  const [exerciseData, setExerciseData] = useState<IExercise | undefined>()
  const [exerciseVideoId, setExerciseVideoId] = useState<string | undefined>()
  const instructions = useMemo(() => {
    const tempList = Array.isArray(exerciseData?.instructions) ? exerciseData?.instructions : [exerciseData?.instructions]
    return tempList.filter(Boolean)
  }, [exerciseData])
  const [lazyOpen, setLazyOpen] = useState(false)
  useEffect(() => {
    const temp = typeof exerciseDataId === 'number'
    if (temp) {
      const exercise = getExerciseByIdx(exerciseDataId)
      setExerciseData(exercise)
      ExercisePreviewVideo(exercise.name).then(result => setExerciseVideoId(result))
    }
    setLazyOpen(temp)
  }, [exerciseDataId])
  // useEffect(() => {
  //   if (isOpen === lazyOpen) return
  //   setLazyOpen(isOpen)
  // }, [isOpen])
  const contextValue = {
    showModal(exerciseId) {
      setExerciseDataId(exerciseId)
    }
  } as ModalContextType

  return <ModalContext.Provider value={contextValue}>
    {children}
    <CModal
      isOpen={lazyOpen}
      onOpenChange={(v) => {
        setExerciseDataId(v ? exerciseDataId : undefined)
      }}
      placement='center'
      scrollBehavior='inside'
    >
      <ModalContent>
        {(onCloseAction) => (<>
          <ModalHeader>
            {exerciseData?.name || ''}
          </ModalHeader>
          <ModalBody>
            {/* Preview Images */}
            {exerciseVideoId && <div >
              <iframe
                width="100%"
                height="315"
                sandbox="allow-scripts allow-same-origin allow-presentation"
                src={`https://www.youtube.com/embed/${exerciseVideoId}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                credentialless="true"
              ></iframe>
            </div>}
            {/* Training History - optional */}
            <div className="max-w-full overflow-x-scroll">

            </div>
            {/* Info - height - 400px */}
            <ol className="max-h-[400px] overflow-y-scroll max-w-full list-decimal list-outside">
              {instructions.map((line, idx) => {
                return <li className="ml-6" key={`${exerciseData?.idx}-${idx}`}>{line}</li>
              })}
            </ol>
          </ModalBody>
          <ModalFooter>
            {/* CloseBtn */}
            <Button onClick={() => {
              onCloseAction()
            }}>Close</Button>
          </ModalFooter>
        </>)}
      </ModalContent>
    </CModal>
  </ModalContext.Provider>
}