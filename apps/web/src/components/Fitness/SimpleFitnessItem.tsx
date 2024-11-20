import { useMemo } from 'react'
import { MdCheck } from 'react-icons/md'
import { getExerciseByIdx } from '../../service/Fitness/FitnessDatas'
import { useGetSetListByExerciseId } from '../../service/GqlStore/Set'
import { Exercise } from 'fitness-struct'

export interface SimpleFitnessItemProps {
  exerciseData: Exercise.Data
}
export default function SimpleFitnessItem({ exerciseData }: SimpleFitnessItemProps) {
  const exerciseDisplay = useMemo(() => {
    return getExerciseByIdx(exerciseData?.exercise ?? -1)
  }, [exerciseData])
  const { loading, data, called } = useGetSetListByExerciseId(exerciseData.id)
  const setData = useMemo(() => {
    return called && !loading ? data?.getSetListByExerciseId || [] : []
  }, [loading, data])
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
      <div>{exerciseDisplay?.name}</div>
      <div>{progress}</div>
    </div> : <></>
} 