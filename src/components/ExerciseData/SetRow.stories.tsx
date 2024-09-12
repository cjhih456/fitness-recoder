import type { Meta, StoryObj } from '@storybook/react';
import SetRow, { SetRowProps } from './SetRow';
import { fn } from '@storybook/test';
const meta = {
  title: 'ExerciseData/SetRow',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    hasDoneChange: fn(),
    onRemoveSet: fn()
  } as Partial<SetRowProps>,
  component: SetRow,
  decorators: [
    (Story, options) => {
      return <div>
        < Story {...options} />
      </div >
    }
  ]
} satisfies Meta<typeof SetRow>

type Story = StoryObj<typeof meta>;
export default meta

export const CustomAble: Story = {
  args: {
    index: 1,
    readonly: false
  }
}

export const ReadOnly: Story = {
  args: {
    index: 1,
    readonly: true
  }
}
