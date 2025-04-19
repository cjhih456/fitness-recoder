import type { Exercise } from '@fitness/struct'
import type { ReactNode } from 'react';
import { Suspense } from 'react'
import SimpleFitness from '@entities/fitness/ui/SimpleFitness'

export interface SimpleFitnessListProps {
  exerciseDataList: Exercise.Data[]
  children: (_exerciseData: Exercise.Data) => ReactNode
}

export default function SimpleFitnessList({ exerciseDataList, children }: SimpleFitnessListProps) {
  return <div role="grid" className="flex flex-col gap-y-2">
    {exerciseDataList.map(exerciseData =>
      <Suspense key={`fitness-${exerciseData.id}`}>
        <SimpleFitness fitnessId={exerciseData.fitnessId}>
          {children(exerciseData)}
        </SimpleFitness>
      </Suspense>
    )}
  </div>
}