import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react'
import FitnessSearchModal from '../Fitness/FitnessSearchModal'
import FitnessList from '../Fitness/FitnessList'
import { useLazyGetFitnessListByIds } from '../../service/GqlStore/Fitness'
import { Button } from '@nextui-org/react'

interface FitnessListEditorProps {
  savedIdxData?: number[]
  exerciseIdxList: number[]
  onChangeExerciseIdxList?: Dispatch<SetStateAction<number[]>>
  children?: ReactNode
}

export default function FitnessListEditor({
  savedIdxData,
  exerciseIdxList,
  onChangeExerciseIdxList,
  children
}: FitnessListEditorProps) {
  const [getFitnessListByIds, { data: fitnessList }] = useLazyGetFitnessListByIds()
  const [dialogState, changeDialogState] = useState(false)
  /**
   * Open Search Dialog
   */
  function openSearchDialog() {
    changeDialogState(true)
  }

  const [lazyFitnessIds, changeLazyFitnessIds] = useState<number[]>([])
  useEffect(() => {
    changeLazyFitnessIds(() => {
      return ([] as number[]).concat(exerciseIdxList, savedIdxData ?? [])
    })
  }, [savedIdxData, exerciseIdxList])

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
  function changeSelectedFitnessIds(fitnessIds: number[]) {
    changeLazyFitnessIds((current) => {
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
      onChangeExerciseIdxList && onChangeExerciseIdxList(tempList)
      return tempList
    })
  }

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
        <Button onClick={openSearchDialog}>Add Exercise</Button>
        {children}
      </div>
    </div>
  </>
}