import type { Exercise } from '@fitness/struct';
import type { ReactElement } from 'react';
import { cloneElement } from 'react';
import { useGetExerciseListByScheduleId } from '@entities/exercise/api';
import MenuableAccordion from '@shared/ui/MenuableAccordion';

export interface ExerciseDataListProps {
  scheduleId: number
  children: (_props: { exercise: Exercise.Data }) => ReactElement
}

export default function ExerciseDataList({
  scheduleId,
  children
}: ExerciseDataListProps) {
  const { data: getExerciseListByScheduleIdData } = useGetExerciseListByScheduleId(scheduleId)
  const exerciseList = getExerciseListByScheduleIdData.getExerciseListByScheduleId

  return <div className="flex flex-col gap-y-3">
    <MenuableAccordion.GroupProvider>
      {exerciseList.map((exercise) => cloneElement(children({ exercise }), { key: `${exercise.id}` }))}
    </MenuableAccordion.GroupProvider>
  </div>
}