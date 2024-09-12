import { useEffect, useState } from 'react';
import ScheduleDisplay from '../../components/Schedule/ScheduleDisplay';
import { Button } from '@nextui-org/react';
import PresetNameInputDialog from '../../components/Preset/PresetNameInputDialog';
import { useNavigate } from 'react-router-dom';
import { useCreateExercisePreset, useLazyGetExercisePresetList } from '../../service/GqlStore/ExercisePreset';

export default function PresetListPage() {
  const [createExercisePreset] = useCreateExercisePreset()
  const [getExerciseList] = useLazyGetExercisePresetList()
  const navigator = useNavigate()
  const [presetList, setPresetList] = useState<ExercisePresetWithExerciseList[]>([])
  useEffect(() => {
    getExerciseList({
      variables: {
        page: 1,
        size: 20
      }
    }).then((result) => {
      if (result.data) {
        setPresetList(result.data?.getExercisePresetList)
      }
    })
  }, [])
  function hasInputNewName(open: boolean, presetName?: string) {
    if (!open || !presetName) return
    createExercisePreset({ variables: { exercisePreset: { name: presetName } } }).then((result) => {
      if (result.data) {
        navigator(`/preset/${result.data?.createExercisePreset.id}`)
      }
    })
  }
  function gotoDetail(id: number) {
    navigator(`/preset/${id}`)
  }
  return <div className="pt-16 px-4">
    {presetList.map(preset => <ScheduleDisplay key={preset.id} id={preset.id} title={preset.name} exerciseList={preset.exerciseList}>
      {(id: number) => <div>
        <Button onClick={() => gotoDetail(id)}>Detail</Button>
      </div>}
    </ScheduleDisplay>)}
    <div>
      <PresetNameInputDialog onChange={hasInputNewName}>
        {(openFn) => <div className='absolute bottom-4 w-full left-4 right-4'>
          <Button onClick={openFn}>Create</Button>
        </div>
        }
      </PresetNameInputDialog>
    </div>

  </div>
}