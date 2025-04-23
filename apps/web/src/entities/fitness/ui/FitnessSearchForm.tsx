import type { FitnessSearchFormData } from '../model/FitnessSearchFormData';
import type { Fitness } from '@fitness/struct'
import type { FC, ReactNode } from 'react'
import { SelectItem, Select, Input } from '@heroui/react'
import { Controller, useForm } from 'react-hook-form'
import { useDebounceCallback } from 'usehooks-ts';
import { categoryList, muscleList } from '@entities/fitness/model/FitnessDatas';
import { defaultFitnessSearchFormData } from '../model/FitnessSearchFormData';
interface FitnessSearchFormProps {
  className?: string
  value: FitnessSearchFormData
  searchPrefix?: ReactNode
  onValueChange: (_data: FitnessSearchFormData) => void
}

const FitnessSearchForm: FC<FitnessSearchFormProps> = ({ searchPrefix, className, value, onValueChange }) => {
  const debouncedAction = useDebounceCallback(onValueChange, 500)
  const form = useForm({
    mode: 'onChange',
    defaultValues: defaultFitnessSearchFormData,
    values: value
  })
  const { register, handleSubmit } = form
  return <form onChange={handleSubmit(debouncedAction)} className={`flex flex-col sticky top-0 left-0 right-0 gap-y-2 mt-1 ${className}`}>
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
      <Controller
        control={form.control}
        name="category"
        defaultValue={[]}
        render={({ field: { onChange, ...field } }) =>
          <Select
            {...field}
            items={categoryList}
            onSelectionChange={(value) => {
              onChange(Array.from(value) as Fitness.ICategory[])
            }}
            onChange={(e) => {
              handleSubmit(debouncedAction)(e)
            }}
            selectionMode='multiple'
            label="Workout Category"
          >
            {(category) => <SelectItem key={category.value}>{category.text}</SelectItem>}
          </Select>
        } />
      <Controller
        control={form.control}
        name="muscle"
        defaultValue={[]}
        render={({ field: { onChange, ...field } }) =>
          <Select
            {...field}
            items={muscleList}
            onSelectionChange={(value) => {
              onChange(Array.from(value) as Fitness.IMuscle[])
            }}
            onChange={(e) => {
              handleSubmit(debouncedAction)(e)
            }}
            selectionMode='multiple'
            label="Target Muscle"
          >
            {(muscle) => <SelectItem key={muscle.value}>{muscle.text}</SelectItem>}
          </Select>
        } />
    </div>
  </form>
}

export default FitnessSearchForm
