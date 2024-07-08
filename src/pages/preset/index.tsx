import { useMemo } from 'react';
import ScheduleDisplay from '../../components/Schedule/ScheduleDisplay';
import { useSchedulePresetStore } from '../../service/Store/SchedulePresetStore';
import { Button } from '@nextui-org/react';
import PresetNameInputDialog from '../../components/Preset/PresetNameInputDialog';
import { useNavigate } from 'react-router-dom';

export default function PresetListPage() {
  const schedulePresetStore = useSchedulePresetStore()
  const navigator = useNavigate()
  const presetList = useMemo(() => {
    return schedulePresetStore.getSchedulePresetList()
  }, [schedulePresetStore])

  function hasInputNewName(open: boolean, presetName?: string) {
    if (!open || !presetName) return
    const id = schedulePresetStore.createSchedulePreset(presetName)
    navigator(`/preset/${id}`)
  }
  function gotoDetail(id: string) {
    navigator(`/preset/${id}`)

  }
  return <div className="pt-16 px-4">
    {presetList.map(preset => <ScheduleDisplay key={preset.id} id={preset.id} title={preset.name} exerciseList={preset.exerciseList}>
      {(id: string) => <div>
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