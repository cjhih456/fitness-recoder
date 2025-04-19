import { Button } from '@heroui/react'
import { useState } from 'react'
import { useFitnessSearchModalAction } from '@shared/hooks/fitness-search-modal'
import FitnessList from './FitnessList'

interface FitnessListEditorProps {
  savedIdxData?: number[]
  onSaveAction: (_exerciseIdxList: number[], _savedIdxData: number[]) => void
  saveBtnText: string
}

export default function FitnessListEditor({
  savedIdxData = [],
  saveBtnText,
  onSaveAction
}: FitnessListEditorProps) {
  const openAction = useFitnessSearchModalAction()

  const [lazyFitnessIds, setLazyFitnessIds] = useState<number[]>(savedIdxData)
  const setDialogState = () => {
    openAction({ type: true, resolveList: lazyFitnessIds })?.then((list) => {
      if (!list) return
      setLazyFitnessIds(list)
    })
  }

  return <div className="flex flex-col gap-y-4 px-4 pt-4">
    <div className="flex flex-col gap-y-2">
      <FitnessList fitnessIds={lazyFitnessIds} />
    </div>
    <div className="grid grid-cols-2 gap-x-2">
      <Button onPress={() => setDialogState()}>Add Exercise</Button>
      <Button onPress={() => onSaveAction(lazyFitnessIds, savedIdxData)}>{saveBtnText}</Button>
    </div>
  </div >
}