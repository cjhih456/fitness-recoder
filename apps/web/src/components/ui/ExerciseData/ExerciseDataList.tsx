import type { Exercise, Schedule } from 'fitness-struct';
import { Suspense, useMemo, useState } from 'react';
import { useGetExerciseListByScheduleId } from '@hooks/apollo/Exercise';
import { useGetFitnessListByIds } from '@hooks/apollo/Fitness';
import MenuableAccordion from '@ui/CustomComponent/MenuableAccordion';
import ExerciseDataDisplay from './ExerciseDataDisplay';

export interface ExerciseDataListProps {
  schedule: Schedule.Schedule
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
  const { data: getExerciseListByScheduleIdData } = useGetExerciseListByScheduleId(schedule.id)
  const scheduleData = getExerciseListByScheduleIdData.getExerciseListByScheduleId
  const fitnessIdList = scheduleData.map(v => v.exercise)

  const { data: getFitnessListByIdsData } = useGetFitnessListByIds(fitnessIdList)
  const fitnessList = getFitnessListByIdsData.getFitnessListByIds

  const exerciseDataList = useMemo(() => {
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

  return <div className="flex flex-col gap-y-3">
    {exerciseDataList.map((exerciseData) => <MenuableAccordion
      key={`${exerciseData.id}`}
      isFocus={focusExercise === exerciseData.id}
      onFocusChange={(v) => {
        changeFocus(v ? exerciseData.id : 0)
      }}
    >
      {() => ({
        title: <div><h3 className='font-bold'>{exerciseData.name}</h3></div>,
        content: <Suspense>
          <ExerciseDataDisplay exerciseData={exerciseData} readonly={readonly}></ExerciseDataDisplay>
        </Suspense>
      })}
    </MenuableAccordion>)}
  </div>
}