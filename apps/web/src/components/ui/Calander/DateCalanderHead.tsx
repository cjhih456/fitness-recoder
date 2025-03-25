import type { BaseCalanderProps, Mode } from './Calander';
import { Button } from '@heroui/react';
import { useMemo } from 'react';
import useCalanderHook from './hooks/useCalanderHook';

interface DateCalanderHeadProps extends BaseCalanderProps {
  onChangeMode: (_v: Mode) => void
}

export default function DateCalanderHead({
  value,
  onChange,
  onChangeMode,
  ...props
}: DateCalanderHeadProps) {
  const [year, month, date] = value.split('-').map(v => +v)
  const { checkIsPossibleDate } = useCalanderHook(props)

  const beforeMonth = useMemo(() => {
    if (month - 1 === 0) return [year - 1, 12, date].join('-')
    return [year, month - 1, date].join('-')
  }, [year, month, date])

  const nextMonth = useMemo(() => {
    if (month + 1 === 13) return [year + 1, 1, date].join('-')
    return [year, month + 1, date].join('-')
  }, [year, month, date])

  return <div key='date-top' className="flex gap-2 justify-center content-center">
    <Button isIconOnly radius='full' disabled={!checkIsPossibleDate(beforeMonth)} onPress={() => onChange(beforeMonth)}> - </Button>
    <Button className='font-bold' onPress={() => onChangeMode('month')}>
      {`${year} - ${String(month).padStart(2, '0')}`}
    </Button>
    <Button isIconOnly radius='full' disabled={!checkIsPossibleDate(nextMonth)} onPress={() => onChange(nextMonth)}> + </Button>
  </div>
}