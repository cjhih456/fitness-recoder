type StoreObject = import('@apollo/client').StoreObject
type OperationVariables = import('@apollo/client').OperationVariables
type Schedule = import('fitness-struct').Schedule.Schedule
type ScheduleIType = import('fitness-struct').Schedule.IType
type ScheduleCreate = import('fitness-struct').Schedule.ICreate

declare type ScheduleStoreType = Schedule & StoreObject

declare type CloneScheduleResponse = { cloneSchedule: ScheduleStoreType }
declare type CloneScheduleVariable = { id: number, targetDate: { year: number, month: number, date: number } }

declare type CloneScheduleFromPresetResponse = { cloneScheduleFromPreset: ScheduleStoreType }
declare type CloneScheduleFromPresetVariable = { presetId: number, targetDate: { year: number, month: number, date: number } }

declare type CreateScheduleResponse = { createSchedule: ScheduleStoreType }
declare type CreaetScheduleVariable = { createSchedule: ScheduleCreate }

declare type GetScheduleByDateResponse = { getScheduleByDate: ScheduleStoreType[] }
declare type GetScheduleByDateVariable = { year: number, month: number, date: number }

declare type GetScheduleByIdResponse = { getScheduleById: ScheduleStoreType }
declare type GetScheduleByIdVAriable = { id: number }

declare type GetScheduleStatusByMonthResponse = { getScheduleStatusByMonth: ScheduleIType[][] }
declare type GetScheduleStatusByMonthVariable = { year: number, month: number }

declare type UpdateScheduleResponse = { updateSchedule: ScheduleStoreType }
declare type UpdateScheduleVariable = { updateSchedule: ScheduleStoreType }

declare type DeleteScheduleResponse = { deleteSchedule: string }
declare type DeleteScheduleVariable = { id: number }