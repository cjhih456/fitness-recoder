import { Button, ScrollShadow } from '@nextui-org/react';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useCreateExercisePreset, useGetExercisePresetWithListList } from '@hooks/apollo/ExercisePreset';
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

  const { data: presetListData, fetchMore, loading } = useGetExercisePresetWithListList(0, 20)
  const presetList = useMemo(() => presetListData?.getExercisePresetWithListList || [], [presetListData])
  const loadMore = useCallback(() => {
    fetchMore({ variables: { offset: presetList.length } })
  }, [fetchMore, presetList])

  const [spinner] = useSpinner(presetList.length, loading, loadMore)

  return <div className="pt-4 px-4 flex flex-col gap-y-4">
    <div>
      <PresetNameInputDialog onChange={hasInputNewName}>
        {(openFn) => <div className='grid'>
          <Button onClick={openFn} size="lg">{t('actionBtn.create')}</Button>
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