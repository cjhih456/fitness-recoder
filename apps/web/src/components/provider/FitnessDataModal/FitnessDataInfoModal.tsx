import { Button, ModalBody, ModalContent, ModalFooter, ModalHeader, ScrollShadow } from '@nextui-org/react';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import CModal from '../../CustomComponent/CModal';
import FitnessPreviewVideo from './FitnessPreviewVideo';
import { useLazyGetExerciseFinishHistory } from '../../../service/GqlStore/Exercise';
import DisplayFitnessFinishHistory from './DisplayExerciseFinishHistory';
import { useTranslation } from 'react-i18next';
import { ModalContext, ModalContextType } from './FitnessDataModalContext';
import { FitnessFragment, FitnessStoreType, useLazyGetFitnessById } from '../../../service/GqlStore/Fitness';
import { useFragment } from '@apollo/client';


interface ExerciseDataInfoModalProps {
  children: ReactNode
}

export default function FitnessDataInfoModal({
  children
}: ExerciseDataInfoModalProps) {
  const { t } = useTranslation(['exerciseDataInfo', 'common'])
  // Modal Display Context
  const [lazyOpen, setLazyOpen] = useState(false)
  const [fitnessId, setFitnessId] = useState<number | undefined>()
  const contextValue = {
    showModal(fitnessId) {
      setFitnessId(fitnessId)
    }
  } as ModalContextType

  // History Datas
  const [loadHistory, { data: historyData }] = useLazyGetExerciseFinishHistory()
  const history = useMemo(() => {
    return historyData?.getExerciseFinishHistory || []
  }, [historyData])
  const historyList = useMemo(() => {
    return history.map((h) => (<DisplayFitnessFinishHistory history={h} key={h.id} />))
  }, [history])

  // Fitness Datas
  const { data: fitnessData, complete } = useFragment<FitnessStoreType>({
    fragment: FitnessFragment,
    from: {
      id: fitnessId || 0,
      __typename: 'Fitness'
    }
  })
  const [lazyGetFitnessById, { called, data }] = useLazyGetFitnessById()
  useEffect(() => {
    if (!complete && fitnessId) {
      lazyGetFitnessById({ variables: { id: fitnessId } })
    }
  }, [complete, fitnessId, lazyGetFitnessById])
  const computedFitnessData = useMemo(() => {
    return (called ? data?.getFitnessById : fitnessData) || {}
  }, [called, data, fitnessData])

  const fitnessInstructions = useMemo(() => {
    return computedFitnessData.instructions || []
  }, [computedFitnessData])
  const fitnessName = useMemo(() => {
    return computedFitnessData.name || ''
  }, [computedFitnessData])

  // Fitness Youtube Video
  const [fitnessVideoId, setFitnessVideoId] = useState<string | undefined>()
  useEffect(() => {
    if (fitnessName)
      FitnessPreviewVideo(fitnessName).then(result => setFitnessVideoId(result))
    else setFitnessVideoId(undefined)
  }, [fitnessName])

  useEffect(() => {
    if (fitnessId) {
      loadHistory({
        variables: {
          exerciseId: fitnessId
        }
      })
    }
    setLazyOpen(Boolean(fitnessId))
  }, [fitnessId, loadHistory])

  return <ModalContext.Provider value={contextValue}>
    {children}
    <CModal
      isOpen={lazyOpen}
      onOpenChange={(v) => {
        setFitnessId(v ? fitnessId : undefined)
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
            {fitnessVideoId && <div >
              <iframe
                width="100%"
                height="315"
                sandbox="allow-scripts allow-same-origin allow-presentation"
                src={`https://www.youtube.com/embed/${fitnessVideoId}`}
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