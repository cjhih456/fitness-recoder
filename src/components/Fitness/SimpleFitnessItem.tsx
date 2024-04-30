import { useMemo } from 'react'
import { MdCheck } from 'react-icons/md'
import { getExerciseByIdx } from '../../service/Fitness/FitnessDatas'

interface SimpleFitnessItemProps {
  exercise: ExerciseData
}
export default function SimpleFitnessItem({ exercise }: SimpleFitnessItemProps) {
  const exerciseData = useMemo(() => {
    return getExerciseByIdx(exercise.exercise)
  }, [exercise])
  const progress = useMemo(() => {
    if (!exercise.sets.length) return undefined
    const doneCount = exercise.sets.filter(v => v.isDone)
    if (doneCount.length !== exercise.sets.length) {
      return <div>
        {doneCount.length}/{exercise.sets.length}
      </div>
    }
    return <div className="flex justify-center items-center w-[16px] h-[16px] rounded-full bg-primary text-white">
      <MdCheck size="0.75rem"></MdCheck>
    </div>
  }, [exercise])
  return <div className="flex justify-between items-center">
    <div>{exerciseData.name}</div>
    <div>{progress}</div>
  </div>
} 