import type { CalanderProps } from './Calander';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import DateUtil from '@utils/DateUtil';
import Calender from './Calander';

const { year, month, date } = DateUtil.takeYearMonthDate()

const meta = {
  title: 'Calander',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    endDate: {
      control: 'number',
    },
    startDate: {
      control: 'number',
    },
    value: {
      control: 'text'
    }
  },
  args: {
    value: `${year}-${month}-${date}`,
    onChange: fn()
  } as Partial<CalanderProps>,
  component: Calender
} satisfies Meta<typeof Calender>;

type Story = StoryObj<typeof meta>;
export default meta

export const DateCalanderType: Story = {
  args: {
    mode: 'date'
  }
}

export const MonthCalanderType: Story = {
  args: {
    mode: 'month'
  }
}

export const YearCalanderType: Story = {
  args: {
    mode: 'year'
  }
}