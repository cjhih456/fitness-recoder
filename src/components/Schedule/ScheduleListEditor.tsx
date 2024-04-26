import { useEffect, useState } from 'react'
import FitnessSearchModal from '../Fitness/FitnessSearchModal'
import FitnessList from '../Fitness/FitnessList'
import { Button } from '@nextui-org/react'

interface ScheduleListEditorProps {
  savedData?: IExercise[]
  exerciseList: IExercise[]
  onChangeExerciseList?: React.Dispatch<React.SetStateAction<IExercise[]>>
  children?: JSX.Element
}

export default function ScheduleListEditor({
  savedData,
  exerciseList,
  onChangeExerciseList,
  children
}: ScheduleListEditorProps) {

  const [dialogState, changeDialogState] = useState(false)
  /**
   * Open Search Dialog
   */
  function openSearchDialog() {
    changeDialogState(true)
  }

  const [lazyExerciseList, changeLazyExerciseList] = useState<IExercise[]>([])

  useEffect(() => {
    changeLazyExerciseList(() => {
      return ([] as IExercise[]).concat(exerciseList, savedData ?? [])
    })
  }, [])


  /**
   * update seleted list
   * @param selectedExerciseList new selected list of exercises
   */
  function changeSelectedExerciseList(selectedExerciseList: IExercise[]) {
    changeLazyExerciseList((current) => {
      const tempList = [] as IExercise[]
      current.forEach(data => {
        if (selectedExerciseList.findIndex(exercise => exercise.name === data.name) !== -1) {
          tempList.push(data)
        }
      })
      selectedExerciseList.forEach(v => {
        if (tempList.findIndex(data => data.name === v.name) === -1) {
          tempList.push(v)
        }
      })
      onChangeExerciseList && onChangeExerciseList(tempList)
      return tempList
    })
  }

  return <>
    <FitnessSearchModal
      isOpen={dialogState}
      onOpenChange={changeDialogState}
      selectedExercise={lazyExerciseList}
      onChangeExerciseList={changeSelectedExerciseList}
    ></FitnessSearchModal>
    <div className="flex flex-col gap-y-4">
      <div className="flex flex-col gap-y-2">
        <FitnessList list={lazyExerciseList}></FitnessList>
      </div>
      <div className="grid grid-cols-2 gap-x-2">
        <Button onClick={openSearchDialog}>Add Exercise</Button>
        {children}
      </div>
    </div>
  </>
}