import { Button } from '@nextui-org/react';
import { useMemo } from 'react';
import useScheduleStore from '../../service/Store/ScheduleStoreHooks';
import SetRow from './SetRow';

interface ExerciseDataDisplayProps {
  exerciseDataIdx: string
}

export default function ExerciseDataDisplay({
  exerciseDataIdx
}: ExerciseDataDisplayProps) {
  const scheduleStore = useScheduleStore()
  const exerciseData = useMemo(() => {
    return scheduleStore.getExerciseData(exerciseDataIdx)
  }, [scheduleStore, exerciseDataIdx])
  const setList = useMemo(() => {
    return exerciseData.sets.map((setId, index) => {
      return <SetRow key={setId} index={index + 1} setId={setId}></SetRow>
    })
  }, [exerciseData.sets])
  function appendSet() {
    scheduleStore.appendSetByExerciseDataIdx(exerciseDataIdx)
  }

  return <div className="flex flex-col gap-y-4 pb-2">
    <div className="flex flex-col gap-y-2">
      {setList}
    </div>
    <div className="flex flex-row gap-x-2">
      <Button className="flex-1" onClick={appendSet}>Append Set</Button>
    </div>
  </div>
}