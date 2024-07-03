import type { Meta, StoryObj } from '@storybook/react';
import FitnessListSearch, { FitnessListSearchProps } from './FitnessListSearch'
import { MdHome } from 'react-icons/md';
import { Button } from '@nextui-org/react';

const meta = {
  title: 'Fitness/FitnessListSearch',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  args: {} as Partial<FitnessListSearchProps>,
  component: FitnessListSearch,
  decorators: [
    (Story) => {
      return <div className="grid min-w-[320px] h-[500px] overflow-hiden">
        <Story />
      </div>
    }
  ]
} satisfies Meta<typeof FitnessListSearch>;

type Story = StoryObj<typeof meta>;
export default meta

export const Display: Story = {
  args: {
    selectedList: [1],
  }
}
export const NeedSpace: Story = {
  args: {
    needSpace: true,

  }
}

export const Prefix: Story = {
  args: {
    searchPrefix: (<div><Button isIconOnly><MdHome /></Button></div>),
  }
}
