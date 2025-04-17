import { MdCheck } from 'react-icons/md';
import { useGetSetListByExerciseId } from '@entities/set/api';
import { EnumRender } from '@shared/ui/StateRender';

interface SetStateProps {
  exerciseDataId: number
}

type SetStateType = 'done' | 'notDone' | 'notStarted'

export default function SetState({
  exerciseDataId
}: SetStateProps) {
  const { data } = useGetSetListByExerciseId(exerciseDataId)

  let state: SetStateType = 'notDone'
  const doneCount = data.getSetListByExerciseId.filter(v => v.isDone).length
  if (data.getSetListByExerciseId.length === 0) state = 'notStarted'
  else if (doneCount === data.getSetListByExerciseId.length) state = 'done'

  return <EnumRender
    state={state}
    render={{
      done: () => <div className="flex justify-center items-center w-[16px] h-[16px] rounded-full bg-primary text-white">
        <MdCheck size="0.75rem"></MdCheck>
      </div>,
      notDone: () => <div> {doneCount}/{data.getSetListByExerciseId.length} </div>,
      notStarted: () => <></>
    }}
  />
}