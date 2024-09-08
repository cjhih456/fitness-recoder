import SimpleFitnessItem from './SimpleFitnessItem'

export interface SimpleFitnessListProps {
  exerciseDataList: ExerciseData[]
}

export default function SimpleFitnessList({ exerciseDataList }: SimpleFitnessListProps) {
  return <div className="flex flex-col gap-y-2">
    {exerciseDataList.map(exerciseData => (
      <SimpleFitnessItem key={exerciseData.id} exerciseData={exerciseData} />
    ))}
  </div>
}