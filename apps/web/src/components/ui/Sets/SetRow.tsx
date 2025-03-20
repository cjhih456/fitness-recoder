import { Button, Checkbox, Input } from '@heroui/react'
import { useEffect, useState } from 'react'
import { MdClear } from 'react-icons/md'
import { useDebounce } from '@hooks/useDebounce'
import StateRender from '@utils/StateRender'
export interface SetRowProps {
  set: SetsStoreType
  index: number
  hasSetChange?: (_set: SetsStoreType) => void
  hasDoneChange?: (_isDone: boolean) => void
  onRemoveSet?: (_id: number) => void
  readonly?: boolean
}

export default function SetRow({ set, index, hasDoneChange, hasSetChange, onRemoveSet, readonly = false }: SetRowProps) {
  const [lazyValue, setLazyValue] = useState<SetsStoreType>({
    weight: 0,
    isDone: false,
    repeat: 0,
    exerciseId: 0,
    id: 0,
    weightUnit: 'kg'
  })
  const debouncedLazyValue = useDebounce(lazyValue, 200)
  useEffect(() => {
    if (JSON.stringify(set) !== JSON.stringify(debouncedLazyValue)) {
      if (debouncedLazyValue.id) {
        hasSetChange && hasSetChange(debouncedLazyValue)
        if (set.isDone !== debouncedLazyValue.isDone) {
          hasDoneChange && hasDoneChange(debouncedLazyValue.isDone)
        }
      }
    }
  }, [debouncedLazyValue, set, hasDoneChange, hasSetChange])
  useEffect(() => {
    if (JSON.stringify(set) !== JSON.stringify(lazyValue)) {
      setLazyValue(Object.assign({}, set))
    }
  }, [set, lazyValue])

  function changeRepeat(v: string) {
    setLazyValue((before) => ({
      ...before,
      repeat: Number(v)
    }))
  }
  function changeWeight(v: string) {
    setLazyValue((before) => ({
      ...before,
      weight: Number(v)
    }))
  }
  function changeIsDone(v: boolean) {
    setLazyValue((before) => ({
      ...before,
      isDone: v
    }))
  }
  function removeSet() {
    onRemoveSet && onRemoveSet(set.id)
  }

  return <div className="flex gap-x-2 items-center justify-center">
    <span className='min-w-12'>Set {index}</span>
    <Input value={String(lazyValue?.repeat)} className="w-28" onValueChange={changeRepeat} isReadOnly={readonly}></Input>
    <Input value={String(lazyValue?.weight)} className="w-28" onValueChange={changeWeight} isReadOnly={readonly}></Input>
    <Checkbox classNames={{ wrapper: 'mr-0' }} isSelected={lazyValue?.isDone} size='lg' onValueChange={changeIsDone} isReadOnly={readonly} radius='full'></Checkbox>
    <StateRender.Boolean
      state={readonly}
      render={{
        false: <Button isIconOnly variant='bordered' radius='full' className="text-default w-6 h-6 min-w-6" onClick={removeSet}>
          <MdClear size="1.5rem"></MdClear>
        </Button>
      }}
    />
  </div>
}