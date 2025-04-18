import { Button } from '@heroui/react';
import { useCreateSet, useUpdateSet, useDeleteSet, useGetSetListByExerciseId } from '@features/set/api';
import { BooleanRender } from '@shared/ui/StateRender';
import SetRow from '../../../entities/set/ui/SetRow';
export interface SetListEditorProps {
  exerciseDataId: number
  hasDoneLastSet?: () => void
  readonly?: boolean
}

export default function SetListEditor({
  exerciseDataId,
  hasDoneLastSet,
  readonly = false
}: SetListEditorProps) {
  const { data } = useGetSetListByExerciseId(exerciseDataId)
  const sets = data.getSetListByExerciseId
  const [createSet] = useCreateSet()
  const [updateSet] = useUpdateSet()
  const [deleteSet] = useDeleteSet()

  function appendSet() {
    createSet({
      variables: {
        sets: {
          exerciseId: exerciseDataId,
          repeat: 10,
          isDone: false,
          weightUnit: 'kg',
          weight: 10
        }
      }
    })
  }

  function checkAllSetDone(id: number, isDone: boolean) {
    if (isDone && !sets.filter(v => !v.isDone).filter(v => v.id !== id).length) {
      hasDoneLastSet && hasDoneLastSet()
    }
  }

  return <div className="flex flex-col gap-y-4 pb-2">
    <div className="flex flex-col gap-y-2">
      {sets.map((set, index) => <SetRow
        key={set.id}
        index={index + 1}
        setId={set.id}
        hasSetChange={(setData) => {
          const data = { ...setData }
          delete data.__typename
          updateSet({ variables: { sets: data } })
        }}
        hasDoneChange={(v) => { checkAllSetDone(set.id, v) }}
        readonly={readonly}
        onRemoveSet={(id) => {
          deleteSet({ variables: { id: id } })
        }}
      ></SetRow>)}
    </div>
    <BooleanRender
      state={readonly}
      render={{
        false: () => <div className="flex flex-row gap-x-2">
          <Button className="flex-1" onPress={appendSet}>+ Append Set</Button>
        </div>
      }}
    />
  </div>
}