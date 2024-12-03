import { useMemo } from 'react'
import { MdCheck } from 'react-icons/md'
import { useGetSetListByExerciseId } from '../../service/GqlStore/Set'
import { Exercise } from 'fitness-struct'
import { useGetFitnessById } from '../../service/GqlStore/Fitness'

export interface SimpleFitnessItemProps {
  exerciseData: Exercise.Data
}
export default function SimpleFitnessItem({ exerciseData }: SimpleFitnessItemProps) {
  // load Fitness data
  const fitnessData = useGetFitnessById(exerciseData?.exercise)
  const fitnessName = useMemo(() => {
    return fitnessData.data?.getFitnessById.name || ''
  }, [fitnessData])

  // load Set Data
  const { loading, data, called } = useGetSetListByExerciseId(exerciseData.id)
  const setData = useMemo(() => {
    return called && !loading ? data?.getSetListByExerciseId || [] : []
  }, [loading, data, called])
  // prev Set Render
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
      <div>{fitnessName}</div>
      <div>{progress}</div>
    </div> : <></>
} 