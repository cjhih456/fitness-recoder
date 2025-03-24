import { Button, ScrollShadow } from '@heroui/react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useCreateExercisePreset, useGetExercisePresetWithListByOffset } from '@hooks/apollo/ExercisePreset';
import useSpinner from '@hooks/useSpinner';
import useBottomNavi from '@provider/BottomNavi/hooks/useBottomNavi';
import useHeaderHandler from '@provider/Header/hooks/useHeaderHandler';
import PresetDisplay from '@ui/Preset/PresetDisplay';
import PresetNameInputDialog from '@ui/Preset/PresetNameInputDialog';

export default function PresetListPage() {
  const { t } = useTranslation(['preset', 'title', 'common'])
  useBottomNavi()
  useHeaderHandler([t('title:preset')])

  const navigator = useNavigate()

  const [createExercisePreset] = useCreateExercisePreset()
  function hasInputNewName(open: boolean, presetName?: string) {
    if (!open || !presetName) return
    createExercisePreset({ variables: { exercisePreset: { name: presetName } } }).then((result) => {
      if (result.data) {
        navigator(`/preset/${result.data?.createExercisePreset.id}`)
      }
    })
  }

  const { data: presetListData, fetchMore, hasNext } = useGetExercisePresetWithListByOffset(0, 20)
  const presetList = presetListData.getExercisePresetWithListByOffset

  const [spinner] = useSpinner({
    visible: hasNext,
    loadMore: fetchMore
  })

  return <div className="pt-4 px-4 flex flex-col gap-y-4">
    <div>
      <PresetNameInputDialog onChange={hasInputNewName}>
        {(openFn) => <div className='grid'>
          <Button onPress={openFn} size="lg">{t('actionBtn.create')}</Button>
        </div>
        }
      </PresetNameInputDialog>
    </div>
    <ScrollShadow>
      <div className='flex flex-col gap-y-3 flex-nowrap'>
        {presetList.map(preset => <PresetDisplay key={`preset-${preset.id}`} presetId={preset.id} />)}
        {spinner}
      </div>
    </ScrollShadow>

  </div>
}