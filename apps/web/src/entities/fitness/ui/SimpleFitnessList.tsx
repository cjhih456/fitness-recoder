import type { Exercise } from 'fitness-struct'
import { Suspense } from 'react'
import SimpleFitnessItem from './SimpleFitnessItem'

export interface SimpleFitnessListProps {
  exerciseDataList: Exercise.Data[]
}

export default function SimpleFitnessList({ exerciseDataList }: SimpleFitnessListProps) {
  return <div role="grid" className="flex flex-col gap-y-2">
    {exerciseDataList.map(exerciseData =>
      <Suspense key={`fitness-${exerciseData.id}`}>
        <SimpleFitnessItem exerciseData={exerciseData} />
      </Suspense>
    )}
  </div>
}