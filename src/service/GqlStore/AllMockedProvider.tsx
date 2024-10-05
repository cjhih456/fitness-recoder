import { MockedProvider } from '@apollo/client/testing';
import { CreateExerciseByExercisePresetMock } from './Exercise/CreateExerciseByExercisePreset';
import { CreateExerciseByScheduleMock } from './Exercise/CreateExerciseBySchedule';
import { DeleteExerciseByIdMock } from './Exercise/DeleteExerciseById';
import { GetExerciseListByExercisePresetIdMock } from './Exercise/GetExerciseListByExercisePresetId';
import { GetExerciseFinishHistoryMock } from './Exercise/GetExerciseFinishHistory';
import { GetExerciseListByScheduleIdMock } from './Exercise/GetExerciseListByScheduleId';
import { GetExercisePresetByIdMock } from './ExercisePreset/GetExercisePresetById';
import { GetExercisePresetListMock } from './ExercisePreset/GetExercisePresetList';
import { GetScheduleByDateMock } from './Schedule/GetScheduleByDate';
import { GetScheduleByIdMock } from './Schedule/GetScheduleById';
import { GetScheduleStateByDateMock } from './Schedule/GetScheduleStatusByDate';
import { GetSetListByExerciseIdMock } from './Set/GetSetListByExerciseId';
import { DeleteScheduleMock } from './Schedule/DeleteSchedule';
import { UpdateExerciseListByExercisePresetIdMock } from './Exercise/UpdateExerciseListByExercisePresetId';
import { UpdateExerciseListByScheduleIdMock } from './Exercise/UpdateExerciseListByScheduleId';
import { UpdateScheduleMock } from './Schedule/UpdateSchedule';
import { CreateScheduleMock } from './Schedule/CreateSchedule';
import { CreateSetMock } from './Set/CreateSet';
import { UpdateSetMock } from './Set/UpdateSet';
import { DeleteSetMock } from './Set/DeleteSet';
import { CreateExercisePresetMock } from './ExercisePreset/CreateExercisePreset';

export default function AllMockedProvider({ children }: { children: React.ReactNode }) {
  const tempMocks = [
    CreateExerciseByExercisePresetMock,
    CreateExerciseByScheduleMock,
    GetExerciseListByExercisePresetIdMock,
    GetExerciseFinishHistoryMock,
    GetExerciseListByScheduleIdMock,
    UpdateExerciseListByExercisePresetIdMock,
    UpdateExerciseListByScheduleIdMock,
    DeleteExerciseByIdMock,

    CreateExercisePresetMock,
    GetExercisePresetByIdMock,
    GetExercisePresetListMock,

    CreateScheduleMock,
    GetScheduleByDateMock,
    GetScheduleByIdMock,
    GetScheduleStateByDateMock,
    UpdateScheduleMock,
    DeleteScheduleMock,

    CreateSetMock,
    GetSetListByExerciseIdMock,
    UpdateSetMock,
    DeleteSetMock
  ].map(v => {
    v.variableMatcher = v.variableMatcher ? v.variableMatcher : () => true
    return v
  })
  return <MockedProvider mocks={tempMocks}>
    {children}
  </MockedProvider>
}