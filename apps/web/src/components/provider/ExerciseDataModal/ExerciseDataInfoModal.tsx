import { Button, ModalBody, ModalContent, ModalFooter, ModalHeader, ScrollShadow } from '@nextui-org/react';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import CModal from '../../CustomComponent/CModal';
import ExercisePreviewVideo from './ExercisePreviewVideo';
import { useLazyGetExerciseFinishHistory } from '../../../service/GqlStore/Exercise';
import DisplayExerciseFinishHistory from './DisplayExerciseFinishHistory';
import { useTranslation } from 'react-i18next';
import { ModalContext, ModalContextType } from './ExerciseDataModalContext';
import { useLazyGetFitnessById } from '../../../service/GqlStore/Fitness';


interface ExerciseDataInfoModalProps {
  children: ReactNode
}

export default function ExerciseDataInfoModal({
  children
}: ExerciseDataInfoModalProps) {
  const { t } = useTranslation(['exerciseDataInfo', 'common'])
  // Modal Display Context
  const [lazyOpen, setLazyOpen] = useState(false)
  const [exerciseDataId, setExerciseDataId] = useState<number | undefined>()
  const contextValue = {
    showModal(exerciseId) {
      setExerciseDataId(exerciseId)
    }
  } as ModalContextType

  // History Datas
  const [loadHistory, { data: historyData }] = useLazyGetExerciseFinishHistory()
  const history = useMemo(() => {
    return historyData?.getExerciseFinishHistory || []
  }, [historyData])
  const historyList = useMemo(() => {
    return history.map((h) => (<DisplayExerciseFinishHistory history={h} key={h.id} />))
  }, [history])

  // Fitness Datas
  const [getFitnessById, { data: fitnessData }] = useLazyGetFitnessById()
  const fitnessId = useMemo(() => fitnessData?.getFitnessById.id, [fitnessData])
  const fitnessInstructions = useMemo(() => {
    return fitnessData?.getFitnessById.instructions || []
  }, [fitnessData])
  const fitnessName = useMemo(() => {
    return fitnessData?.getFitnessById.name || ''
  }, [fitnessData])

  // Fitness Youtube Video
  const [exerciseVideoId, setExerciseVideoId] = useState<string | undefined>()
  useEffect(() => {
    if (fitnessName)
      ExercisePreviewVideo(fitnessName).then(result => setExerciseVideoId(result))
    else setExerciseVideoId(undefined)
  }, [fitnessName])

  useEffect(() => {
    if (fitnessId !== exerciseDataId && exerciseDataId) {
      getFitnessById({
        variables: {
          id: exerciseDataId
        }
      })
      loadHistory({
        variables: {
          exerciseId: exerciseDataId
        }
      })
    }
    setLazyOpen(Boolean(exerciseDataId))
  }, [exerciseDataId])

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
            {fitnessName || ''}
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
                {fitnessInstructions.map((line, idx) => {
                  return <li className="ml-6" key={`${fitnessId}-${idx}`}>{line}</li>
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