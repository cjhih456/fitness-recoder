import { useEffect, useState } from 'react'
import FitnessSearchModal from '../Fitness/FitnessSearchModal'
import FitnessList from '../Fitness/FitnessList'
import { Button } from '@nextui-org/react'

interface ScheduleListEditorProps {
  savedIdxData?: number[]
  exerciseIdxList: number[]
  onChangeExerciseIdxList?: React.Dispatch<React.SetStateAction<number[]>>
  children?: JSX.Element
}

export default function ScheduleListEditor({
  savedIdxData,
  exerciseIdxList,
  onChangeExerciseIdxList,
  children
}: ScheduleListEditorProps) {

  const [dialogState, changeDialogState] = useState(false)
  /**
   * Open Search Dialog
   */
  function openSearchDialog() {
    changeDialogState(true)
  }

  const [lazyExerciseIdxList, changeLazyExerciseIdxList] = useState<number[]>([])

  useEffect(() => {
    changeLazyExerciseIdxList(() => {
      return ([] as number[]).concat(exerciseIdxList, savedIdxData ?? [])
    })
  }, [])


  /**
   * update seleted list
   * @param selectedExerciseList new selected list of exercise index
   */
  function changeSelectedExerciseIdxList(selectedExerciseList: number[]) {
    changeLazyExerciseIdxList((current) => {
      const tempList = [] as number[]
      current.forEach(data => {
        if (selectedExerciseList.includes(data)) {
          tempList.push(data)
        }
      })
      selectedExerciseList.forEach(v => {
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
      selectedExerciseIdx={lazyExerciseIdxList}
      onChangeExerciseIdxList={changeSelectedExerciseIdxList}
    ></FitnessSearchModal>
    <div className="flex flex-col gap-y-4">
      <div className="flex flex-col gap-y-2">
        <FitnessList list={lazyExerciseIdxList}></FitnessList>
      </div>
      <div className="grid grid-cols-2 gap-x-2">
        <Button onClick={openSearchDialog}>Add Exercise</Button>
        {children}
      </div>
    </div>
  </>
}