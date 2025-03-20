import { Button } from '@heroui/react'
import { useCallback, useEffect, useState } from 'react'
import { useLazyGetFitnessListByIds } from '@hooks/apollo/Fitness'
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
  const [getFitnessListByIds, { data: fitnessList }] = useLazyGetFitnessListByIds()
  const [dialogState, changeDialogState] = useState(false)
  /**
   * Open Search Dialog
   */
  function openSearchDialog() {
    changeDialogState(true)
  }

  const [lazyFitnessIds, setLazyFitnessIds] = useState<number[]>([])
  useEffect(() => {
    if (savedIdxData.length)
      setLazyFitnessIds(savedIdxData)
  }, [savedIdxData])

  useEffect(() => {
    getFitnessListByIds({
      variables: {
        ids: lazyFitnessIds
      }
    })
  }, [lazyFitnessIds, getFitnessListByIds])

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

  return <>
    <FitnessSearchModal
      isOpen={dialogState}
      onOpenChange={changeDialogState}
      selectedFitnessIds={lazyFitnessIds}
      onChangeFitnessIds={changeSelectedFitnessIds}
    ></FitnessSearchModal>
    <div className="flex flex-col gap-y-4 px-4 pt-4">
      <div className="flex flex-col gap-y-2">
        <FitnessList list={fitnessList?.getFitnessListByIds || []}></FitnessList>
      </div>
      <div className="grid grid-cols-2 gap-x-2">
        <Button onPress={openSearchDialog}>Add Exercise</Button>
        <Button onPress={() => onSaveAction(lazyFitnessIds, savedIdxData)}>{saveBtnText}</Button>
      </div>
    </div>
  </>
}