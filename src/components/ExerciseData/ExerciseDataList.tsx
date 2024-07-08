import { Accordion, AccordionItem } from '@nextui-org/react';
import ExerciseDataDisplay from './ExerciseDataDisplay';
import useScheduleStore from '../../service/Store/ScheduleStoreHooks';
import { useMemo, useState } from 'react';
import { getExerciseByIdx } from '../../service/Fitness/FitnessDatas';
import { useSchedulePresetStore } from '../../service/Store/SchedulePresetStore';

export interface ExerciseDataListProps {
  scheduleIdx?: string
  schedulePresetIdx?: string
  readonly?: boolean
}

interface TempExerciseData {
  idx: string;
  name: string;
  exercise: number;
  sets: string[];
}

export default function ExerciseDataList({
  scheduleIdx,
  schedulePresetIdx,
  readonly
}: ExerciseDataListProps) {
  const scheduleStore = useScheduleStore()
  const schedulePresetStore = useSchedulePresetStore()
  const [selectedKeys, changeSelectedKeys] = useState<'all' | string[]>([])
  const scheduleData = useMemo(() => {
    if (scheduleIdx) return scheduleStore.getSchedule(scheduleIdx)
    if (schedulePresetIdx) return schedulePresetStore.getSchedulePreset(schedulePresetIdx)
    return { exerciseList: [] }
  }, [scheduleStore, schedulePresetStore, scheduleIdx, schedulePresetIdx])
  const exerciseList = useMemo(() => {
    if (!scheduleData) return [] as TempExerciseData[]
    return scheduleData.exerciseList.map(exerciseIdx => {
      const exerciseData = scheduleStore.getExerciseData(exerciseIdx)
      if (!exerciseData) return undefined
      const exercise = getExerciseByIdx(exerciseData.exercise)
      return {
        ...exerciseData,
        idx: exerciseIdx,
        name: exercise.name
      }
    }).filter(Boolean) as TempExerciseData[]
  }, [scheduleStore, scheduleData])

  function changeSelection(key: string) {
    if (selectedKeys[0] === key) {
      changeSelectedKeys([])
    } else {
      changeSelectedKeys([key])
    }
  }

  function gotoNextExercise(index: number) {
    if (exerciseList[index + 1]) {
      changeSelectedKeys([exerciseList[index + 1].idx])
    }
  }

  return <Accordion selectionBehavior="replace" variant='splitted' selectedKeys={selectedKeys}>
    {exerciseList.map((exerciseData, index) => {
      return <AccordionItem
        key={`${exerciseData.idx}`}
        title={exerciseData.name}
        classNames={{ heading: 'font-bold' }}
        onPress={() => changeSelection(exerciseData.idx)}
      >
        <ExerciseDataDisplay exerciseDataIdx={exerciseData.idx} hasDoneLastSet={() => gotoNextExercise(index)} readonly={readonly}></ExerciseDataDisplay>
      </AccordionItem>
    })}
  </Accordion>
}