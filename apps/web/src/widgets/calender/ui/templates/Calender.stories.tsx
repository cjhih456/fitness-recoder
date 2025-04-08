import type { CalenderProps } from '../types';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { DateService } from '@shared/lib/dateService';
import Calender from './Calender';

const todayDateValue = DateService.takeTodayDateValue()

const meta = {
  title: 'Calender',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    dateRange: {
      control: {
        type: 'object',
      }
    },
    value: {
      control: 'text'
    }
  },
  args: {
    value: todayDateValue,
    dateRange: {
      startDate: { ...todayDateValue, date: todayDateValue.date - 1 },
      endDate: { ...todayDateValue, date: todayDateValue.date + 1 }
    },
    onChange: fn()
  } as Partial<CalenderProps>,
  component: Calender
} satisfies Meta<typeof Calender>;

type Story = StoryObj<typeof meta>;
export default meta

export const DateCalenderType: Story = {
  args: {
    defaultMode: 'date'
  }
}

export const MonthCalenderType: Story = {
  args: {
    defaultMode: 'month'
  }
}

export const YearCalenderType: Story = {
  args: {
    defaultMode: 'year'
  }
}