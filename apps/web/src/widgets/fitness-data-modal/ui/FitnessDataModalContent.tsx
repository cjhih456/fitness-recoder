import { Button, ModalBody, ModalFooter, ModalHeader, ScrollShadow } from '@heroui/react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useGetExerciseFinishHistory } from '@entities/exercise/api'
import { useFitnessFragment } from '@entities/fitness/api'
import { BooleanRender } from '@shared/ui/StateRender'
import DisplayFitnessFinishHistory from './DisplayExerciseFinishHistory'
import FitnessPreviewVideo from './FitnessPreviewVideo'

interface FitnessDataModalContentProps {
  fitnessId: number
  onCloseAction: () => void
}

export default function FitnessDataModalContent({
  fitnessId,
  onCloseAction
}: FitnessDataModalContentProps) {
  const { t } = useTranslation(['exerciseDataInfo', 'common'])

  // Fitness Datas
  const fitnessData = useFitnessFragment(fitnessId ?? 0)

  const fitnessInstructions = fitnessData.instructions
  const fitnessName = fitnessData.name ?? ''

  // History Datas
  const { data: historyData } = useGetExerciseFinishHistory(fitnessId)

  // Fitness Youtube Video
  const [fitnessVideoId, setFitnessVideoId] = useState<string | undefined>()
  useEffect(() => {
    if (fitnessName)
      FitnessPreviewVideo(fitnessName).then(result => setFitnessVideoId(result))
    else setFitnessVideoId(undefined)
  }, [fitnessName])
  return <>
    <ModalHeader>
      {fitnessName || ''}
    </ModalHeader>
    <ModalBody>
      {/* Preview Video */}
      <BooleanRender
        state={Boolean(fitnessVideoId)}
        render={{
          true: () => <div >
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
      <BooleanRender
        state={Boolean(historyData.getExerciseFinishHistory.length)}
        render={{
          true: () => <div className="max-w-full">
            <p className="font-bold text-lg">
              {t('history')}
            </p>
            <ScrollShadow orientation='horizontal'>
              {historyData.getExerciseFinishHistory.map((h) => <DisplayFitnessFinishHistory history={h} key={h.id} />)}
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
      <Button onPress={() => {
        onCloseAction()
      }}>
        {t('common:close')}
      </Button>
    </ModalFooter>
  </>
}