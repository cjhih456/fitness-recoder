import { Card, CardBody, Chip } from '@heroui/react';
import { MdCheck } from 'react-icons/md';
import { useFitnessSimpleFragment } from '@hooks/apollo/Fitness';
import StateRender from '@shared/ui/StateRender';

export interface FitnessItemProps {
  fitnessId: number
  isSelected?: boolean
  onClick?: (_exercise: number, _isDetail: boolean) => void
}
export default function FitnessItem({
  fitnessId,
  isSelected = false,
  onClick
}: FitnessItemProps) {
  const fitness = useFitnessSimpleFragment(fitnessId)

  return <Card className="fitness-item scroll-mb-4 snap-start">
    <CardBody className="flex flex-row">
      <div role="img" className="flex-[100px] flex-grow-0 flex-shrink-0" onClick={() => {
        onClick && onClick(fitnessId, true)
      }}>
        {/* TODO: add image files */}
      </div>
      <div role="contentinfo" className="flex flex-col flex-1 gap-y-2" onClick={() => {
        onClick && onClick(fitnessId, false)
      }}>
        <h3 className="font-semibold">
          <span>{fitness.name}</span>
          <StateRender.Boolean
            state={isSelected}
            render={{
              true: () => <span className="inline-block" >
                <div className="flex justify-center items-center w-[16px] h-[16px] rounded-full bg-primary text-white">
                  <MdCheck size="0.75rem"></MdCheck>
                </div>
              </span>
            }}
          /></h3>
        <div>
          {fitness.category}
        </div>
        <div className="flex gap-1 flex-wrap">
          {fitness.primaryMuscles.map((muscle) => {
            return <Chip size='sm' key={muscle}>{muscle}</Chip>
          })}
          {fitness.secondaryMuscles.map((muscle) => {
            return <Chip size='sm' key={muscle}>{muscle}</Chip>
          })}
        </div>
      </div>
    </CardBody>
  </Card >
}
