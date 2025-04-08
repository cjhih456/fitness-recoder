export interface DateValue {
  year: number
  month: number
  date: number
}

export interface DateRange {
  startDate: DateValue
  endDate: DateValue
}

export type DateCheckRange = 'date' | 'month' | 'year';