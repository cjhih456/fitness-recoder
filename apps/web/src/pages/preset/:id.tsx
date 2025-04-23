import { useMemo, useLayoutEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetExercisePresetWithListById } from '@entities/exercisePreset/api'
import FitnessListEditor from '@entities/fitness/ui/FitnessListEditor'
import { useUpdateExerciseListByExercisePreset } from '@features/exercise/api'
import { useHeaderMenuSetValue, useHeaderSetValue } from '@shared/hooks/header'
import { usePresetMenu } from '@widgets/exercise-preset-menu/hooks'

export default function PresetDetailPage() {
  const params = useParams()
  const navigate = useNavigate()
  const { t } = useTranslation(['preset', 'common'])
  const id = useMemo(() => Number(params.id), [params])
  const { data } = useGetExercisePresetWithListById(id)
  const exercisePreset = data.getExercisePresetWithListById
  const exerciseList = exercisePreset.exerciseList ?? []
  const oldExerciseList = exerciseList.map(v => v.fitnessId)

  const updateExerciseList = useUpdateExerciseListByExercisePreset()

  const presetMenu = usePresetMenu()
  const setHeader = useHeaderSetValue()
  const setHeaderMenu = useHeaderMenuSetValue()
  useLayoutEffect(() => {
    setHeader(exercisePreset.name)
    setHeaderMenu(presetMenu(id))
  }, [exercisePreset.name, id, presetMenu, setHeader, setHeaderMenu])
  function savePreset(exerciseIdxList: number[]) {
    if (!id) return
    updateExerciseList(id, exerciseList, exerciseIdxList).finally(() => {
      navigate('/preset')
    })
  }
  return <main>
    <FitnessListEditor
      fitnessIds={oldExerciseList}
      saveBtnText={t('actionBtn.save')}
      onSaveAction={savePreset}
    />
  </main>
}