import { Accordion, AccordionItem } from '@nextui-org/react';
import ExerciseDataDisplay from './ExerciseDataDisplay';
import useScheduleStore from '../../service/Store/ScheduleStoreHooks';
import { useMemo, useState } from 'react';
import { getExerciseByIdx } from '../../service/Fitness/FitnessDatas';

interface ExerciseDataListProps {
  scheduleIdx: string
}

export default function ExerciseDataList({
  scheduleIdx
}: ExerciseDataListProps) {
  const scheduleStore = useScheduleStore()
  const [selectedKeys, changeSelectedKeys] = useState<'all' | string[]>([])
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

  function changeSelection(key: string) {
    if (selectedKeys[0] === key) {
      changeSelectedKeys([])
    } else {
      changeSelectedKeys([key])
    }
  }

  function gotoNextExercise(index: number) {
    if (exerciseList[index + 1]) {
      changeSelectedKeys([exerciseList[index + 1].idx])
    }
  }

  return <Accordion selectionBehavior="replace" variant='splitted' selectedKeys={selectedKeys}>
    {exerciseList.map((exerciseData, index) => {
      return <AccordionItem
        key={`${exerciseData.idx}`}
        title={exerciseData.name}
        classNames={{ heading: 'font-bold' }}
        onPress={() => changeSelection(exerciseData.idx)}
      >
        <ExerciseDataDisplay exerciseDataIdx={exerciseData.idx} hasDoneLastSet={() => gotoNextExercise(index)}></ExerciseDataDisplay>
      </AccordionItem>
    })}
  </Accordion>
}