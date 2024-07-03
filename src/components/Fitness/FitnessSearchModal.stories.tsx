import type { Meta, StoryObj } from '@storybook/react';
import FitnessSearchModal, { FitnessSearchModalProps } from './FitnessSearchModal'
import { useState } from 'react';
import { Button } from '@nextui-org/react';

const meta = {
  title: 'Fitness/FitnessSearchModal',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  args: {} as Partial<FitnessSearchModalProps>,
  component: FitnessSearchModal,
  decorators: [
    (Story, options) => {
      const [isOpen, changeState] = useState(false)
      Object.assign(options.args, { isOpen: isOpen, onOpenChange: changeState })

      return <div className="grid min-w-[320px] h-[500px] overflow-hiden">
        <Button onClick={() => changeState(true)}>Open</Button>
        <Story {...options} />
      </div>
    }
  ]
} satisfies Meta<typeof FitnessSearchModal>;

type Story = StoryObj<typeof meta>;
export default meta

export const Display: Story = {
  args: {}
}