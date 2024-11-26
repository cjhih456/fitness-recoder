import { Spinner } from '@nextui-org/react';
import FitnessItem from './FitnessItem';
import { useEffect, useMemo, useState } from 'react';
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
  const { showModal } = useExerciseDataModalProvider()

  const useSelect = useMemo(() => Boolean(selectedList), [selectedList])
  // Selected
  const [lazySelectedList, setLazySelectedList] = useState(new Set<number>(selectedList))
  /**
   * Toggle value on Set container
   * @param prevSet prev Set datas
   * @param id toggle target fitness Data
   * @returns new Set
   */
  function toggleIdOnSet(prevSet: Set<number>, id: number) {
    const newSet = new Set(prevSet)
    newSet.has(id) ? newSet.delete(id) : newSet.add(id)
    return newSet
  }
  /**
   * 
   * @param fitnessId Fitness Id
   * @param isDetail 
   * @returns 
   */
  function clickFitness(fitnessId: number, isDetail: boolean) {
    if (isDetail || !onChangeSelectedList) {
      showModal(fitnessId)
      return
    }
    setLazySelectedList((prev) => toggleIdOnSet(prev, fitnessId))
  }
  useEffect(() => {
    onChangeSelectedList && onChangeSelectedList(Array.from(lazySelectedList))
  }, [lazySelectedList, onChangeSelectedList])
  useEffect(() => {
    setLazySelectedList(new Set(selectedList || []))
  }, [])

  // Spinner Intersection
  const { ref: spinnerRef } = useIntersectionObserver({
    threshold: 1,
    onChange(isIntersecting) {
      if (isIntersecting) {
        onLoadMore && onLoadMore()
      }
    },
  })
  // Spinner
  const spinner = useMemo(() => {
    if (list.length <= 10) return undefined
    return <div className="flex justify-center">
      <Spinner ref={spinnerRef} color="primary" size="lg"></Spinner>
    </div>
  }, [list])

  return (<div className="flex flex-col gap-y-4">
    {list.map(fitness => (
      <FitnessItem
        key={fitness.id}
        fitnessData={fitness}
        useSelect={useSelect}
        isSelected={lazySelectedList.has(fitness.id)}
        onClick={clickFitness}
      ></FitnessItem>
    ))}
    {spinner}
  </div>)
}