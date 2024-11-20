import { Measure } from "./measure"

export declare namespace Sets {
  interface CreateType {
    exerciseId: number
    repeat: number
    isDone: boolean
    weightUnit: keyof typeof Measure.WeightUnit
    weight?: number
    duration?: number
  }

  interface Sets extends CreateType {
    id: number
  }
}