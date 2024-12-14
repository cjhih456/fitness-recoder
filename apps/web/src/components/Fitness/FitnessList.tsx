import type { Exercise } from 'fitness-struct';
import { useMemo } from 'react';
import useSpinner from '@hooks/useSpinner';
import { useFitnessDataModalProvider } from '@provider/FitnessDataModalProvider';
import FitnessItem from './FitnessItem';

export type FitnessListSelectedProps = { selected: boolean, idx: number }
export interface FitnessListProps {
  list: Exercise.IFitness[]
  selectedFitnessIds?: number[]
  isLoadingVisible?: boolean,
  onChangeSelectedFitnessIds?: (_selectedList: number[]) => void
  onToggleFitnessIds?: (_id: number) => void
  onLoadMore?: () => void
}

export default function FitnessList({
  list,
  selectedFitnessIds,
  isLoadingVisible,
  onChangeSelectedFitnessIds,
  onToggleFitnessIds,
  onLoadMore }: FitnessListProps) {
  const { showModal } = useFitnessDataModalProvider()

  const useSelect = useMemo(() => Boolean(selectedFitnessIds), [selectedFitnessIds])

  /**
   * 
   * @param fitnessId Fitness Id
   * @param isDetail
   * @returns 
   */
  function clickFitness(fitnessId: number, isDetail: boolean) {
    if (isDetail || !onChangeSelectedFitnessIds && !onToggleFitnessIds) {
      showModal(fitnessId)
      return
    }
    onToggleFitnessIds && onToggleFitnessIds(fitnessId)
    onChangeSelectedFitnessIds && onChangeSelectedFitnessIds(([] as number[]).concat(selectedFitnessIds || [], fitnessId))
  }

  const [spinner] = useSpinner(list.length, Boolean(isLoadingVisible), onLoadMore)

  return <div className="flex flex-col gap-y-4">
    {list.map(fitness => 
      <FitnessItem
        key={fitness.id}
        fitnessId={fitness.id}
        useSelect={useSelect}
        isSelected={selectedFitnessIds?.includes(fitness.id)}
        onClick={clickFitness}
      ></FitnessItem>
    )}
    {spinner}
  </div>
}