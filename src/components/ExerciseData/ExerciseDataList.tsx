import { Accordion, AccordionItem } from '@nextui-org/react';
import ExerciseDataDisplay from './ExerciseDataDisplay';
import useScheduleStore from '../../service/Store/ScheduleStoreHooks';
import { useMemo } from 'react';
import { getExerciseByIdx } from '../../service/Fitness/FitnessDatas';

interface ExerciseDataListProps {
  scheduleIdx: string
}

export default function ExerciseDataList({
  scheduleIdx
}: ExerciseDataListProps) {
  const scheduleStore = useScheduleStore()
  const scheduleData = useMemo(() => {
    return scheduleStore.getSchedule(scheduleIdx)
  }, [scheduleStore, scheduleIdx])
  const exerciseList = useMemo(() => {
    return scheduleData.exerciseList.map(exerciseIdx => {
      const exerciseData = scheduleStore.getExerciseData(exerciseIdx)
      const exercise = getExerciseByIdx(exerciseData.exercise)
      return {
        ...exerciseData,
        idx: exerciseIdx,
        name: exercise.name
      }
    })

  }, [scheduleStore, scheduleData])
  return <Accordion selectionBehavior="replace" variant='splitted'>
    {exerciseList.map((exerciseData) => {
      return <AccordionItem
        key={`${exerciseData.idx}`}
        title={exerciseData.name}
        classNames={{ heading: 'font-bold' }}
      >
        <ExerciseDataDisplay exerciseDataIdx={exerciseData.idx}></ExerciseDataDisplay>
      </AccordionItem>
    })}
  </Accordion>
}