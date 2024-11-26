import { Button, ModalBody, ModalContent, ModalFooter, ModalHeader, ScrollShadow } from '@nextui-org/react';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import CModal from '../../CustomComponent/CModal';
import ExercisePreviewVideo from './ExercisePreviewVideo';
import { useLazyGetExerciseFinishHistory } from '../../../service/GqlStore/Exercise';
import DisplayExerciseFinishHistory from './DisplayExerciseFinishHistory';
import { useTranslation } from 'react-i18next';
import { Exercise } from 'fitness-struct';
import { ModalContext, ModalContextType } from './ExerciseDataModalContext';
import { useLazyGetFitnessById } from '../../../service/GqlStore/Fitness';


interface ExerciseDataInfoModalProps {
  children: ReactNode
}

export default function ExerciseDataInfoModal({
  children
}: ExerciseDataInfoModalProps) {
  const { t } = useTranslation(['exerciseDataInfo', 'common'])
  const [loadHistory] = useLazyGetExerciseFinishHistory()
  const [exerciseDataId, setExerciseDataId] = useState<number | undefined>()
  const [exerciseData, setExerciseData] = useState<Exercise.IFitness | undefined>()
  const [exerciseVideoId, setExerciseVideoId] = useState<string | undefined>()
  const [history, setHistory] = useState<Exercise.HistoryData[]>([])
  const [getFitnessById] = useLazyGetFitnessById()
  const instructions = useMemo(() => {
    const tempList = Array.isArray(exerciseData?.instructions) ? exerciseData?.instructions : [exerciseData?.instructions]
    return tempList.filter(Boolean)
  }, [exerciseData])
  const [lazyOpen, setLazyOpen] = useState(false)
  useEffect(() => {
    if (exerciseData?.id !== exerciseDataId && exerciseDataId) {
      getFitnessById({
        variables: {
          id: exerciseDataId
        }
      }).then(result => {
        setExerciseData(result.data?.getFitnessById)
        if (result.data?.getFitnessById.name)
          ExercisePreviewVideo(result.data?.getFitnessById.name).then(result => setExerciseVideoId(result))
        else setExerciseVideoId(undefined)
      })
      loadHistory({
        variables: {
          exerciseId: exerciseDataId
        }
      }).then((result) => {
        if (result.data) {
          setHistory(result.data?.getExerciseFinishHistory || [])
        }
      })
    }
    setLazyOpen(Boolean(exerciseDataId))
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
                  return <li className="ml-6" key={`${exerciseData?.id}-${idx}`}>{line}</li>
                })}
              </ol>
            </div>
          </ModalBody>
          <ModalFooter>
            {/* CloseBtn */}
            <Button onClick={() => {
              onCloseAction()
            }}>
              {t('common:close')}
            </Button>
          </ModalFooter>
        </>)}
      </ModalContent>
    </CModal>
  </ModalContext.Provider>
}