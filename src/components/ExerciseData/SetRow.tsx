import { useMemo } from 'react'
import useScheduleStore from '../../service/Store/ScheduleStoreHooks'
import { Button, Checkbox, Input } from '@nextui-org/react'
import { MdClear } from 'react-icons/md'

interface SetRowProps {
  setId: string
  index: number
}

export default function SetRow({ setId, index }: SetRowProps) {
  const scheduleStore = useScheduleStore()
  const set = useMemo(() => scheduleStore.getSetData(setId), [scheduleStore, setId])
  function changeRepeat(v: string) {
    scheduleStore.updateSetRepeat(setId, Number(v))
  }
  function changeWeight(v: string) {
    scheduleStore.updateSetWeight(setId, Number(v))
  }
  function changeIsDone(v: boolean) {
    scheduleStore.updateSetIsDone(setId, v)
  }

  return <div className="flex gap-x-2 items-center justify-center">
    <span className='min-w-12'>Set {index}</span>
    <Input value={String(set.repeat)} className="w-28" onValueChange={changeRepeat} ></Input>
    <Input value={String(set.weight)} className="w-28" onValueChange={changeWeight}></Input>
    <Checkbox classNames={{ wrapper: 'mr-0' }} isSelected={set.isDone} size='lg' onValueChange={changeIsDone} radius='full'></Checkbox>
    {/* change colors on click (bg: red, text: white) */}
    <Button isIconOnly variant='bordered' radius='full' className="text-default w-6 h-6 min-w-6">
      <MdClear size="1.5rem"></MdClear>
    </Button>
  </div>
}