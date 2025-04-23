import type { SetListEditorProps } from './SetListEditor';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import SetListEditor from './SetListEditor';
const meta = {
  title: 'Sets/SetListEditor',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    actions: {
      argTypesRegex: '^(has).*'
    }
  },
  args: {
    hasDoneLastSet: fn()
  } as Partial<SetListEditorProps>,
  component: SetListEditor,
  decorators: [
    (Story, options) => {
      return <div>
        < Story {...options} />
      </div >
    }
  ]
} satisfies Meta<typeof SetListEditor>

type Story = StoryObj<typeof meta>;
export default meta

export const CustomAble: Story = {
  args: {
    exerciseDataId: 1,
    readonly: false
  }
}

export const ReadOnly: Story = {
  args: {
    exerciseDataId: 1,
    readonly: true
  }
}
