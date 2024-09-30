import { Accordion, AccordionItem } from '@nextui-org/react';
import ExerciseDataDisplay from './ExerciseDataDisplay';
import { useEffect, useMemo, useState } from 'react';
import { getExerciseByIdx } from '../../service/Fitness/FitnessDatas';
import { useLazyGetExerciseListByScheduleId } from '../../service/GqlStore/Exercise';

export interface ExerciseDataListProps {
  schedule?: Schedule
  schedulePresetIdx?: number
  readonly?: boolean
}

type TempExerciseData = {
  name: string;
  sets: string[];
} & ExerciseData

export default function ExerciseDataList({
  schedule,
  // schedulePresetIdx,
  readonly
}: ExerciseDataListProps) {
  const [scheduleId, setScheduleId] = useState(-1)
  const [getExerciseSchedule, { data: exerciseDataBySchedule }] = useLazyGetExerciseListByScheduleId()
  // const [getSchedulePreset, {data: eerciseDataBySchedulePreset}] = useLazyGetExerciseListBySchedulePresetId()
  const [selectedKeys, changeSelectedKeys] = useState<'all' | number[]>([])
  useEffect(() => {
    if (scheduleId === schedule?.id) return
    setScheduleId(schedule?.id || 0)
    getExerciseSchedule({ variables: { scheduleId: schedule?.id || 0 } })
  }, [schedule?.id, getExerciseSchedule])
  const scheduleData = useMemo(() => {
    if (schedule) return {
      exerciseList: exerciseDataBySchedule?.getExerciseListByScheduleId || []
    }
    // if(schedulePresetIdx) return {
    //   exerciseList: exerciseDataBySchedulePreset?.getExerciseListBySchedulePresetId || []
    // }
    return { exerciseList: [] }
  }, [schedule, exerciseDataBySchedule])

  const exerciseList = useMemo(() => {
    if (!scheduleData) return [] as TempExerciseData[]
    return scheduleData.exerciseList.map(exerciseData => {
      const exercise = getExerciseByIdx(exerciseData.exercise)
      return {
        ...exerciseData,
        id: exerciseData.id,
        name: exercise.name
      }
    }).filter(Boolean) as TempExerciseData[]
  }, [scheduleData])

  function changeSelection(key: number) {
    if (selectedKeys[0] === key) {
      changeSelectedKeys([])
    } else {
      changeSelectedKeys([key])
    }
  }

  function gotoNextExercise(index: number) {
    if (exerciseList[index + 1]) {
      changeSelectedKeys([exerciseList[index + 1].id])
    }
  }

  return <Accordion selectionBehavior="replace" variant='splitted' selectedKeys={selectedKeys}>
    {exerciseList.map((exerciseData, index) => {
      return <AccordionItem
        key={`${exerciseData.id}`}
        title={exerciseData.name}
        classNames={{ heading: 'font-bold' }}
        onPress={() => changeSelection(exerciseData.id)}
      >
        <ExerciseDataDisplay exerciseData={exerciseData} hasDoneLastSet={() => gotoNextExercise(index)} readonly={readonly}></ExerciseDataDisplay>
      </AccordionItem>
    })}
  </Accordion>
}