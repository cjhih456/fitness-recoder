import type { Exercise } from 'fitness-struct';
import { Button } from '@heroui/react';
import { useCreateSet, useDeleteSet, useGetSetListByExerciseId, useUpdateSet } from '@hooks/apollo/Set';
import StateRender from '@utils/StateRender';
import SetRow from '../Sets/SetRow';

export interface ExerciseDataDisplayProps {
  exerciseData: Exercise.Data
  hasDoneLastSet?: () => void
  readonly?: boolean
}

export default function ExerciseDataDisplay({
  exerciseData,
  hasDoneLastSet,
  readonly = false
}: ExerciseDataDisplayProps) {
  const { data: setDatas, refetch: getSetByExerciseId } = useGetSetListByExerciseId(exerciseData.id)
  const [createSet] = useCreateSet()
  const [updateSet] = useUpdateSet()
  const [deleteSet] = useDeleteSet()

  const setData = setDatas.getSetListByExerciseId

  function appendSet() {
    createSet({
      variables: {
        sets: {
          exerciseId: exerciseData.id,
          repeat: 10,
          isDone: false,
          weightUnit: 'kg',
          weight: 10
        }
      }
    }).then(() => {
      getSetByExerciseId({ id: exerciseData.id })
    })
  }

  function checkAllSetDone(id: number, isDone: boolean) {
    if (isDone && !setData.filter(v => !v.isDone).filter(v => v.id !== id).length) {
      hasDoneLastSet && hasDoneLastSet()
    }
  }

  return <div className="flex flex-col gap-y-4 pb-2">
    <div className="flex flex-col gap-y-2">
      {setData.map((set, index) => {
        return <SetRow
          key={set.id}
          index={index + 1}
          set={set}
          hasSetChange={(setData) => {
            const data = { ...setData }
            delete data.__typename
            updateSet({ variables: { sets: data } }).then(() => {
              getSetByExerciseId({ id: exerciseData.id })
            })
          }}
          hasDoneChange={(v) => { checkAllSetDone(set.id, v) }}
          readonly={readonly}
          onRemoveSet={(id) => {
            deleteSet({ variables: { id: id } }).then(() => {
              getSetByExerciseId({ id: exerciseData.id })
            })
          }}
        ></SetRow>
      })}
    </div>
    <StateRender.Boolean
      state={readonly}
      render={{
        false: <div className="flex flex-row gap-x-2">
          <Button className="flex-1" onPress={appendSet}>+ Append Set</Button>
        </div>
      }}
    />
  </div>
}