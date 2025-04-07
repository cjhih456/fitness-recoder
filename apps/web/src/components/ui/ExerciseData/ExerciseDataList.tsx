import type { Schedule } from 'fitness-struct';
import { Suspense } from 'react';
import { useGetExerciseListByScheduleId } from '@hooks/apollo/Exercise';
import MenuableAccordion from '@shared/ui/MenuableAccordion';
import SetListEditor from '../Sets/SetListEditor';

export interface ExerciseDataListProps {
  schedule: Schedule.Schedule
  readonly?: boolean
}

export default function ExerciseDataList({
  schedule,
  readonly
}: ExerciseDataListProps) {
  const { data: getExerciseListByScheduleIdData } = useGetExerciseListByScheduleId(schedule.id)
  const exerciseList = getExerciseListByScheduleIdData.getExerciseListByScheduleId

  return <div className="flex flex-col gap-y-3">
    <MenuableAccordion.GroupProvider>
      {exerciseList.map((exercise) => <MenuableAccordion.GroupContent
        key={`${exercise.id}`}
        openId={exercise.id}
      >
        {{
          title: <div><h3 className='font-bold'>{exercise.fitness.name}</h3></div>,
          content: <Suspense>
            <SetListEditor
              exerciseDataId={exercise.id}
              readonly={readonly}
            ></SetListEditor>
          </Suspense>
        }}
      </MenuableAccordion.GroupContent>)}
    </MenuableAccordion.GroupProvider>
  </div>
}