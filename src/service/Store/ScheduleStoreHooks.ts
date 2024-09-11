

import { useScheduleExerciseDataStore } from './ScheduleExerciseDataStore'
import { useScheduleInfoStore } from './ScheduleInfoStore'
import { useScheduleKeyStore } from './ScheduleKeyStore'
import { useSchedulePresetStore } from './SchedulePresetStore'
import { useScheduleSetStore } from './ScheduleSetStore'

const useScheduleStore = () => {
  const scheduleKeyStore = useScheduleKeyStore()
  const scheduleInfoStore = useScheduleInfoStore()
  const schedulePresetStore = useSchedulePresetStore()
  const scheduleExerciseDataStore = useScheduleExerciseDataStore()
  const scheduleSetStore = useScheduleSetStore()
  const getScheduleByData = (year: number, month: number, date: number) => {
    const keyList = scheduleKeyStore.getRelationByDate(year, month, date)
    return keyList.map(v => scheduleInfoStore.getSchedule(v)).filter(Boolean) as Schedule[]
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

  const saveExerciseList = (newExerciseList: number[], oldExerciseList: string[]) => {
    const removeNeedExerciseDataIdxList = [] as string[]
    const keepExerciseDataIdxList = [] as string[]

    const savedExerciseDataList = oldExerciseList.map(v => scheduleExerciseDataStore.getExerciseData(v)).filter(Boolean) as ExerciseData[]

    // TODO: calculate remove need & keep exercise list
    savedExerciseDataList.forEach((v, i) => {
      if (!newExerciseList.includes(v.exercise)) {
        removeNeedExerciseDataIdxList.push(oldExerciseList[i])
      } else {
        keepExerciseDataIdxList.push(oldExerciseList[i])
      }
    })

    // TODO: make new exerciseData 
    const savedExerciseList = savedExerciseDataList.map(v => v.exercise)
    const newGeneratedExerciseList = [] as string[]
    newExerciseList.forEach((v) => {
      if (!savedExerciseList.includes(v)) {
        newGeneratedExerciseList.push(scheduleExerciseDataStore.createExerciseData(v))
      }
    })

    // TODO: make new exercise list & remove exerciseData
    removeNeedExerciseDataIdxList.forEach(v => scheduleExerciseDataStore.removeExerciseData(v))
    return ([] as string[]).concat(keepExerciseDataIdxList, newGeneratedExerciseList)
  }

  const addExerciseListByScheduleWithExerciseData = (scheduleIdx: string, exerciseIdxList: number[]) => {
    const scheduleInfo = scheduleInfoStore.getSchedule(scheduleIdx)
    if (!scheduleInfo) return

    // TODO: save new 
    scheduleInfoStore.addExercise(scheduleIdx, saveExerciseList(exerciseIdxList, scheduleInfo.exerciseList))
  }
  const addExerciseListByPresetWithExerciseData = (presetId: string, exerciseIdxList: number[]) => {
    const scheduleInfo = schedulePresetStore.getSchedulePreset(presetId)
    if (!scheduleInfo) return

    // TODO: save new 
    schedulePresetStore.addExercise(presetId, saveExerciseList(exerciseIdxList, scheduleInfo.exerciseList))

  }

  const deleteExerciseDataBySchedule = (scheduleIdx: string, exerciseDataIdxList: string[]) => {
    const scheduleInfo = scheduleInfoStore.getSchedule(scheduleIdx)
    if (!scheduleInfo) return
    const tempArray = scheduleInfo.exerciseList.filter(v => !exerciseDataIdxList.includes(v))
    scheduleInfoStore.addExercise(scheduleIdx, tempArray)
    exerciseDataIdxList.forEach(v => scheduleExerciseDataStore.removeExerciseData(v))
  }

  const appendSetByExerciseDataIdx = (exerciseDataIdx: string) => {
    const setId = scheduleSetStore.createSet()
    scheduleExerciseDataStore.appendSetByExerciseDataIdx(exerciseDataIdx, setId)
  }

  return {
    getScheduleByData,
    getSchedule,
    createSchedule,
    setBreakDay,
    addExerciseListByScheduleWithExerciseData,
    deleteExerciseDataBySchedule,
    appendSetByExerciseDataIdx,

    getRelationByDate: scheduleKeyStore.getRelationByDate,
    updateScheduleTimer: scheduleInfoStore.updateTimer,
    startSchedule: scheduleInfoStore.startSchedule,
    pauseSchedule: scheduleInfoStore.pauseSchedule,
    successSchedule: scheduleInfoStore.successSchedule,

    // ExerciseData methods
    createExerciseData: scheduleExerciseDataStore.createExerciseData,
    getExerciseData: scheduleExerciseDataStore.getExerciseData,
    removeSetByExerciseDataIdx: scheduleExerciseDataStore.removeSetByExerciseDataIdx,

    // sets methods
    getSetData: scheduleSetStore.getSet,
    getSetListData: scheduleSetStore.getSetList,
    updateSetWeight: scheduleSetStore.updateSetWeight,
    updateSetWeightUnit: scheduleSetStore.updateSetWeightUnit,
    updateSetIsDone: scheduleSetStore.updateSetIsDone,
    updateSetRepeat: scheduleSetStore.updateSetRepeat,
    updateSetDuration: scheduleSetStore.updateSetDuration,

    // Preset methods
    addExerciseListByPresetWithExerciseData
  }
}

export default useScheduleStore