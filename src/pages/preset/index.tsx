import { useMemo } from 'react';
import ScheduleDisplay from '../../components/Schedule/ScheduleDisplay';
import { useSchedulePresetStore } from '../../service/Store/SchedulePresetStore';

export default function PresetListPage() {
  const schedulePresetStore = useSchedulePresetStore()
  const presetList = useMemo(() => {
    return schedulePresetStore.getSchedulePresetList()
  }, [schedulePresetStore])
  return <div>
    {presetList.map(preset => <ScheduleDisplay key={preset.id} id={preset.id} title={preset.name} >
    </ScheduleDisplay>)}
  </div>
}