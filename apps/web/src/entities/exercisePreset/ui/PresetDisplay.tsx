import type { Exercise } from '@fitness/struct';
import type { MenuType } from '@shared/model/menuType';
import type { ReactNode } from 'react';
import { Button } from '@heroui/react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useExercisePresetWithListFragment } from '@entities/exercisePreset/api';
import MenuableAccordion from '@shared/ui/MenuableAccordion';

type PresetDisplayChildrenProps = {
  exerciseDatas: Exercise.Data[]
}

interface PresetDisplayProps {
  presetId: number,
  menu?: MenuType[]
  children: (_: PresetDisplayChildrenProps) => ReactNode
}

export default function PresetDisplay({ presetId, menu, children }: PresetDisplayProps) {
  const navigate = useNavigate()
  function gotoDetail() {
    navigate(`/preset/${presetId}`)
  }
  const { t } = useTranslation(['common', 'preset'])

  const preset = useExercisePresetWithListFragment(presetId)
  const exerciseList = preset.exerciseList || []

  return <MenuableAccordion.GroupContent menu={menu} openId={presetId}>
    {{
      title: <>
        <h3 className="font-medium text-xl mb-2">{preset.name}</h3>
        <p className="text-gray-600 text-sm">
          {exerciseList.length} exercises
        </p>
      </>,
      content: <div role="grid" className="flex flex-col gap-y-2">
        {children({ exerciseDatas: exerciseList })}
        <Button role="button" onPress={() => gotoDetail()}>{t('detail')}</Button>
      </div>
    }}
  </MenuableAccordion.GroupContent>
}