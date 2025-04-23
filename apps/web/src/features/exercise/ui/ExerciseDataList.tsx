import type { Exercise } from '@fitness/struct';
import type { ReactElement } from 'react';
import { cloneElement } from 'react';
import { useGetExerciseListByScheduleId } from '@entities/exercise/api';
import MenuableAccordion from '@shared/ui/MenuableAccordion';

interface ExerciseDataChildrenProps {
  exercise: Exercise.Data
  idx: number,
  exerciseList: Exercise.Data[]
  gotoNext: () => void
}
export interface ExerciseDataListProps {
  scheduleId: number
  children: (_props: ExerciseDataChildrenProps) => ReactElement
}

export default function ExerciseDataList({
  scheduleId,
  children
}: ExerciseDataListProps) {
  const { data: getExerciseListByScheduleIdData } = useGetExerciseListByScheduleId(scheduleId)
  const exerciseList = getExerciseListByScheduleIdData.getExerciseListByScheduleId
  return <div className="flex flex-col gap-y-3">
    <MenuableAccordion.GroupProvider valueList={exerciseList.map(v => v.id)} defaultValue={exerciseList[0].id}>
      {(gotoNext) => exerciseList.map((exercise, idx) => cloneElement(children({ exercise, idx, exerciseList, gotoNext }), { key: `${exercise.id}` }))}
    </MenuableAccordion.GroupProvider>
  </div>
}