import { Button } from '@nextui-org/react';
import { useEffect, useMemo, useState } from 'react';
import SetRow from './SetRow';
import { useCreateSet, useDeleteSet, useLazyGetSetListByExerciseId, useUpdateSet } from '../../service/GqlStore/Set';

export interface ExerciseDataDisplayProps {
  exerciseData: ExerciseData
  hasDoneLastSet?: () => void
  readonly?: boolean
}

export default function ExerciseDataDisplay({
  exerciseData,
  hasDoneLastSet,
  readonly
}: ExerciseDataDisplayProps) {
  const [exerciseDataId, setExerciseDataId] = useState<number>(0)
  const [getSetByExerciseId, { data: setDatas }] = useLazyGetSetListByExerciseId()
  const [createSet] = useCreateSet()
  const [updateSet] = useUpdateSet()
  const [deleteSet] = useDeleteSet()
  useEffect(() => {
    if (exerciseData.id === exerciseDataId) return
    setExerciseDataId(exerciseData.id)
    getSetByExerciseId({ variables: { id: exerciseData.id } })
  }, [exerciseData, getSetByExerciseId])

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
      getSetByExerciseId({ variables: { id: exerciseData.id } })
    })
    // scheduleStore.appendSetByExerciseDataIdx(exerciseDataIdx)
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
              getSetByExerciseId({ variables: { id: exerciseData.id } })
            })
          }}
          hasDoneChange={(v) => { checkAllSetDone(set.id, v) }}
          readonly={readonly}
          onRemoveSet={(id) => {
            deleteSet({ variables: { id: id } }).then(() => {
              getSetByExerciseId({ variables: { id: exerciseData.id } })
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