import { MdCheck } from 'react-icons/md';
import { useGetSetListByExerciseId } from '@hooks/apollo/Set';
import StateRender from '@shared/ui/StateRender';

interface SetStateProps {
  exerciseDataId: number
}

export default function SetState({
  exerciseDataId
}: SetStateProps) {
  const { data } = useGetSetListByExerciseId(exerciseDataId)

  const doneCount = data.getSetListByExerciseId.filter(v => v.isDone).length

  return <StateRender.Boolean
    state={Boolean(data.getSetListByExerciseId.length) && doneCount === data.getSetListByExerciseId.length}
    render={{
      true: () => <div className="flex justify-center items-center w-[16px] h-[16px] rounded-full bg-primary text-white">
        <MdCheck size="0.75rem"></MdCheck>
      </div>,
      false: () => <div> {doneCount}/{data.getSetListByExerciseId.length} </div>
    }}
  />
}