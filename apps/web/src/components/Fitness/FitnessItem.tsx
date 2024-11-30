import { Card, CardBody, Chip } from '@nextui-org/react';
import { MdCheck } from 'react-icons/md';
import { Exercise } from 'fitness-struct';

export interface FitnessItemProps {
  fitnessData: Exercise.IFitness
  isSelected?: boolean
  useSelect?: boolean
  onClick?: (_exercise: number, _isDetail: boolean) => void
}
export default function FitnessItem({ fitnessData, isSelected, onClick, useSelect }: FitnessItemProps) {
  return <Card className="fitness-item scroll-mb-4 snap-start">
    <CardBody className="flex flex-row">
      <div role="img" className="flex-[100px] flex-grow-0 flex-shrink-0" onClick={() => {
        onClick && onClick(fitnessData.id, true)
      }}>
        {/* TODO: add image files */}
      </div>
      <div role="contentinfo" className="flex flex-col flex-1 gap-y-2" onClick={() => {
        onClick && onClick(fitnessData.id, false)
      }}>
        <h3 className="font-semibold"><span>{fitnessData.name}</span> {
          useSelect && <span className="inline-block" >
            {isSelected && <div className="flex justify-center items-center w-[16px] h-[16px] rounded-full bg-primary text-white"><MdCheck size="0.75rem"></MdCheck></div>}
          </span>
        }</h3>
        <div>
          {fitnessData.category}
        </div>
        <div className="flex gap-1 flex-wrap">
          {fitnessData.primaryMuscles.map((muscle) => {
            return <Chip size='sm' key={muscle}>{muscle}</Chip>
          })}
          {fitnessData.secondaryMuscles.map((muscle) => {
            return <Chip size='sm' key={muscle}>{muscle}</Chip>
          })}
        </div>
      </div>
    </CardBody>
  </Card >
}
