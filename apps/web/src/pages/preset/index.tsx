import { Button, ScrollShadow } from '@heroui/react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useCreateExercisePreset, useGetExercisePresetWithListByOffset } from '@entities/exercisePreset/api';
import PresetDisplay from '@entities/exercisePreset/ui/PresetDisplay';
import PresetNameInputDialog from '@entities/exercisePreset/ui/PresetNameInputDialog';
import useSpinner from '@shared/hooks/useSpinner';
import MenuableAccordion from '@shared/ui/MenuableAccordion';
import { useBottomNavi } from '@widgets/bottomNavi';
import { useHeaderHandler } from '@widgets/header';

export default function PresetListPage() {
  const { t } = useTranslation(['preset', 'title', 'common'])
  useBottomNavi()
  useHeaderHandler(t('title:preset'))

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

  return <main className="pt-4 px-4 flex flex-col gap-y-4">
    <figure role="create area">
      <PresetNameInputDialog onChange={hasInputNewName}>
        {(openFn) => <div className='grid'>
          <Button onPress={openFn} size="lg">{t('actionBtn.create')}</Button>
        </div>
        }
      </PresetNameInputDialog>
    </figure>
    <ScrollShadow>
      <figcaption role="" className='flex flex-col gap-y-3 flex-nowrap'>
        <MenuableAccordion.GroupProvider>
          {presetList.map(preset => <PresetDisplay key={`preset-${preset.id}`} presetId={preset.id} />)}
        </MenuableAccordion.GroupProvider>
        {spinner}
      </figcaption>
    </ScrollShadow>

  </main>
}