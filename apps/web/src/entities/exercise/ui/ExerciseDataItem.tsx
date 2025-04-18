import type { ReactNode } from 'react'
import { Suspense } from 'react'
import MenuableAccordion from '@shared/ui/MenuableAccordion'

export interface ExerciseDataItemProps {
  exerciseId: number
  fitnessName?: string
  children: ReactNode
}

const ExerciseDataItem = ({
  exerciseId,
  fitnessName = '',
  children
}: ExerciseDataItemProps) => {

  return <MenuableAccordion.GroupContent
    key={`${exerciseId}`}
    openId={exerciseId}
  >
    {{
      title: <div><h3 className='font-bold'>{fitnessName}</h3></div>,
      content: <Suspense>
        {children}
      </Suspense>
    }}
  </MenuableAccordion.GroupContent>
}

export default ExerciseDataItem
