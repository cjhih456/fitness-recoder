export const ExercisePresetMockData: { [key: number]: ExercisePresetWithListStoreType } = Array(20).fill(0).reduce((acc, _cur, i) => {
  const id = i + 1
  acc[id] = {
    id: id,
    name: `TestPreset - ${id}`,
    deps: 0,
    exerciseList: [],
    __typename: 'ExercisePreset'
  } as ExercisePresetWithListStoreType
  return acc
}, {})
