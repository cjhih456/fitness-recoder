import { enumify } from '@shared/lib/utils';

export const ScheduleType = enumify({
  BREAK: 'BREAK',
  SCHEDULED: 'SCHEDULED',
  STARTED: 'STARTED',
  PAUSED: 'PAUSED',
  FINISH: 'FINISH',
})