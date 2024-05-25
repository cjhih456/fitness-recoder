import { Button } from '@nextui-org/react';
import { useMemo } from 'react';
import useScheduleStore from '../../service/Store/ScheduleStoreHooks';
import SetRow from './SetRow';

interface ExerciseDataDisplayProps {
  exerciseDataIdx: string
  hasDoneLastSet?: () => void
  readonly?: boolean
}

export default function ExerciseDataDisplay({
  exerciseDataIdx,
  hasDoneLastSet,
  readonly
}: ExerciseDataDisplayProps) {
  const scheduleStore = useScheduleStore()

  const exerciseData = useMemo(() => {
    return scheduleStore.getExerciseData(exerciseDataIdx) || { sets: [] }
  }, [scheduleStore, exerciseDataIdx])
  const setData = useMemo(() => {
    return scheduleStore.getSetListData(exerciseData.sets)
  }, [exerciseData, scheduleStore])

  function appendSet() {
    scheduleStore.appendSetByExerciseDataIdx(exerciseDataIdx)
  }

  function checkAllSetDone(idx: string, isDone: boolean) {
    if (isDone && (!setData.filter(v => !v.isDone).filter(v => v.id !== idx).length)) {
      hasDoneLastSet && hasDoneLastSet()
    }
  }

  return <div className="flex flex-col gap-y-4 pb-2">
    <div className="flex flex-col gap-y-2">
      {exerciseData.sets.map((setId, index) => {
        return <SetRow key={setId} index={index + 1} setId={setId} isDoneChange={(v) => { checkAllSetDone(setId, v) }} readonly={readonly}></SetRow>
      })}
    </div>
    {readonly ? undefined : <div className="flex flex-row gap-x-2">
      <Button className="flex-1" onClick={appendSet}>+ Append Set</Button>
    </div>}
  </div>
}