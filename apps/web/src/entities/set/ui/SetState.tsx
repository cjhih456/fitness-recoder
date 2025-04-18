import type { FC } from 'react';
import { MdCheck } from 'react-icons/md';
import { EnumRender } from '@shared/ui/StateRender';
import { useGetSetListByExerciseId } from '../api';

interface SetStateProps {
  exerciseDataId: number
}

type SetStateType = 'done' | 'notDone' | 'notStarted'
const SetState: FC<SetStateProps> = ({
  exerciseDataId
}) => {
  const { data } = useGetSetListByExerciseId(exerciseDataId)
  const sets = data.getSetListByExerciseId
  let state: SetStateType = 'notDone'
  const doneCount = sets.filter(v => v.isDone).length
  if (sets.length === 0) state = 'notStarted'
  else if (doneCount === sets.length) state = 'done'

  return <EnumRender
    state={state}
    render={{
      done: () => <div className="flex justify-center items-center w-[16px] h-[16px] rounded-full bg-primary text-white">
        <MdCheck size="0.75rem"></MdCheck>
      </div>,
      notDone: () => <div> {doneCount}/{sets.length} </div>,
      notStarted: () => <></>
    }}
  />
}
export default SetState
