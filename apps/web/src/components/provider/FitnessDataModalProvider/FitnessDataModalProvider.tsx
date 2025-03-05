import type { ModalContextType } from './FitnessDataModalContext';
import type { ReactNode } from 'react';
import { Button, ModalBody, ModalContent, ModalFooter, ModalHeader, ScrollShadow } from '@nextui-org/react';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CModal from '@components/CustomComponent/CModal';
import { useLazyGetExerciseFinishHistory } from '@hooks/apollo/Exercise';
import useFitnessFragment from '@hooks/apollo/Fragments/useFitnessFragment';
import StateRender from '@utils/StateRender';
import DisplayFitnessFinishHistory from './DisplayExerciseFinishHistory';
import { ModalContext } from './FitnessDataModalContext';
import FitnessPreviewVideo from './FitnessPreviewVideo';

interface ExerciseDataInfoModalProps {
  children: ReactNode
}

export default function FitnessDataModalProvider({
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
  const historyList = useMemo(() => {
    return (historyData?.getExerciseFinishHistory || []).map((h) => <DisplayFitnessFinishHistory history={h} key={h.id} />)
  }, [historyData])

  // Fitness Datas
  const [fitnessData] = useFitnessFragment(fitnessId || 0)

  const fitnessInstructions = useMemo(() => {
    return fitnessData.instructions || []
  }, [fitnessData])
  const fitnessName = useMemo(() => {
    return fitnessData.name || ''
  }, [fitnessData])

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
        {(onCloseAction) => <>
          <ModalHeader>
            {fitnessName || ''}
          </ModalHeader>
          <ModalBody>
            {/* Preview Video */}
            <StateRender.Boolean
              state={Boolean(fitnessVideoId)}
              render={{
                true: <div >
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
                </div>
              }}
            />
            {/* Training History - optional */}
            <StateRender.Boolean
              state={Boolean(historyList.length)}
              render={{
                true: <div className="max-w-full">
                  <p className="font-bold text-lg">
                    {t('history')}
                  </p>
                  <ScrollShadow orientation='horizontal'>
                    {historyList}
                  </ScrollShadow>
                </div>
              }}
            />
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
        </>}
      </ModalContent>
    </CModal>
  </ModalContext.Provider>
}