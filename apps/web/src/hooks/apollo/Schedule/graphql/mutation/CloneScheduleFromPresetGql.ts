import { gql } from '@apollo/client';

const CloneScheduleFromPresetGql = gql`
mutation CloneScheduleFromPreset($presetId: Int!, $targetDate: TargetDateInput) {
  cloneScheduleFromPreset(presetId: $presetId, targetDate: $targetDate) {
    ...ScheduleSimple
  }
}`
export default CloneScheduleFromPresetGql