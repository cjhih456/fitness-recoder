import { Button } from '@heroui/react'
import { Suspense, useCallback, useState } from 'react'
import FitnessList from './FitnessList'
import FitnessSearchModal from './FitnessSearchModal'

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
  const [dialogState, setDialogState] = useState(false)

  const [lazyFitnessIds, setLazyFitnessIds] = useState<number[]>(savedIdxData)

  /**
   * update seleted list
   * @param fitnessIds new selected list of exercise index
   */
  const changeSelectedFitnessIds = useCallback((fitnessIds: number[]) => {
    setLazyFitnessIds((current) => {
      const tempList = [] as number[]
      current.forEach(data => {
        if (fitnessIds.includes(data)) {
          tempList.push(data)
        }
      })
      fitnessIds.forEach(v => {
        if (!tempList.includes(v)) {
          tempList.push(v)
        }
      })
      return tempList
    })
  }, [])

  return <div className="flex flex-col gap-y-4 px-4 pt-4">
    <div className="flex flex-col gap-y-2">
      <FitnessList fitnessIds={lazyFitnessIds} />
    </div>
    <div className="grid grid-cols-2 gap-x-2">
      <Button onPress={() => setDialogState(true)}>Add Exercise</Button>
      <Button onPress={() => onSaveAction(lazyFitnessIds, savedIdxData)}>{saveBtnText}</Button>
    </div>
    <Suspense>
      <FitnessSearchModal
        isOpen={dialogState}
        onOpenChange={setDialogState}
        selectedFitnessIds={lazyFitnessIds}
        onChangeFitnessIds={changeSelectedFitnessIds}
      />
    </Suspense>
  </div >
}