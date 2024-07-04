import { ScheduleStoreAction, ScheduleStoreState, useScheduleKeyStore } from '../service/Store/ScheduleKeyStore';
import { spyOn } from '@storybook/test'
import { create } from 'zustand';
import ScheduleInfoDataMockVer from './ScheduleInfoDataMockVer.data';

const useScheduleKey = create<ScheduleStoreState & ScheduleStoreAction>((set, get) => ({
  store: {
    '2024-1-1': ['00000001-0000-0000-0000-000000000000']
  },
  getRelationByDate: (year, month, date) => {
    return get().store[`${year}-${month}-${date}`] || []
  },
  addRelationByDate: (year, month, date, id) => {
    const before = get().getRelationByDate(year, month, date)
    if (before.includes(id)) return
    set((state) => ({
      ...state,
      store: {
        ...state.store,
        [`${year}-${month}-${date}`]: ([] as string[]).concat(before, id)
      }
    }), true)
  },
  removeRelationByDate: (year, month, date, id) => {
    const before = get().getRelationByDate(year, month, date)
    if (!before.includes(id)) return
    set((state) => ({
      ...state,
      store: {
        ...state.store,
        [`${year}-${month}-${date}`]: before.filter(v => v !== id)
      }
    }), true)
  }
}))



export default function ScheduleKeyMockVer() {
  const ScheduleKeyStore = useScheduleKeyStore()
  const ScheduleKey = useScheduleKey()
  spyOn(ScheduleKeyStore, 'getRelationByDate').mockImplementation(ScheduleKey.getRelationByDate)
  spyOn(ScheduleKeyStore, 'addRelationByDate').mockImplementation(ScheduleKey.addRelationByDate)
  spyOn(ScheduleKeyStore, 'removeRelationByDate').mockImplementation(ScheduleKey.removeRelationByDate)

  ScheduleInfoDataMockVer()

}