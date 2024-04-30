import SimpleFitnessItem from './SimpleFitnessItem'

interface SimpleFitnessListProps {
  list: ExerciseData[]
}

export default function SimpleFitnessList({ list }: SimpleFitnessListProps) {
  return <div className="flex flex-col gap-y-2">
    {list.map(exercise => (
      <SimpleFitnessItem key={exercise.exercise} exercise={exercise} />
    ))}
  </div>
}