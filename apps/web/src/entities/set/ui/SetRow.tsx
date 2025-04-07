import { Button, Checkbox, Input } from '@heroui/react'
import { useEffect, useState } from 'react'
import { MdClear } from 'react-icons/md'
import StateRender from '@shared/ui/StateRender'
export interface SetRowProps {
  set: SetsStoreType
  index: number
  hasSetChange?: (_set: SetsStoreType) => void
  hasDoneChange?: (_isDone: boolean) => void
  onRemoveSet?: (_id: number) => void
  readonly?: boolean
}

export default function SetRow({ set, index, hasDoneChange, hasSetChange, onRemoveSet, readonly = false }: SetRowProps) {
  const [lazyValue, setLazyValue] = useState<SetsStoreType>(set)
  useEffect(() => {
    if (JSON.stringify(set) !== JSON.stringify(lazyValue)) {
      setLazyValue(Object.assign({}, set))
    }
  }, [set, lazyValue])

  function changeSetData(obj: Partial<SetsStoreType>) {
    const tempObj = { ...lazyValue, ...obj }
    setLazyValue(tempObj)
  }

  function saveChange() {
    hasSetChange && hasSetChange(lazyValue)
  }

  function changeRepeat(v: string) {
    const num = Number(v)
    if (isNaN(num)) return
    changeSetData({
      repeat: num
    })
  }
  function changeWeight(v: string) {
    const num = Number(v)
    if (isNaN(num)) return
    changeSetData({
      weight: num
    })
  }
  function changeIsDone(v: boolean) {
    changeSetData({
      isDone: v
    })
    hasDoneChange && hasDoneChange(v)
  }
  function removeSet() {
    onRemoveSet && onRemoveSet(set.id)
  }

  return <div className="flex gap-x-2 items-center justify-center">
    <span className='min-w-12'>Set {index}</span>
    <Input defaultValue={String(lazyValue?.repeat)} className="w-28" onValueChange={changeRepeat} onBlur={saveChange} isReadOnly={readonly}></Input>
    <Input defaultValue={String(lazyValue?.weight)} className="w-28" onValueChange={changeWeight} onBlur={saveChange} isReadOnly={readonly}></Input>
    <Checkbox defaultSelected={lazyValue?.isDone} classNames={{ wrapper: 'mr-0' }} size='lg' onValueChange={changeIsDone} onBlur={saveChange} isReadOnly={readonly} radius='full'></Checkbox>
    <StateRender.Boolean
      state={readonly}
      render={{
        false: () => <Button isIconOnly variant='bordered' radius='full' className="text-default w-6 h-6 min-w-6" onPress={removeSet}>
          <MdClear size="1.5rem"></MdClear>
        </Button>
      }}
    />
  </div>
}