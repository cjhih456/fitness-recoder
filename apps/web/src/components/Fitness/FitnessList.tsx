import { Spinner } from '@nextui-org/react';
import FitnessItem from './FitnessItem';
import { useMemo } from 'react';
import { useExerciseDataModalProvider } from '../provider/ExerciseDataModal/useExerciseDataModalProvider';
import { Exercise } from 'fitness-struct';
import { useIntersectionObserver } from 'usehooks-ts';

export type FitnessListSelectedProps = { selected: boolean, idx: number }
export interface FitnessListProps {
  list: Exercise.IFitness[]
  selectedFitnessIds?: number[]
  onChangeSelectedFitnessIds?: (_selectedList: number[]) => void
  onToggleFitnessIds?: (_id: number) => void
  onLoadMore?: () => void
}

export default function FitnessList({ list,
  selectedFitnessIds,
  onChangeSelectedFitnessIds,
  onToggleFitnessIds,
  onLoadMore }: FitnessListProps) {
  const { showModal } = useExerciseDataModalProvider()

  const useSelect = useMemo(() => Boolean(selectedFitnessIds), [selectedFitnessIds])

  /**
   * 
   * @param fitnessId Fitness Id
   * @param isDetail
   * @returns 
   */
  function clickFitness(fitnessId: number, isDetail: boolean) {
    if (isDetail || (!onChangeSelectedFitnessIds && !onToggleFitnessIds)) {
      showModal(fitnessId)
      return
    }
    onToggleFitnessIds && onToggleFitnessIds(fitnessId)
    onChangeSelectedFitnessIds && onChangeSelectedFitnessIds(([] as number[]).concat(selectedFitnessIds || [], fitnessId))
  }

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
        isSelected={selectedFitnessIds?.includes(fitness.id)}
        onClick={clickFitness}
      ></FitnessItem>
    ))}
    {spinner}
  </div>)
}