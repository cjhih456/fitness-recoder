import { memo, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExercisePreset } from 'fitness-struct';
import { Button } from '@nextui-org/react';
import { useTranslation } from 'react-i18next';
import SimpleFitnessList from '../Fitness/SimpleFitnessList';
import MenuableAccordion from '../CustomComponent/MenuableAccordion';
import usePresetMenu from '../../hooks/usePreset/usePresetMenu';

interface PresetDisplayProps {
  preset: ExercisePreset.PresetWithExerciseList
}

export default memo(function PresetDisplay({
  preset
}: PresetDisplayProps) {
  const navigate = useNavigate()
  function gotoDetail() {
    navigate(`/preset/${preset.id}`)
  }
  const { t } = useTranslation(['common', 'preset'])

  const presetName = useMemo(() => preset.name, [preset])
  const exerciseList = useMemo(() => preset.exerciseList || [], [preset])
  const exerciseListCount = useMemo(() => exerciseList.length || 0, [exerciseList])

  const presetMenu = usePresetMenu(preset.id)
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
})