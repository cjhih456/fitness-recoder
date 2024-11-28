import { Input, ScrollShadow, Select, SelectItem } from '@nextui-org/react'
import { ReactNode, useCallback, useEffect, useState } from 'react'
import { categoryList, muscleList } from '../../service/Fitness/FitnessDatas'
import FitnessList from './FitnessList'
import { Exercise } from 'fitness-struct'
import { useLazyGetFitnessListByKeywords } from '../../service/GqlStore/Fitness'
import { useDebounceCallback } from 'usehooks-ts'
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
  const [searchValue, changeSearchValue] = useState('')
  const [selectedCategoryList, changeCategory] = useState<Exercise.ICategory[]>([])
  const [selectedMuscleList, changeMuscle] = useState<Exercise.IMuscle[]>([])
  const [fitnessList, setFitnessList] = useState<Exercise.IFitness[]>([])
  const [getFitnessListByKeywords] = useLazyGetFitnessListByKeywords()
  const callFunction = useCallback((name: string, category: string[], muscle: string[], offset: number) => {
    getFitnessListByKeywords({
      variables: {
        name,
        category,
        muscle,
        limit: 20,
        offset
      }
    }).then(result => {
      setFitnessList(
        (pre) => {
          return [...pre, ...(result.data?.getFitnessListByKeywords || [])]
        }
      )
    })
  }, [])
  const fitnessLoadCallback = useDebounceCallback(callFunction)
  useEffect(() => {
    setFitnessList([])
    fitnessLoadCallback(searchValue, selectedCategoryList, selectedMuscleList, 0)
  }, [searchValue, selectedCategoryList, selectedMuscleList, fitnessLoadCallback])
  const bgString = searchAreaBg ? 'bg-background/70 backdrop-blur-xl backdrop-saturate-200' : ''
  const xSpacing = needSpace ? 'px-4' : ''
  return <div className="flex flex-col flex-nowrap relative overflow-y-hidden overflow-x-visible">
    <div className={`flex flex-col sticky top-0 left-0 right-0 gap-y-2 mt-1 ${xSpacing} ${bgString}`}>
      <div className="flex justify-center items-center gap-x-4">
        {searchPrefix ?? undefined}
        <Input
          variant='flat'
          placeholder='Search'
          size="lg"
          value={searchValue}
          onValueChange={(v: string) => { changeSearchValue(v) }}
          onClear={() => changeSearchValue('')}
        ></Input>
      </div>
      <div className="grid grid-cols-2 gap-x-2">
        <Select
          value={selectedCategoryList}
          items={categoryList}
          onSelectionChange={(v) => {
            changeCategory(v === 'all' ? [] : Array.from(v) as Exercise.ICategory[])
          }}
          selectionMode='multiple'
          label="Workout Category"
        >
          {(category) => <SelectItem key={category.value}>{category.text}</SelectItem>}
        </Select>
        <Select
          value={selectedMuscleList}
          items={muscleList}
          onSelectionChange={(v) => {
            changeMuscle(v === 'all' ? [] : Array.from(v) as Exercise.IMuscle[])
          }}
          selectionMode='multiple'
          label="Target Muscle"
        >
          {(muscle) => <SelectItem key={muscle.value}>{muscle.text}</SelectItem>}
        </Select>
      </div>
    </div>
    <ScrollShadow className={`${xSpacing} scroll-smooth pt-4`}>
      <FitnessList
        list={fitnessList}
        selectedFitnessIds={selectedFitnessIds}
        onChangeSelectedFitnessIds={onChangeSelectedFitnessIds}
        onToggleFitnessIds={onToggleFitnessIds}
        onLoadMore={() => {
          fitnessLoadCallback(searchValue, selectedCategoryList, selectedMuscleList, fitnessList.length)
        }}
      ></FitnessList>
    </ScrollShadow>
  </div>
}