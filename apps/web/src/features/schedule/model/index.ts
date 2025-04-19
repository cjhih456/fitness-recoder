import type { ScheduleStoreType } from '@entities/schedule/model'
import type { Schedule } from '@fitness/struct'

type ScheduleCreate = Schedule.CreateType

export type CloneScheduleResponse = { cloneSchedule: ScheduleStoreType }
export type CloneScheduleVariable = { id: number, targetDate: { year: number, month: number, date: number } }

export type CloneScheduleFromPresetResponse = { cloneScheduleFromPreset: ScheduleStoreType }
export type CloneScheduleFromPresetVariable = { presetId: number, targetDate: { year: number, month: number, date: number } }

export type CreateScheduleResponse = { createSchedule: ScheduleStoreType }
export type CreateScheduleVariable = { createSchedule: ScheduleCreate }

export type UpdateScheduleResponse = { updateSchedule: ScheduleStoreType }
export type UpdateScheduleVariable = { updateSchedule: ScheduleStoreType }

export type DeleteScheduleResponse = { deleteSchedule: string }
export type DeleteScheduleVariable = { id: number }