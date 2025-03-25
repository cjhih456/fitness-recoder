import type { BaseCalanderProps, Mode } from './Calander';
import { Button } from '@heroui/react';
import useCalanderHook from './hooks/useCalanderHook';

interface MonthCalanderHeadProps extends BaseCalanderProps {
  onChangeMode: (_v: Mode) => void
}

export default function MonthCalanderHead({
  value,
  startDate = '1900-1-1',
  endDate = '2100-12-31',
  onChange,
  onChangeMode
}: MonthCalanderHeadProps) {
  const [year, month, date] = value.split('-').map(v => +v)
  const { checkIsPossibleDate } = useCalanderHook({ startDate, endDate })

  const beforeYear = [year - 1, month, date].join('-')
  const nextYear = [year + 1, month, date].join('-')

  return <div key='month-top' className="flex gap-2 justify-center content-center">
    <Button isIconOnly radius='full' disabled={!checkIsPossibleDate(beforeYear)} onPress={() => onChange(beforeYear)}> - </Button>
    <Button className='font-bold' onPress={() => onChangeMode('year')}>{year}</Button>
    <Button isIconOnly radius='full' disabled={!checkIsPossibleDate(nextYear)} onPress={() => onChange(nextYear)}> + </Button>
  </div>
}