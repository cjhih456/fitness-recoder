import { Button } from '@heroui/react';
import { useCreateSet, useDeleteSet, useGetSetListByExerciseId, useUpdateSet } from '@entities/set/api';
import StateRender from '@shared/ui/StateRender';
import SetRow from './SetRow';

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
  const { data, refetch } = useGetSetListByExerciseId(exerciseDataId)
  const setsList = data.getSetListByExerciseId
  const [createSet] = useCreateSet()
  const [updateSet] = useUpdateSet()
  const [deleteSet] = useDeleteSet()

  function reloadSetList() {
    refetch()
  }

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
    }).then(reloadSetList)
  }

  function checkAllSetDone(id: number, isDone: boolean) {
    if (isDone && !setsList.filter(v => !v.isDone).filter(v => v.id !== id).length) {
      hasDoneLastSet && hasDoneLastSet()
    }
  }

  return <div className="flex flex-col gap-y-4 pb-2">
    <div className="flex flex-col gap-y-2">
      {setsList.map((set, index) => <SetRow
        key={set.id}
        index={index + 1}
        set={set}
        hasSetChange={(setData) => {
          const data = { ...setData }
          delete data.__typename
          updateSet({ variables: { sets: data } })
        }}
        hasDoneChange={(v) => { checkAllSetDone(set.id, v) }}
        readonly={readonly}
        onRemoveSet={(id) => {
          deleteSet({ variables: { id: id } }).then(reloadSetList)
        }}
      ></SetRow>)}
    </div>
    <StateRender.Boolean
      state={readonly}
      render={{
        false: () => <div className="flex flex-row gap-x-2">
          <Button className="flex-1" onPress={appendSet}>+ Append Set</Button>
        </div>
      }}
    />
  </div>
}