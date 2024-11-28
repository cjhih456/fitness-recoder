import ExerciseDataDisplay from './ExerciseDataDisplay';
import { useEffect, useMemo, useState } from 'react';
import { useLazyGetExerciseListByScheduleId } from '../../service/GqlStore/Exercise';
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
  const [scheduleId, setScheduleId] = useState(-1)
  const [getExerciseSchedule, { data: exerciseDataBySchedule }] = useLazyGetExerciseListByScheduleId()
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

  const [focusExercise, changeFocus] = useState(0)


  const exerciseListDisplay = useMemo(() => {
    return exerciseList.map((exerciseData) => {
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
  }, [exerciseList, readonly, focusExercise])

  return <div className="flex flex-col gap-y-3">
    {exerciseListDisplay}
  </div>
}