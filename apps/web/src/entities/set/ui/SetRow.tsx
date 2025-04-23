import type { SetsStoreType } from '../model'
import { Button, Checkbox, Input } from '@heroui/react'
import { useForm } from 'react-hook-form'
import { MdClear } from 'react-icons/md'
import useSetFragment from '@entities/set/api/useSetFragment'
import { BooleanRender } from '@shared/ui/StateRender'

export interface SetRowProps {
  setId: number
  index: number
  hasSetChange?: (_set: SetsStoreType) => void
  hasDoneChange?: (_isDone: boolean) => void
  onRemoveSet?: (_id: number) => void
  readonly?: boolean
}

export default function SetRow({ setId, index, hasDoneChange, hasSetChange, onRemoveSet, readonly = false }: SetRowProps) {
  const set = useSetFragment(setId)
  const { register, handleSubmit } = useForm({
    values: set,
    mode: 'onBlur'
  })

  function saveChange(data: SetsStoreType) {
    if (readonly) return
    hasSetChange && hasSetChange(data)
    if (data.isDone !== set.isDone) {
      hasDoneChange && hasDoneChange(data.isDone)
    }
  }

  function removeSet() {
    onRemoveSet && onRemoveSet(set.id)
  }

  return <form onBlur={handleSubmit(saveChange)} className="flex gap-x-2 items-center justify-center">
    <span className='min-w-12'>Set {index}</span>
    <Input {...register('repeat', {
      disabled: readonly,
      valueAsNumber: true
    })} isReadOnly={readonly} className="w-28" type='number'></Input>
    <Input {...register('weight', {
      disabled: readonly,
      valueAsNumber: true
    })} isReadOnly={readonly} className="w-28" type='number'></Input>
    <Checkbox {...register('isDone', {
      disabled: readonly
    })} isReadOnly={readonly} classNames={{ wrapper: 'mr-0' }} size='lg' radius='full'></Checkbox>
    <BooleanRender
      state={readonly}
      render={{
        false: () => <Button isIconOnly variant='bordered' radius='full' className="text-default w-6 h-6 min-w-6" onPress={removeSet}>
          <MdClear size="1.5rem"></MdClear>
        </Button>
      }}
    />
  </form>
}