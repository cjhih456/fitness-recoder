import SimpleFitnessItem from './SimpleFitnessItem'

interface SimpleFitnessListProps {
  exerciseDataIdxList: string[]
}

export default function SimpleFitnessList({ exerciseDataIdxList }: SimpleFitnessListProps) {
  return <div className="flex flex-col gap-y-2">
    {exerciseDataIdxList.map(exerciseDataIdx => (
      <SimpleFitnessItem key={exerciseDataIdx} exerciseDataIdx={exerciseDataIdx} />
    ))}
  </div>
}