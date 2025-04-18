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
    hasSetChange: fn(),
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
    setId: 1,
  }
}

export const ReadOnly: Story = {
  args: {
    index: 1,
    readonly: true,
    setId: 1,
  }
}
