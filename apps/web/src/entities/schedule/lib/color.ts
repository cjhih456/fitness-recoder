import type { Schedule } from 'fitness-struct'
import { ScheduleType } from '@entities/schedule/model/ScheduleType'

export const colorByScheduleType = (isSelected: boolean, type: Schedule.IType[]) => {
  if (isSelected) return 'bg-primary'
  if (type && type.length) {
    switch (type[0]) {
      case ScheduleType.BREAK:
        return 'bg-warning-500 text-default'
      case ScheduleType.FINISH:
        return 'bg-success-300'
      case ScheduleType.SCHEDULED:
        return 'bg-default'
      case ScheduleType.STARTED:
        return 'bg-success-700 text-success-100'
      case ScheduleType.PAUSED:
        return 'bg-blue-100 text-default'
    }
  }
  return 'text-default-500'
}