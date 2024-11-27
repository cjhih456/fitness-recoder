import { Accordion, AccordionItem } from '@nextui-org/react';
import ExerciseDataDisplay from './ExerciseDataDisplay';
import { useEffect, useMemo, useState } from 'react';
import { useLazyGetExerciseListByScheduleId } from '../../service/GqlStore/Exercise';
import { Exercise, Schedule } from 'fitness-struct';
import { useGetFitnessListByIds } from '../../service/GqlStore/Fitness';

export interface ExerciseDataListProps {
  schedule?: Schedule.Schedule
  schedulePresetIdx?: number
  readonly?: boolean
}

type TempExerciseData = {
  name: string;
  sets: string[];
} & Exercise.Data

export default function ExerciseDataList({
  schedule,
  readonly
}: ExerciseDataListProps) {
  const [scheduleId, setScheduleId] = useState(-1)
  const [getExerciseSchedule, { data: exerciseDataBySchedule }] = useLazyGetExerciseListByScheduleId()
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
    return { exerciseList: [] }
  }, [schedule, exerciseDataBySchedule])

  const fitnessIdList = useMemo(() => {
    return scheduleData.exerciseList.map(v => v.exercise) || []
  }, [scheduleData])
  const fitnessListOrigin = useGetFitnessListByIds(fitnessIdList)
  const fitnessList = useMemo(() => {
    return fitnessListOrigin.data?.getFitnessListByIds || []
  }, [fitnessListOrigin])

  const exerciseList = useMemo(() => {
    if (!scheduleData) return [] as TempExerciseData[]
    return scheduleData.exerciseList.map(exerciseData => {
      const exercise = fitnessList.find(v => v.id === exerciseData.exercise) || { name: '' }
      return {
        ...exerciseData,
        id: exerciseData.id,
        name: exercise.name
      }
    }).filter(Boolean) as TempExerciseData[]
  }, [scheduleData, fitnessList])

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

  const exerciseListDisplay = useMemo(() => {
    return exerciseList.map((exerciseData, index) => {
      return <AccordionItem
        key={`${exerciseData.id}`}
        title={exerciseData.name}
        classNames={{ heading: 'font-bold' }}
        onPress={() => changeSelection(exerciseData.id)}
      >
        <ExerciseDataDisplay exerciseData={exerciseData} hasDoneLastSet={() => gotoNextExercise(index)} readonly={readonly}></ExerciseDataDisplay>
      </AccordionItem>
    })
  }, [exerciseList, readonly])

  return <Accordion selectionBehavior="replace" variant='splitted' selectedKeys={selectedKeys}>
    {exerciseListDisplay}
  </Accordion>
}