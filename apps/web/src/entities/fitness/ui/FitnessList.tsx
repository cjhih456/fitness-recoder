import { Suspense } from 'react';
import useSpinner from '@shared/hooks/useSpinner';
import useFitnessDataModal from '@widgets/FitnessDataModal/hooks/useFitnessDataModal';
import FitnessItem from './FitnessItem';

export type FitnessListSelectedProps = { selected: boolean, idx: number }
export interface FitnessListProps {
  fitnessIds: number[]
  selectedFitnessIds?: number[]
  hasNext?: boolean
  onChangeSelectedFitnessIds?: (_selectedList: number[]) => void
  onToggleFitnessIds?: (_id: number) => void
  onLoadMore?: () => void
}

export default function FitnessList({
  fitnessIds,
  selectedFitnessIds,
  hasNext = false,
  onChangeSelectedFitnessIds,
  onToggleFitnessIds,
  onLoadMore
}: FitnessListProps) {
  const { setFitnessId } = useFitnessDataModal()

  /**
   * 
   * @param fitnessId Fitness Id
   * @param isDetail
   * @returns 
   */
  function clickFitness(fitnessId: number, isDetail: boolean) {
    if (isDetail || !onChangeSelectedFitnessIds && !onToggleFitnessIds) {
      setFitnessId(fitnessId)
      return
    }
    onToggleFitnessIds && onToggleFitnessIds(fitnessId)
    onChangeSelectedFitnessIds && onChangeSelectedFitnessIds(([] as number[]).concat(selectedFitnessIds || [], fitnessId))
  }

  const [spinner] = useSpinner({
    visible: hasNext,
    loadMore: onLoadMore
  })

  return <div className="flex flex-col gap-y-4">
    {fitnessIds.map(fitness =>
      <Suspense key={fitness}>
        <FitnessItem
          fitnessId={fitness}
          isSelected={selectedFitnessIds?.includes(fitness)}
          onClick={clickFitness}
        ></FitnessItem>
      </Suspense>
    )}
    {spinner}
  </div>
}