import { Input, ScrollShadow, Select, SelectItem } from '@nextui-org/react'
import { useMemo, useState } from 'react'
import { categoryList, filterExcercises, muscleList } from '../../service/Fitness/FitnessDatas'
import FitnessList from './FitnessList'
import { Category, Muscle } from '../../service/Fitness/FitnessDataEnums'
export interface FitnessListSearchProps {
  searchPrefix?: JSX.Element
  selectedList?: number[]
  onChangeSelectedList?: (list: number[]) => void
  searchAreaBg?: boolean
  needSpace?: boolean
}


export default function FitnessListSearch({ searchPrefix, selectedList, onChangeSelectedList, needSpace = false, searchAreaBg = false }: FitnessListSearchProps) {
  const [searchValue, changeSearchValue] = useState('')
  const [selectedCategoryList, changeCategory] = useState<Category[]>([])
  const [selectedMuscleList, changeMuscle] = useState<Muscle[]>([])
  const fitnessList = useMemo(() => {
    return filterExcercises(searchValue, selectedCategoryList, [], undefined, selectedMuscleList)
  }, [searchValue, selectedCategoryList, selectedMuscleList])
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
            changeCategory(v === 'all' ? [] : Array.from(v) as Category[])
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
            changeMuscle(v === 'all' ? [] : Array.from(v) as Muscle[])
          }}
          selectionMode='multiple'
          label="Target Muscle"
        >
          {(muscle) => <SelectItem key={muscle.value}>{muscle.text}</SelectItem>}
        </Select>
      </div>
    </div>
    <ScrollShadow className={`${xSpacing} snap-y scroll-smooth mt-4`}>
      <FitnessList list={fitnessList} selectedList={selectedList} onChangeSelectedList={onChangeSelectedList}></FitnessList>
    </ScrollShadow>
  </div>
}