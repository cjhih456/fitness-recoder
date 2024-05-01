

import { useScheduleExerciseDataStore } from './ScheduleExerciseDataStore'
import { useScheduleInfoStore } from './ScheduleInfoStore'
import { useScheduleKeyStore } from './ScheduleKeyStore'
import { useScheduleSetStore } from './ScheduleSetStore'


export const enum ScheduleType {
  BREAK = 'BREAK',
  SCHEDULED = 'SCHEDULED',
  STARTED = 'STARTED',
  PAUSED = 'PAUSED',
  FINISH = 'FINISH',
}

export const calanderColor = (year: number, month: number, date: number, selectedYear: number, selectedMonth: number, selectedDate: number, scheduleList: ScheduleData[]) => {
  if (
    year === selectedYear &&
    month === selectedMonth &&
    date === selectedDate
  ) return 'bg-primary'
  if (scheduleList.length) {
    switch (scheduleList[0].type) {
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


const useScheduleStore = () => {
  const scheduleKeyStore = useScheduleKeyStore()
  const scheduleInfoStore = useScheduleInfoStore()
  const scheduleExerciseDataStore = useScheduleExerciseDataStore()
  const scheduleSetStore = useScheduleSetStore()
  const getScheduleByData = (year: number, month: number, date: number) => {
    const keyList = scheduleKeyStore.getRelationByDate(year, month, date)
    return keyList.map(v => scheduleInfoStore.getSchedule(v))
  }
  const getSchedule = (id: string) => {
    return scheduleInfoStore.getSchedule(id)
  }
  const createSchedule = (year: number, month: number, date: number) => {
    const id = scheduleInfoStore.createSchedule(year, month, date)
    scheduleKeyStore.addRelationByDate(year, month, date, id)
    return id
  }
  const setBreakDay = (year: number, month: number, date: number) => {
    const id = createSchedule(year, month, date)
    scheduleInfoStore.setBreakDay(id)
  }
  const addExerciseListByScheduleWithExerciseData = (scheduleIdx: string, exerciseIdxList: number[]) => {
    const scheduleInfo = scheduleInfoStore.getSchedule(scheduleIdx)
    const savedExerciseDataList = scheduleInfo.exerciseList.map(v => scheduleExerciseDataStore.getExerciseData(v))
    // TODO: calculate remove need & keep exercise list
    const removeNeedExerciseDataIdxList = [] as string[]
    const keepExerciseDataIdxList = [] as string[]
    savedExerciseDataList.forEach((v, i) => {
      if (!exerciseIdxList.includes(v.exercise)) {
        removeNeedExerciseDataIdxList.push(scheduleInfo.exerciseList[i])
      } else {
        keepExerciseDataIdxList.push(scheduleInfo.exerciseList[i])
      }
    })

    // TODO: make new exerciseData 
    const savedExerciseList = savedExerciseDataList.map(v => v.exercise)
    const newExerciseList = [] as string[]
    exerciseIdxList.forEach((v) => {
      if (!savedExerciseList.includes(v)) {
        newExerciseList.push(scheduleExerciseDataStore.createExerciseData(v))
      }
    })

    // TODO: make new exercise list & remove exerciseData
    scheduleInfoStore.addExercise(scheduleIdx, ([] as string[]).concat(keepExerciseDataIdxList, newExerciseList))
    removeNeedExerciseDataIdxList.forEach(v => scheduleExerciseDataStore.removeExerciseData(v))
  }

  const deleteExerciseDataBySchedule = (scheduleIdx: string, exerciseDataIdxList: string[]) => {
    const scheduleInfo = scheduleInfoStore.getSchedule(scheduleIdx)
    const tempArray = scheduleInfo.exerciseList.filter(v => !exerciseDataIdxList.includes(v))
    scheduleInfoStore.addExercise(scheduleIdx, tempArray)
    exerciseDataIdxList.forEach(v => scheduleExerciseDataStore.removeExerciseData(v))
  }
  // const createSet = (scheduleId, exerciseIdx) => {
  //   const id = scheduleSetStore.createSet()
  //   scheduleInfoStore.getSchedule(scheduleId)
  // }
  return {
    getScheduleByData,
    getSchedule,
    createSchedule,
    setBreakDay,
    addExerciseListByScheduleWithExerciseData,
    deleteExerciseDataBySchedule,

    getRelationByDate: scheduleKeyStore.getRelationByDate,
    updateScheduleTimer: scheduleInfoStore.updateTimer,
    startSchedule: scheduleInfoStore.startSchedule,
    pauseSchedule: scheduleInfoStore.pauseSchedule,
    successSchedule: scheduleInfoStore.successSchedule,

    // ExerciseData methods
    createExerciseData: scheduleExerciseDataStore.createExerciseData,
    getExerciseData: scheduleExerciseDataStore.getExerciseData,
    // sets methods
    updateSetWeight: scheduleSetStore.updateSetWeight,
    updateSetWeightUnit: scheduleSetStore.updateSetWeightUnit,
    updateSetIsDone: scheduleSetStore.updateSetIsDone,
    updateSetRepeat: scheduleSetStore.updateSetRepeat,
    updateSetDuration: scheduleSetStore.updateSetDuration
  }
}

export default useScheduleStore