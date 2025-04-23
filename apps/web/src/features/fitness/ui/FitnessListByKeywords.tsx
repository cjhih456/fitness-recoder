import type { FitnessSearchFormData } from '@entities/fitness/model/FitnessSearchFormData'
import type { FitnessListProps } from '@entities/fitness/ui/FitnessList';
import type { FC } from 'react'
import { useMemo } from 'react'
import { useGetFitnessListByKeywords } from '@entities/fitness/api'
import FitnessList from '@entities/fitness/ui/FitnessList'
interface FitnessListByFilterProps extends Omit<FitnessListProps, 'fitnessIds' | 'onLoadMore' | 'hasNext'> {
  searchFilter: FitnessSearchFormData
}

const FitnessListByFilter: FC<FitnessListByFilterProps> = ({ searchFilter, ...props }) => {
  const { data: fitnessListData, fetchMore, hasNext } = useGetFitnessListByKeywords(searchFilter)
  const fitnessIds = useMemo(() => fitnessListData.getFitnessListByKeywords.map(v => v.id), [fitnessListData])
  return <FitnessList
    {...props}
    hasNext={hasNext}
    fitnessIds={fitnessIds}
    onLoadMore={fetchMore}
  ></FitnessList>
}

export default FitnessListByFilter
