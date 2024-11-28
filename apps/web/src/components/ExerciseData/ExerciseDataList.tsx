import ExerciseDataDisplay from './ExerciseDataDisplay';
import { useEffect, useMemo, useState } from 'react';
import { useGetExerciseListByScheduleId } from '../../service/GqlStore/Exercise';
import { Exercise, Schedule } from 'fitness-struct';
import { useGetFitnessListByIds } from '../../service/GqlStore/Fitness';
import MenuableAccordion from '../CustomComponent/MenuableAccordion';

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
  const [scheduleId, setScheduleId] = useState(0)
  useEffect(() => {
    if (scheduleId === schedule?.id) return
    const newScheduleId = schedule?.id || 0
    setScheduleId(newScheduleId)
  }, [schedule?.id, scheduleId, setScheduleId])

  const { data: getExerciseListByScheduleIdData } = useGetExerciseListByScheduleId(scheduleId)

  const scheduleData = useMemo(() => {
    return getExerciseListByScheduleIdData?.getExerciseListByScheduleId || []
  }, [getExerciseListByScheduleIdData])

  const fitnessIdList = useMemo(() => {
    return scheduleData.map(v => v.exercise) || []
  }, [scheduleData])
  const { data: getFitnessListByIdsData } = useGetFitnessListByIds(fitnessIdList)
  const fitnessList = useMemo(() => {
    return getFitnessListByIdsData?.getFitnessListByIds || []
  }, [getFitnessListByIdsData])

  const exerciseDataList = useMemo(() => {
    if (!scheduleData) return [] as TempExerciseData[]
    return scheduleData.map(exerciseData => {
      const exercise = fitnessList.find(v => v.id === exerciseData.exercise) || { name: '' }
      return {
        ...exerciseData,
        id: exerciseData.id,
        name: exercise.name
      }
    }).filter(Boolean) as TempExerciseData[]
  }, [scheduleData, fitnessList])

  const [focusExercise, changeFocus] = useState(0)

  const exerciseListDisplay = useMemo(() => {
    return exerciseDataList.map((exerciseData) => {
      return <MenuableAccordion
        key={`${exerciseData.id}`}
        isFocus={focusExercise === exerciseData.id}
        onFocusChange={(v) => {
          changeFocus(v ? exerciseData.id : 0)
        }}
      >
        {() => ({
          title: <div><h3 className='font-bold'>{exerciseData.name}</h3></div>,
          content: <ExerciseDataDisplay exerciseData={exerciseData} readonly={readonly}></ExerciseDataDisplay>
        })}

      </MenuableAccordion>
    })
  }, [exerciseDataList, readonly, focusExercise])

  return <div className="flex flex-col gap-y-3">
    {exerciseListDisplay}
  </div>
}