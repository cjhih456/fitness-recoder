import type { FitnessSearchFormData } from '../model/FitnessSearchFormData';
import type { Fitness } from '@fitness/struct'
import type { FC, ReactNode } from 'react'
import { SelectItem, Select, Input } from '@heroui/react'
import { useForm } from 'react-hook-form'
import { categoryList, muscleList } from '@entities/fitness/model/FitnessDatas';
import { defaultFitnessSearchFormData } from '../model/FitnessSearchFormData';

interface FitnessSearchFormProps {
  className?: string
  value: FitnessSearchFormData
  searchPrefix?: ReactNode
  onValueChange: (_data: FitnessSearchFormData) => void
}

const FitnessSearchForm: FC<FitnessSearchFormProps> = ({ searchPrefix, className, value, onValueChange }) => {
  const form = useForm({
    mode: 'onChange',
    defaultValues: defaultFitnessSearchFormData,
    values: value
  })
  const { register, handleSubmit } = form
  return <form onChange={handleSubmit(onValueChange)} className={`flex flex-col sticky top-0 left-0 right-0 gap-y-2 mt-1 ${className}`}>
    <div className="flex justify-center items-center gap-x-4">
      {searchPrefix}
      <Input
        variant='flat'
        placeholder='Search'
        size="lg"
        {...register('name')}
      ></Input>
    </div>
    <div className="grid grid-cols-2 gap-x-2">
      <Select
        items={categoryList}
        {...register('category', {
          setValueAs(value) {
            return value === 'all' ? [] : Array.from(value) as Fitness.ICategory[]
          },
        })}
        selectionMode='multiple'
        label="Workout Category"
      >
        {(category) => <SelectItem key={category.value}>{category.text}</SelectItem>}
      </Select>
      <Select
        items={muscleList}
        {...register('muscle', {
          setValueAs(value) {
            return value === 'all' ? [] : Array.from(value) as Fitness.IMuscle[]
          },
        })}
        selectionMode='multiple'
        label="Target Muscle"
      >
        {(muscle) => <SelectItem key={muscle.value}>{muscle.text}</SelectItem>}
      </Select>
    </div>
  </form>
}

export default FitnessSearchForm
