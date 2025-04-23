import useSpinner from '@shared/hooks/useSpinner';
import FitnessItem from './FitnessItem';

export type FitnessListSelectedProps = { selected: boolean, idx: number }
export interface FitnessListProps {
  fitnessIds: number[]
  className?: string
  selectedFitnessIds?: number[]
  hasNext?: boolean
  onToggleFitnessIds?: (_id: number) => void
  onModalOpen?: (_id: number) => void
  onLoadMore?: () => void
}

export default function FitnessList({
  className,
  fitnessIds,
  selectedFitnessIds,
  hasNext = false,
  onToggleFitnessIds,
  onModalOpen,
  onLoadMore
}: FitnessListProps) {
  /**
   * 
   * @param fitnessId Fitness Id
   * @param isDetail
   * @returns 
   */
  function clickFitness(fitnessId: number, isDetail: boolean) {
    if (isDetail) {
      onModalOpen?.(fitnessId)
      return
    }
    if (onToggleFitnessIds) {
      onToggleFitnessIds(fitnessId)
    } else {
      onModalOpen?.(fitnessId)
    }
  }

  const [spinner] = useSpinner({
    visible: hasNext,
    loadMore: onLoadMore
  })

  return <div className={`flex flex-col gap-y-4 ${className}`}>
    {fitnessIds.map(fitness =>
      <FitnessItem
        key={`fitness-${fitness}`}
        fitnessId={fitness}
        isSelected={selectedFitnessIds?.includes(fitness)}
        onClick={clickFitness}
      ></FitnessItem>
    )}
    {spinner}
  </div>
}