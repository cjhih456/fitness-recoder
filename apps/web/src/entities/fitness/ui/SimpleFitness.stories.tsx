import type { SimpleFitnessProps } from './SimpleFitness'
import type { Meta, StoryObj } from '@storybook/react';
import SetState from '@features/set/ui/SetState';
import SimpleFitness from './SimpleFitness'

const meta = {
  title: 'Fitness/SimpleFitness',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  args: {} as Partial<SimpleFitnessProps>,
  component: SimpleFitness,
  decorators: [
    (Story) => {
      return <div className="grid min-w-[320px] h-[500px] overflow-hiden">
        <Story />
      </div>
    }
  ]
} satisfies Meta<typeof SimpleFitness>;

type Story = StoryObj<typeof meta>;
export default meta

export const Display: Story = {
  args: {
    fitnessId: 1,
    children: <SetState exerciseDataId={1} />
  }
}