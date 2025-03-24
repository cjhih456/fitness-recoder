import type { Schedule } from 'fitness-struct';
import { Suspense, useState } from 'react';
import { useGetExerciseListByScheduleId } from '@hooks/apollo/Exercise';
import MenuableAccordion from '@ui/CustomComponent/MenuableAccordion';
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

  const [focusExercise, changeFocus] = useState(0)

  return <div className="flex flex-col gap-y-3">
    {exerciseList.map((exercise) => <MenuableAccordion
      key={`${exercise.id}`}
      isFocus={focusExercise === exercise.id}
      onFocusChange={(v) => {
        changeFocus(v ? exercise.id : 0)
      }}
    >
      {() => ({
        title: <div><h3 className='font-bold'>{exercise.fitness.name}</h3></div>,
        content: <Suspense>
          <SetListEditor
            exerciseDataId={exercise.id}
            readonly={readonly}
          ></SetListEditor>
        </Suspense>
      })}
    </MenuableAccordion>)}
  </div>
}