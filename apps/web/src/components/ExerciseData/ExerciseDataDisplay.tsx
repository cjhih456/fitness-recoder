import { Button } from '@nextui-org/react';
import { useMemo } from 'react';
import SetRow from './SetRow';
import { useCreateSet, useDeleteSet, useGetSetListByExerciseId, useUpdateSet } from '../../service/GqlStore/Set';
import { Exercise } from 'fitness-struct';

export interface ExerciseDataDisplayProps {
  exerciseData: Exercise.Data
  hasDoneLastSet?: () => void
  readonly?: boolean
}

export default function ExerciseDataDisplay({
  exerciseData,
  hasDoneLastSet,
  readonly
}: ExerciseDataDisplayProps) {
  const { data: setDatas, refetch: getSetByExerciseId } = useGetSetListByExerciseId(exerciseData.id)
  const [createSet] = useCreateSet()
  const [updateSet] = useUpdateSet()
  const [deleteSet] = useDeleteSet()

  const setData = useMemo(() => {
    return setDatas?.getSetListByExerciseId || []
  }, [setDatas])

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
    if (isDone && (!setData.filter(v => !v.isDone).filter(v => v.id !== id).length)) {
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
            // @ts-ignore
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
    {readonly ? undefined : <div className="flex flex-row gap-x-2">
      <Button className="flex-1" onClick={appendSet}>+ Append Set</Button>
    </div>}
  </div>
}