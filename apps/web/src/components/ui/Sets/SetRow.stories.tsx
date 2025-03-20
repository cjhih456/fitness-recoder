import type { SetRowProps } from './SetRow'
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import SetRow from './SetRow';
const meta = {
  title: 'Sets/SetRow',
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
    readonly: false,
    set: {
      exerciseId: 1,
      id: 1,
      isDone: false,
      weightUnit: 'kg',
      repeat: 10,
      weight: 20
    }
  }
}

export const ReadOnly: Story = {
  args: {
    index: 1,
    readonly: true,
    set: {
      exerciseId: 1,
      id: 1,
      isDone: false,
      weightUnit: 'kg',
      repeat: 10,
      weight: 20
    },
  }
}
