import { useMemo } from 'react'
import { MdCheck } from 'react-icons/md'
import { getExerciseByIdx } from '../../service/Fitness/FitnessDatas'
import useScheduleStore from '../../service/Store/ScheduleStoreHooks'

interface SimpleFitnessItemProps {
  exerciseDataIdx: string
}
export default function SimpleFitnessItem({ exerciseDataIdx }: SimpleFitnessItemProps) {
  const scheduleStore = useScheduleStore()
  const exerciseData = useMemo(() => {
    return scheduleStore.getExerciseData(exerciseDataIdx)
  }, [exerciseDataIdx])
  const exerciseDisplay = useMemo(() => {
    return getExerciseByIdx(exerciseData.exercise)
  }, [exerciseData])
  const progress = useMemo(() => {
    if (!exerciseData.sets.length) return undefined
    const doneCount = exerciseData.sets.filter(v => v.isDone)
    if (doneCount.length !== exerciseData.sets.length) {
      return <div>
        {doneCount.length}/{exerciseData.sets.length}
      </div>
    }
    return <div className="flex justify-center items-center w-[16px] h-[16px] rounded-full bg-primary text-white">
      <MdCheck size="0.75rem"></MdCheck>
    </div>
  }, [exerciseData])
  return <div className="flex justify-between items-center">
    <div>{exerciseDisplay.name}</div>
    <div>{progress}</div>
  </div>
} 