import type { FitnessItemProps } from './FitnessItem';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, waitFor, within } from '@storybook/test';
import FitnessItem from './FitnessItem';

const meta = {
  title: 'Fitness/FitnessItem',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  args: {
    onClick: fn()
  } as Partial<FitnessItemProps>,
  component: FitnessItem,
  decorators: [
    (Story) => {
      return <div className="min-w-[320px]">
        <Story />
      </div>
    }
  ]
} satisfies Meta<typeof FitnessItem>;

type Story = StoryObj<typeof meta>;
export default meta

export const Display: Story = {
  args: {
    fitnessId: 1,
    isSelected: false
  },
  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement)
    await step('click image area', async () => {
      await userEvent.click(canvas.getByRole('img'))
      await waitFor(() => expect(args.onClick).toHaveBeenCalledWith(args.fitnessId, true))
    })
    await step('click content area', async () => {
      await userEvent.click(canvas.getByRole('contentinfo'))
      await waitFor(() => expect(args.onClick).toHaveBeenCalledWith(args.fitnessId, false))
    })
  }
}