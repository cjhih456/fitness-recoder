import { Input, Navbar, Select, SelectItem } from '@nextui-org/react'
import { useMemo, useState } from 'react'
import { categoryList, filterExcercises, muscleList } from '../../service/Fitness/FitnessDatas'
import FitnessList from './FitnessList'
import { Category, Muscle } from '../../service/Fitness/FitnessDataEnums'
interface FitnessListSearchProps {
  searchPrefix?: JSX.Element
}


export default function FitnessListSearch({ searchPrefix }: FitnessListSearchProps) {
  const [searchValue, changeSearchValue] = useState('')
  const [selectedCategoryList, changeCategory] = useState<Category[]>([])
  const [selectedMuscleList, changeMuscle] = useState<Muscle[]>([])
  const fitnessList = useMemo(() => {
    return filterExcercises(searchValue, selectedCategoryList, [], undefined, selectedMuscleList)
  }, [searchValue, selectedCategoryList, selectedMuscleList])
  return <div>
    <Navbar>
      {searchPrefix ?? undefined}
      <Input
        variant='flat'
        placeholder='Search'
        value={searchValue}
        onValueChange={(v: string) => { changeSearchValue(v) }}
        onClear={() => changeSearchValue('')}
      ></Input>
    </Navbar>
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

    {/* TODO: goto setup pages */}
    <FitnessList list={fitnessList}></FitnessList>
  </div>
}