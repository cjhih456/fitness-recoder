import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetExercisePresetWithListById } from '@hooks/apollo/ExercisePreset'
import useUpdateExerciseListByExercisePreset from '@hooks/apollo/mixed/useUpdateExerciseListByExercisePreset'
import usePresetMenu from '@hooks/usePresetMenu/usePresetMenu'
import FitnessListEditor from '@ui/Fitness/FitnessListEditor'
import { useHeaderHandler, useHeaderMenuHandler } from '@widgets/header'

export default function PresetDetailPage() {
  const params = useParams()
  const navigate = useNavigate()
  const { t } = useTranslation(['preset', 'common'])
  const id = useMemo(() => Number(params.id), [params])
  const { data } = useGetExercisePresetWithListById(id)
  const exercisePreset = data.getExercisePresetWithListById
  const exerciseList = exercisePreset.exerciseList ?? []
  const oldExerciseList = exerciseList.map(v => v.exercise)

  const updateExerciseList = useUpdateExerciseListByExercisePreset()

  const headerMenu = usePresetMenu(id)

  useHeaderHandler(exercisePreset.name)
  useHeaderMenuHandler(headerMenu)
  function savePreset(exerciseIdxList: number[]) {
    if (!id) return
    updateExerciseList(id, exerciseList, exerciseIdxList).finally(() => {
      navigate('/preset')
    })
  }
  return <main>
    <FitnessListEditor
      savedIdxData={oldExerciseList}
      saveBtnText={t('actionBtn.save')}
      onSaveAction={savePreset}
    />
  </main>
}