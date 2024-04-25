import { Card, CardBody, Chip } from '@nextui-org/react';

interface FitnessItemProps {
  exercise: IExercise
  onClick?: (exercise: IExercise) => void
}
export default function FitnessItem({ exercise, onClick }: FitnessItemProps) {
  return <Card className="fitness-item" onClick={() => { onClick && onClick(exercise) }}>
    <CardBody className="flex flex-row">
      <div className="flex-[100px] flex-grow-0 flex-shrink-0">
        {/* TODO: add image files */}
      </div>
      <div className="flex flex-col flex-1 gap-y-2">
        <h3 className="font-semibold">{exercise.name}</h3>
        <div>
          <Chip>{exercise.category}</Chip>
        </div>
        <div className="flex gap-2 flex-wrap">
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
