import FitnessItem from './FitnessItem';

interface FitnessListProps {
  list: IExercise[]
}

export default function FitnessList({ list }: FitnessListProps) {
  return (
    <div className="flex flex-col gap-y-4 pt-4">
      {list.map(exercise => (
        <FitnessItem key={exercise.name} exercise={exercise}></FitnessItem>
      ))}
    </div>
  );
}