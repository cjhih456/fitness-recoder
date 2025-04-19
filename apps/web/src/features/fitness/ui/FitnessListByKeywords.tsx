import type { UseGetFitnessListByKeywordsProps } from '../api/useGetFitnessListByKeywords'
import type { FitnessListProps } from '@entities/fitness/ui/FitnessList';
import type { FC } from 'react'
import { useMemo } from 'react'
import FitnessList from '@entities/fitness/ui/FitnessList'
import { useGetFitnessListByKeywords } from '../api'

interface FitnessListByFilterProps extends Omit<FitnessListProps, 'fitnessIds' | 'onLoadMore' | 'hasNext'> {
  searchFilter: UseGetFitnessListByKeywordsProps
}

const FitnessListByFilter: FC<FitnessListByFilterProps> = ({ searchFilter, ...props }) => {
  const { data: fitnessListData, fetchMore, hasNext } = useGetFitnessListByKeywords({
    ...searchFilter,
    limit: 20,
    offset: 0,
  })
  const fitnessIds = useMemo(() => fitnessListData.getFitnessListByKeywords.map(v => v.id), [fitnessListData])
  return <FitnessList
    {...props}
    hasNext={hasNext}
    fitnessIds={fitnessIds}
    onLoadMore={fetchMore}
  ></FitnessList>
}

export default FitnessListByFilter
