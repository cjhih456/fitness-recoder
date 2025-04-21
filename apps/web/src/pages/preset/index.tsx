import { Button, ScrollShadow } from '@heroui/react';
import { useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useGetExercisePresetWithListByOffset } from '@entities/exercisePreset/api';
import PresetDisplay from '@entities/exercisePreset/ui/PresetDisplay';
import PresetNameInputDialog from '@entities/exercisePreset/ui/PresetNameInputDialog';
import SimpleFitnessList from '@entities/fitness/ui/SimpleFitnessList';
import SetState from '@entities/set/ui/SetState';
import { useCreateExercisePreset } from '@features/exercisePreset/api';
import { useHeaderSetValue } from '@shared/hooks/header';
import useSpinner from '@shared/hooks/useSpinner';
import MenuableAccordion from '@shared/ui/MenuableAccordion';
import { useBottomNavi } from '@widgets/bottomNavi';
import usePresetMenu from '@widgets/exercise-preset-menu/hooks/usePresetMenu';

export default function PresetListPage() {
  const { t } = useTranslation(['preset', 'title', 'common'])
  useBottomNavi()
  const setHeader = useHeaderSetValue()
  useLayoutEffect(() => {
    setHeader(t('title:preset'))
  }, [t, setHeader])

  const navigator = useNavigate()

  const [createExercisePreset] = useCreateExercisePreset()
  function hasInputNewName(presetName: string) {
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
  const presetMenu = usePresetMenu()

  return <main className="pt-4 px-4 flex flex-col gap-y-4">
    <figure role="create area">
      <PresetNameInputDialog.WithChild onSubmit={hasInputNewName}>
        {(openFn) => <div className='grid'>
          <Button onPress={openFn} size="lg">{t('actionBtn.create')}</Button>
        </div>
        }
      </PresetNameInputDialog.WithChild>
    </figure>
    <ScrollShadow>
      <figcaption role="" className='flex flex-col gap-y-3 flex-nowrap'>
        <MenuableAccordion.GroupProvider>
          {presetList.map(preset => <PresetDisplay key={`preset-${preset.id}`} presetId={preset.id} menu={presetMenu(preset.id)}>
            {({ exerciseDatas }) =>
              <SimpleFitnessList exerciseDataList={exerciseDatas}>
                {exerciseData => <SetState exerciseDataId={exerciseData.id} />}
              </SimpleFitnessList>}
          </PresetDisplay>)}
        </MenuableAccordion.GroupProvider>
        {spinner}
      </figcaption>
    </ScrollShadow>

  </main>
}