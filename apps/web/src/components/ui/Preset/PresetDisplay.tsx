import { Button } from '@heroui/react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useExercisePresetWithListFragment } from '@hooks/apollo/ExercisePreset';
import usePresetMenu from '@hooks/usePresetMenu';
import MenuableAccordion from '@ui/CustomComponent/MenuableAccordion';
import SimpleFitnessList from '@ui/Fitness/SimpleFitnessList';

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

  const presetMenu = usePresetMenu(presetId)

  return <MenuableAccordion menu={presetMenu}>
    {() => ({
      title: <>
        <h3 className="font-medium text-xl mb-2">{presetName}</h3>
        <p className="text-gray-600 text-sm">
          {exerciseList.length} exercises
        </p>
      </>,
      content: <div role="grid" className="flex flex-col gap-y-2">
        <SimpleFitnessList exerciseDataList={exerciseList} />
        <Button role="button" onPress={() => gotoDetail()}>{t('detail')}</Button>
      </div>
    })}
  </MenuableAccordion>
}