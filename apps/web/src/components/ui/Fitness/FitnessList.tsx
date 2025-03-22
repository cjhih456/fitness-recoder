import useFitnessDataModalProvider from '@hooks/provider/FitnessDataModal/useFitnessDataModalProvider';
import useSpinner from '@hooks/useSpinner';
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
  const { showModal } = useFitnessDataModalProvider()

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

  const [spinner] = useSpinner({
    visible: hasNext,
    loadMore: onLoadMore
  })

  return <div className="flex flex-col gap-y-4">
    {fitnessIds.map(fitness =>
      <FitnessItem
        key={fitness}
        fitnessId={fitness}
        isSelected={selectedFitnessIds?.includes(fitness)}
        onClick={clickFitness}
      ></FitnessItem>
    )}
    {spinner}
  </div>
}