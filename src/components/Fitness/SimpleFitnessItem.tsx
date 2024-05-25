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
  }, [exerciseDataIdx, scheduleStore])
  const exerciseDisplay = useMemo(() => {
    return getExerciseByIdx(exerciseData?.exercise || -1)
  }, [exerciseData])
  const setData = useMemo(() => {
    return exerciseData?.sets.map(v => scheduleStore.getSetData(v)).filter(Boolean) as Sets[]
  }, [exerciseData, scheduleStore])
  const progress = useMemo(() => {
    if (!setData.length) return undefined
    const doneCount = setData.filter(v => v.isDone)
    if (doneCount.length !== setData.length) {
      return <div>
        {doneCount.length}/{setData.length}
      </div>
    }
    return <div className="flex justify-center items-center w-[16px] h-[16px] rounded-full bg-primary text-white">
      <MdCheck size="0.75rem"></MdCheck>
    </div>
  }, [setData])
  return exerciseData ?
    <div className="flex justify-between items-center">
      <div>{exerciseDisplay.name}</div>
      <div>{progress}</div>
    </div> : <></>
} 