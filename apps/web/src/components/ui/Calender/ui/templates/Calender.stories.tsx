import type { CalenderProps } from '../types';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import DateService from '@ui/Calender/model/DateService';
import Calender from './Calender';

const todayDateValue = DateService.takeTodayDateValue()

const meta = {
  title: 'Calander',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    dateRange: {
      control: 'range'
    },
    value: {
      control: 'text'
    }
  },
  args: {
    value: todayDateValue,
    onChange: fn()
  } as Partial<CalenderProps>,
  component: Calender
} satisfies Meta<typeof Calender>;

type Story = StoryObj<typeof meta>;
export default meta

export const DateCalanderType: Story = {
  args: {
    defaultMode: 'date'
  }
}

export const MonthCalanderType: Story = {
  args: {
    defaultMode: 'month'
  }
}

export const YearCalanderType: Story = {
  args: {
    defaultMode: 'year'
  }
}