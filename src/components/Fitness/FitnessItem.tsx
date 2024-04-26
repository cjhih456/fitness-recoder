import { Card, CardBody, Chip } from '@nextui-org/react';
import { MdCheck } from 'react-icons/md';

interface FitnessItemProps {
  exercise: SelectedExercise
  useSelect?: boolean
  onClick?: (exercise: IExercise, selected: boolean) => void
}
export default function FitnessItem({ exercise, onClick, useSelect }: FitnessItemProps) {
  return <Card className="fitness-item">
    <CardBody className="flex flex-row">
      <div className="flex-[100px] flex-grow-0 flex-shrink-0">
        {/* TODO: add image files */}
      </div>
      <div className="flex flex-col flex-1 gap-y-2" onClick={() => {
        onClick && onClick(exercise, !exercise.selected)
      }}>
        <h3 className="font-semibold"><span>{exercise.name}</span> {
          useSelect && <span className="inline-block" >
            {exercise.selected && <div className="flex justify-center items-center w-[16px] h-[16px] rounded-full bg-primary text-white"><MdCheck size="0.75rem"></MdCheck></div>}
          </span>
        }</h3>
        <div>
          {exercise.category}
        </div>
        <div className="flex gap-1 flex-wrap">
          {exercise.primaryMuscles.map((muscle) => {
            return <Chip size='sm' key={muscle}>{muscle}</Chip>
          })}
          {exercise.secondaryMuscles.map((muscle) => {
            return <Chip size='sm' key={muscle}>{muscle}</Chip>
          })}
        </div>
      </div>

    </CardBody>
  </Card >
}
