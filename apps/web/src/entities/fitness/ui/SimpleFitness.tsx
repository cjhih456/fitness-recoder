import type { ReactNode } from 'react';
import { useFitnessFragment } from '@entities/fitness/api';

export interface SimpleFitnessProps {
  fitnessId: number
  children: ReactNode
}
export default function SimpleFitness({ fitnessId, children }: SimpleFitnessProps) {
  const fitnessData = useFitnessFragment(fitnessId)
  return <div className="flex justify-between items-center">
    <div>{fitnessData.name}</div>
    <div>
      {children}
    </div>
  </div>
} 