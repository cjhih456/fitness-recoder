import { create } from 'zustand'
import { ScheduleSetStoreType, useScheduleSetStore } from '../service/Store/ScheduleSetStore'
import { jest } from '@storybook/jest'

const useScheduleSetData = create<ScheduleSetStoreType & MockStoreActions<Sets>>((set, get) => ({
  store: {
    '00000000-0000-0001-0000-000000000000': {
      id: '00000000-0000-0001-0000-000000000000',
      isDone: true,
      repeat: 3,
      weightUnit: 'kg',
      weight: 10
    },
    '00000000-0000-0002-0000-000000000000': {
      id: '00000000-0000-0002-0000-000000000000',
      isDone: false,
      repeat: 3,
      weightUnit: 'kg',
      weight: 10
    },
    '00000000-0000-0003-0000-000000000000': {
      id: '00000000-0000-0003-0000-000000000000',
      isDone: true,
      repeat: 3,
      weightUnit: 'kg',
      weight: 10
    },
    '00000000-0000-0004-0000-000000000000': {
      id: '00000000-0000-0004-0000-000000000000',
      isDone: false,
      repeat: 3,
      weightUnit: 'kg',
      weight: 10
    }
  },
  setStore(id, obj) {
    set((state) => ({
      ...state,
      store: {
        ...state.store,
        [id]: obj
      }
    }), true)
  },
  getData(id) {
    return get().store[id]
  },
  deleteData(id) {
    set((state) => {
      const store = Object.assign({}, state.store)
      delete store[id]
      return {
        ...state,
        store: store
      }
    })
  }
}))

export default function ScheduleSetDataMockVer() {
  const scheduleSetStore = useScheduleSetStore()
  const scheduleSetData = useScheduleSetData()
  jest.spyOn(scheduleSetStore, 'createSet').mockImplementation(() => {
    const number = Object.keys(scheduleSetData.store).length + 1
    const id = `00000000-0000-${String(number).padStart(4, '0')}-0000-000000000000`
    scheduleSetData.setStore(id, {
      id,
      isDone: false,
      repeat: 10,
      weightUnit: 'kg',
      weight: 0,
      duration: 0
    })
    return id
  })
  jest.spyOn(scheduleSetStore, 'baseFunction').mockImplementation((id, fn) => {
    if (!scheduleSetData.getData(id)) return
    const schedule = Object.assign({}, scheduleSetData.getData(id))
    fn(schedule)
    scheduleSetData.setStore(id, schedule)
  })

  jest.spyOn(scheduleSetStore, 'getSet').mockImplementation((id) => {
    return scheduleSetData.getData(id)
  })
  jest.spyOn(scheduleSetStore, 'getSetList').mockImplementation((ids) => {
    return ids.map(id => scheduleSetData.getData(id))
  })
}