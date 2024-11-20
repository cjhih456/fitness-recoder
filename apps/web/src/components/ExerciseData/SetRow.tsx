import { useEffect, useState } from 'react'
import { Button, Checkbox, Input } from '@nextui-org/react'
import { MdClear } from 'react-icons/md'
import { useDebounce } from '../../hooks/useDebounce'
import { Sets } from 'fitness-struct'
export interface SetRowProps {
  set: Sets.Sets
  index: number
  hasSetChange?: (set: Sets.Sets) => void
  hasDoneChange?: (isDone: boolean) => void
  onRemoveSet?: (id: number) => void
  readonly?: boolean
}

export default function SetRow({ set, index, hasDoneChange, hasSetChange, onRemoveSet, readonly }: SetRowProps) {
  const [lazyValue, setLazyValue] = useState<Sets.Sets>({
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
  }, [debouncedLazyValue])
  useEffect(() => {
    if (JSON.stringify(set) !== JSON.stringify(lazyValue)) {
      setLazyValue(Object.assign({}, set))
    }
  }, [set])

  function changeRepeat(v: string) {
    setLazyValue((before) => {
      const temp = { ...before }
      temp.repeat = Number(v)
      return temp
    })
  }
  function changeWeight(v: string) {
    setLazyValue((before) => {
      const temp = { ...before }
      temp.weight = Number(v)
      return temp
    })
  }
  function changeIsDone(v: boolean) {
    setLazyValue((before) => {
      const temp = { ...before }
      temp.isDone = v
      return temp
    })
  }
  function removeSet() {
    onRemoveSet && onRemoveSet(set.id)
  }

  return set ? <div className="flex gap-x-2 items-center justify-center">
    <span className='min-w-12'>Set {index}</span>
    <Input value={String(lazyValue?.repeat)} className="w-28" onValueChange={changeRepeat} isReadOnly={readonly}></Input>
    <Input value={String(lazyValue?.weight)} className="w-28" onValueChange={changeWeight} isReadOnly={readonly}></Input>
    <Checkbox classNames={{ wrapper: 'mr-0' }} isSelected={lazyValue?.isDone} size='lg' onValueChange={changeIsDone} isReadOnly={readonly} radius='full'></Checkbox>
    {readonly ? undefined : <Button isIconOnly variant='bordered' radius='full' className="text-default w-6 h-6 min-w-6" onClick={removeSet}>
      <MdClear size="1.5rem"></MdClear>
    </Button>}
  </div> : <></>
}