import type { ReactNode } from 'react'
import { Suspense } from 'react'
import MenuableAccordion from '@shared/ui/MenuableAccordion'
import { useExerciseWithFitnessFragment } from '../api'

export interface ExerciseDataItemProps {
  exerciseId: number
  fitnessName?: string
  children: ReactNode
}

const ExerciseDataItem = ({
  exerciseId,
  children
}: ExerciseDataItemProps) => {
  const { fitness } = useExerciseWithFitnessFragment(exerciseId)
  return <MenuableAccordion.GroupContent
    key={`${exerciseId}`}
    openId={exerciseId}
  >
    {{
      title: <div><h3 className='font-bold'>{fitness.name}</h3></div>,
      content: <Suspense>
        {children}
      </Suspense>
    }}
  </MenuableAccordion.GroupContent>
}

export default ExerciseDataItem
