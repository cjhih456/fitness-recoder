import { useScheduleSetStore } from '../service/Store/ScheduleSetStore'
import { jest } from '@storybook/jest'

const scheduleSetData = {
  '00000000-0000-0000-0000-000000000001': {
    id: '00000000-0000-0000-0000-000000000001',
    isDone: true,
    repeat: 3,
    weightUnit: 'kg',
    weight: 10
  },
  '00000000-0000-0000-0000-000000000002': {
    id: '00000000-0000-0000-0000-000000000002',
    isDone: false,
    repeat: 3,
    weightUnit: 'kg',
    weight: 10
  },
  '00000000-0000-0000-0000-000000000003': {
    id: '00000000-0000-0000-0000-000000000003',
    isDone: true,
    repeat: 3,
    weightUnit: 'kg',
    weight: 10
  },
  '00000000-0000-0000-0000-000000000004': {
    id: '00000000-0000-0000-0000-000000000004',
    isDone: false,
    repeat: 3,
    weightUnit: 'kg',
    weight: 10
  }
} as { [id: string]: Sets }

export default function ScheduleSetDataMockVer() {
  const scheduleSetStore = useScheduleSetStore()
  jest.spyOn(scheduleSetStore, 'getSet').mockImplementation((id) => {
    return scheduleSetData[id]
  })
  jest.spyOn(scheduleSetStore, 'getSetList').mockImplementation((ids) => {
    return ids.map(id => scheduleSetData[id])
  })
}