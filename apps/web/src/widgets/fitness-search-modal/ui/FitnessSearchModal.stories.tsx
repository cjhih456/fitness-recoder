import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@heroui/react';
import { fn } from '@storybook/test';
import { useFitnessSearchModalAction } from '@shared/hooks/fitness-search-modal';
import FitnessSearchModal from './FitnessSearchModal'

const meta = {
  title: 'Fitness/FitnessSearchModal',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  component: FitnessSearchModal,
  decorators: [
    (Story, options) => {
      const openAction = useFitnessSearchModalAction()
      return <div className="grid min-w-[320px] h-[500px] overflow-hiden">
        <Button onPress={() => openAction({ type: true })?.then(fn)}>Open</Button>
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