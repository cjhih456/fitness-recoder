import type { Exercise } from 'fitness-struct'
import type { ReactNode } from 'react';
import { Input, ScrollShadow, Select, SelectItem } from '@heroui/react'
import { Suspense, useMemo } from 'react'
import { useGetFitnessListByKeywords } from '@entities/fitness/api';
import { categoryList, muscleList } from '@entities/fitness/model/FitnessDatas';
import FitnessList from './FitnessList'
export interface FitnessListSearchProps {
  searchPrefix?: ReactNode
  selectedFitnessIds?: number[]
  onChangeSelectedFitnessIds?: (_list: number[]) => void
  onToggleFitnessIds?: (_id: number) => void
  searchAreaBg?: boolean
  needSpace?: boolean
}

export default function FitnessListSearch({
  searchPrefix,
  selectedFitnessIds,
  onChangeSelectedFitnessIds,
  onToggleFitnessIds,
  needSpace = false,
  searchAreaBg = false
}: FitnessListSearchProps) {
  const { data: fitnessListData, refetch, fetchMore, hasNext } = useGetFitnessListByKeywords('', [], [], 20, 0)
  const fitnessIds = useMemo(() => fitnessListData.getFitnessListByKeywords.map(v => v.id), [fitnessListData])

  const bgString = searchAreaBg ? 'bg-background/70 backdrop-blur-xl backdrop-saturate-200' : ''
  const xSpacing = needSpace ? 'px-4' : ''
  return <div className="flex flex-col flex-nowrap relative overflow-y-hidden overflow-x-visible">
    <div className={`flex flex-col sticky top-0 left-0 right-0 gap-y-2 mt-1 ${xSpacing} ${bgString}`}>
      <div className="flex justify-center items-center gap-x-4">
        {searchPrefix}
        <Input
          variant='flat'
          placeholder='Search'
          size="lg"
          onValueChange={(v: string) => { refetch({ name: v }) }}
          onClear={() => refetch({ name: '' })}
        ></Input>
      </div>
      <div className="grid grid-cols-2 gap-x-2">
        <Select
          items={categoryList}
          onSelectionChange={(v) => {
            refetch({ category: v === 'all' ? [] : Array.from(v) as Exercise.ICategory[] })
          }}
          selectionMode='multiple'
          label="Workout Category"
        >
          {(category) => <SelectItem key={category.value}>{category.text}</SelectItem>}
        </Select>
        <Select
          items={muscleList}
          onSelectionChange={(v) => {
            refetch({ muscle: v === 'all' ? [] : Array.from(v) as Exercise.IMuscle[] })
          }}
          selectionMode='multiple'
          label="Target Muscle"
        >
          {(muscle) => <SelectItem key={muscle.value}>{muscle.text}</SelectItem>}
        </Select>
      </div>
    </div>
    <ScrollShadow className={`${xSpacing} scroll-smooth pt-4`}>
      <Suspense>
        <FitnessList
          fitnessIds={fitnessIds}
          hasNext={hasNext}
          selectedFitnessIds={selectedFitnessIds}
          onChangeSelectedFitnessIds={onChangeSelectedFitnessIds}
          onToggleFitnessIds={onToggleFitnessIds}
          onLoadMore={fetchMore}
        ></FitnessList>
      </Suspense>
    </ScrollShadow>
  </div>
}