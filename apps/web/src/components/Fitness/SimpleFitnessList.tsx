import { Exercise } from 'fitness-struct'
import SimpleFitnessItem from './SimpleFitnessItem'
import { useBackgroundGetFitnessSimpleListByIds } from '../../service/GqlStore/Fitness'
import { Spinner } from '@nextui-org/react'
import { Suspense } from 'react'

export interface SimpleFitnessListProps {
  exerciseDataList: Exercise.Data[]
}

export default function SimpleFitnessList({ exerciseDataList }: SimpleFitnessListProps) {
  useBackgroundGetFitnessSimpleListByIds(exerciseDataList.map(v => v.exercise))
  return <div role="grid" className="flex flex-col gap-y-2">
    <Suspense fallback={<Spinner />}>
      {exerciseDataList.map(exerciseData => (
        <SimpleFitnessItem key={exerciseData.id} exerciseData={exerciseData} />
      ))}
    </Suspense>
  </div>
}