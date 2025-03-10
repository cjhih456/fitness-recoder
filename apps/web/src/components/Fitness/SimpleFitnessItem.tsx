import type { Exercise } from 'fitness-struct'
import { useMemo } from 'react'
import { MdCheck } from 'react-icons/md'
import { useFitnessSimpleFragment } from '@hooks/apollo/Fitness'
import { useGetSetListByExerciseId } from '@hooks/apollo/Set'
import StateRender from '@utils/StateRender'

export interface SimpleFitnessItemProps {
  exerciseData: Exercise.Data
}
export default function SimpleFitnessItem({ exerciseData }: SimpleFitnessItemProps) {
  const [fitnessData] = useFitnessSimpleFragment(exerciseData?.exercise)

  const fitnessName = useMemo(() => {
    return fitnessData.name
  }, [fitnessData])

  // load Set Data
  const { loading, data, called } = useGetSetListByExerciseId(exerciseData.id)
  const setData = useMemo(() => {
    return called && !loading ? data?.getSetListByExerciseId || [] : []
  }, [loading, data, called])

  const doneCount = setData.filter(v => v.isDone).length

  return <div className="flex justify-between items-center">
    <div>{fitnessName}</div>
    <div>
      <StateRender.Boolean
        state={doneCount === setData.length}
        render={{
          true: <div className="flex justify-center items-center w-[16px] h-[16px] rounded-full bg-primary text-white">
            <MdCheck size="0.75rem"></MdCheck>
          </div>,
          false: <div> {doneCount}/{setData.length} </div>
        }}
      />
    </div>
  </div>
} 