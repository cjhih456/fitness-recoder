import { Button } from '@nextui-org/react';
import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import FitnessList from '../components/Fitness/FitnessList';
import FitnessSearchModal from '../components/Fitness/FitnessSearchModal';

export default function SelectSchedule() {
  const { selectDate } = useParams()
  // const navigate = useNavigate()

  const [dialogState, changeDialogState] = useState(false)
  const [selectedList, changeSelectList] = useState<ExerciseData[]>([])
  const exerciseList = useMemo(() => selectedList.map(v => v.exercise), [selectedList])
  function startFitnessTime() {

  }
  function openSearchDialog() {
    changeDialogState(true)
  }
  function changeSelectedExerciseList(selectedExerciseList: IExercise[]) {
    changeSelectList((current) => {
      const tempList = [] as ExerciseData[]
      current.forEach(data => {
        if (selectedExerciseList.findIndex(exercise => exercise.name === data.exercise.name) !== -1) {
          tempList.push(data)
        }
      })
      selectedExerciseList.forEach(v => {
        if (tempList.findIndex(data => data.exercise.name === v.name) === -1) {
          const temp = {
            exercise: v,
            sets: []
          } as ExerciseData
          tempList.push(temp)
        }
      })
      return tempList
    })
  }
  return <>
    <FitnessSearchModal
      isOpen={dialogState}
      onOpenChange={changeDialogState}
      selectedExercise={exerciseList}
      onChangeExerciseList={changeSelectedExerciseList}
    ></FitnessSearchModal>
    <div className="flex flex-col gap-y-4">
      <h2>Select Schedule</h2>
      <div className="flex flex-col gap-y-2">
        <FitnessList list={exerciseList}></FitnessList>
      </div>
      <div className="grid grid-cols-2 gap-x-2">
        <Button onClick={openSearchDialog}>Add Exercise</Button>
        <Button onClick={startFitnessTime}>Start Exercise</Button>
      </div>
    </div>
  </>
}
