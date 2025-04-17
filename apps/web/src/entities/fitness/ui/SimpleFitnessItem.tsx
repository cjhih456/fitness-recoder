import type { Exercise } from '@fitness/struct'
import { Suspense } from 'react'
import { useFitnessFragment } from '@entities/fitness/api';
import SetState from '@entities/set/ui/SetState'

export interface SimpleFitnessItemProps {
  exerciseData: Exercise.Data
}
export default function SimpleFitnessItem({ exerciseData }: SimpleFitnessItemProps) {
  const fitnessData = useFitnessFragment(exerciseData.exercise)
  return <div className="flex justify-between items-center">
    <div>{fitnessData.name}</div>
    <div>
      <Suspense>
        <SetState exerciseDataId={exerciseData.id} />
      </Suspense>
    </div>
  </div>
} 