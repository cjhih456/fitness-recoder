import { Spinner } from '@nextui-org/react';
import FitnessItem from './FitnessItem';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useExerciseDataModalProvider } from '../provider/ExerciseDataModal/useExerciseDataModalProvider';
import { Exercise } from 'fitness-struct';
import { useIntersectionObserver } from 'usehooks-ts';

export type FitnessListSelectedProps = { selected: boolean, idx: number }
export interface FitnessListProps {
  list: Exercise.IFitness[]
  selectedList?: number[]
  onChangeSelectedList?: (_selectedList: number[]) => void
  onLoadMore?: () => void
}

export default function FitnessList({ list, selectedList, onChangeSelectedList, onLoadMore }: FitnessListProps) {
  const { ref: spinnerRef } = useIntersectionObserver({
    threshold: 1,
    onChange(isIntersecting) {
      if (isIntersecting) {
        onLoadMore && onLoadMore()
      }
    },
  })
  const { showModal } = useExerciseDataModalProvider()
  const [lazySelectedList, setLazySelectedList] = useState(new Set<number>())
  function updateLazySelectedList(prevSet: Set<number>, id: number) {
    const newSet = new Set(prevSet)
    newSet.has(id) ? newSet.delete(id) : newSet.add(id)
    return newSet
  }
  const useSelect = useMemo(() => Boolean(selectedList), [selectedList])


  function selectExercise(fitnessId: number, isDetail: boolean) {
    if (isDetail || !onChangeSelectedList) {
      showModal(fitnessId)
      return
    }
    setLazySelectedList((prev) => updateLazySelectedList(prev, fitnessId))
    onChangeSelectedList(Array.from(lazySelectedList))
  }

  useEffect(() => {
    setLazySelectedList(new Set(selectedList || []))
  }, [])
  const spinner = useMemo(() => {
    if (list.length <= 10) return undefined
    return <div className="flex justify-center">
      <Spinner ref={spinnerRef} color="primary" size="lg"></Spinner>
    </div>
  }, [list])
  return (<div className="flex flex-col gap-y-4">
    {list.map(fitness => (
      <FitnessItem key={fitness.id} fitnessData={fitness} useSelect={useSelect} onClick={selectExercise}></FitnessItem>
    ))}
    {spinner}
  </div>)
}