import { Button } from '@nextui-org/react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import MenuableAccordion from '@components/CustomComponent/MenuableAccordion';
import SimpleFitnessList from '@components/Fitness/SimpleFitnessList';
import usePresetMenu from '@hooks/usePresetMenu';
import { useExercisePresetWithListFragment } from '@service/GqlStore/ExercisePreset';

interface PresetDisplayProps {
  presetId: number
}

export default function PresetDisplay({ presetId }: PresetDisplayProps) {
  const navigate = useNavigate()
  function gotoDetail() {
    navigate(`/preset/${presetId}`)
  }
  const { t } = useTranslation(['common', 'preset'])

  const [preset] = useExercisePresetWithListFragment(presetId)

  const presetName = useMemo(() => preset.name, [preset])
  const exerciseList = useMemo(() => preset.exerciseList || [], [preset])
  const exerciseListCount = useMemo(() => exerciseList.length || 0, [exerciseList])

  const presetMenu = usePresetMenu(presetId)
  const menuObj = useMemo(() => presetMenu, [presetMenu])

  return <MenuableAccordion menu={menuObj}>
    {() => {
      return {
        title: <>
          <h3 className="font-medium text-xl mb-2">{presetName}</h3>
          <p className="text-gray-600 text-sm">
            {exerciseListCount} exercises
          </p>
        </>,
        content: <div role="grid" className="flex flex-col gap-y-2">
          <SimpleFitnessList exerciseDataList={exerciseList} />
          <Button role="button" onClick={() => gotoDetail()}>{t('detail')}</Button>
        </div>
      }
    }}
  </MenuableAccordion>
}