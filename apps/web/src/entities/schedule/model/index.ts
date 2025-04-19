import type { StoreObject } from '@apollo/client'
import type { Schedule } from '@fitness/struct'

type ScheduleIType = Schedule.IType

export type ScheduleStoreType = Schedule.Data & StoreObject

export type GetScheduleByDateResponse = { getScheduleByDate: ScheduleStoreType[] }
export type GetScheduleByDateVariable = { year: number, month: number, date: number }

export type GetScheduleByIdResponse = { getScheduleById: ScheduleStoreType }
export type GetScheduleByIdVariable = { id: number }

export type GetScheduleStatusByMonthResponse = { getScheduleStatusByMonth: ScheduleIType[][] }
export type GetScheduleStatusByMonthVariable = { year: number, month: number }
