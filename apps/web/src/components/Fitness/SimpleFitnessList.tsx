import type { Exercise } from 'fitness-struct'
import SimpleFitnessItem from './SimpleFitnessItem'

export interface SimpleFitnessListProps {
  exerciseDataList: Exercise.Data[]
}

export default function SimpleFitnessList({ exerciseDataList }: SimpleFitnessListProps) {
  return <div role="grid" className="flex flex-col gap-y-2">
    {exerciseDataList.map(exerciseData =>
      <SimpleFitnessItem key={`fitness-${exerciseData.id}`} exerciseData={exerciseData} />
    )}
  </div>
}