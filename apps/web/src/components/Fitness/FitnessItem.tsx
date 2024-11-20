import { Card, CardBody, Chip } from '@nextui-org/react';
import { MdCheck } from 'react-icons/md';
import { FitnessListSelectedProps } from './FitnessList';
import { getExerciseByIdx } from '../../service/Fitness/FitnessDatas';
import { useMemo } from 'react';

export interface FitnessItemProps {
  selectedExercise: FitnessListSelectedProps
  useSelect?: boolean
  onClick?: (_exercise: FitnessListSelectedProps, _selected: boolean, _isDetail: boolean) => void
}
export default function FitnessItem({ selectedExercise, onClick, useSelect }: FitnessItemProps) {
  const exerciseData = useMemo(() => {
    return getExerciseByIdx(selectedExercise.idx)
  }, [selectedExercise])
  return <Card className="fitness-item scroll-mb-4 snap-start">
    <CardBody className="flex flex-row">
      <div className="flex-[100px] flex-grow-0 flex-shrink-0" onClick={() => {
        onClick && onClick(selectedExercise, !selectedExercise.selected, true)
      }}>
        {/* TODO: add image files */}
      </div>
      <div className="flex flex-col flex-1 gap-y-2" onClick={() => {
        onClick && onClick(selectedExercise, !selectedExercise.selected, false)
      }}>
        <h3 className="font-semibold"><span>{exerciseData.name}</span> {
          useSelect && <span className="inline-block" >
            {selectedExercise.selected && <div className="flex justify-center items-center w-[16px] h-[16px] rounded-full bg-primary text-white"><MdCheck size="0.75rem"></MdCheck></div>}
          </span>
        }</h3>
        <div>
          {exerciseData.category}
        </div>
        <div className="flex gap-1 flex-wrap">
          {exerciseData.primaryMuscles.map((muscle) => {
            return <Chip size='sm' key={muscle}>{muscle}</Chip>
          })}
          {exerciseData.secondaryMuscles.map((muscle) => {
            return <Chip size='sm' key={muscle}>{muscle}</Chip>
          })}
        </div>
      </div>
    </CardBody>
  </Card >
}
