import { Button, ModalBody, ModalContent, ModalFooter, ModalHeader, ScrollShadow } from '@nextui-org/react';
import { createContext, useEffect, useMemo, useState } from 'react';
import { getExerciseByIdx } from '../../../service/Fitness/FitnessDatas';
import CModal from '../../CustomComponent/CModal';
import ExercisePreviewVideo from './ExercisePreviewVideo';
import { useLazyGetExerciseFinishHistory } from '../../../service/GqlStore/Exercise';
import DisplayExerciseFinishHistory from './DisplayExerciseFinishHistory';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation(['exerciseDataInfo', 'common'])
  const [loadHistory] = useLazyGetExerciseFinishHistory()
  const [exerciseDataId, setExerciseDataId] = useState<number | undefined>()
  const [exerciseData, setExerciseData] = useState<IExercise | undefined>()
  const [exerciseVideoId, setExerciseVideoId] = useState<string | undefined>()
  const [history, setHistory] = useState<ExerciseHistoryData[]>([])
  const instructions = useMemo(() => {
    const tempList = Array.isArray(exerciseData?.instructions) ? exerciseData?.instructions : [exerciseData?.instructions]
    return tempList.filter(Boolean)
  }, [exerciseData])
  const [lazyOpen, setLazyOpen] = useState(false)
  useEffect(() => {
    const temp = typeof exerciseDataId === 'number'
    if (temp && exerciseData?.idx !== exerciseDataId) {
      const exercise = getExerciseByIdx(exerciseDataId)
      setExerciseData(exercise)
      loadHistory({
        variables: {
          exerciseId: exerciseDataId
        }
      }).then((result) => {
        if (result.data) {
          setHistory(result.data?.getExerciseFinishHistory || [])
        }
      })
      ExercisePreviewVideo(exercise.name).then(result => setExerciseVideoId(result))
    }
    setLazyOpen(temp)
  }, [exerciseDataId])

  const historyList = useMemo(() => {
    return history.map((h) => (<DisplayExerciseFinishHistory history={h} key={h.id} />))
  }, [history])

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
            {/* Preview Video */}
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
            {history.length ? <div className="max-w-full">
              <p className="font-bold text-lg">
                {t('history')}
              </p>
              <ScrollShadow orientation='horizontal'>
                {historyList}
              </ScrollShadow>
            </div> : undefined}
            {/* Instructions */}
            <div>
              <p className="font-bold text-lg">{t('instructions')}</p>
              <ol className="max-w-full list-decimal list-outside">
                {instructions.map((line, idx) => {
                  return <li className="ml-6" key={`${exerciseData?.idx}-${idx}`}>{line}</li>
                })}
              </ol>
            </div>
          </ModalBody>
          <ModalFooter>
            {/* CloseBtn */}
            <Button onClick={() => {
              onCloseAction()
            }}>
              {t('close')}
            </Button>
          </ModalFooter>
        </>)}
      </ModalContent>
    </CModal>
  </ModalContext.Provider>
}