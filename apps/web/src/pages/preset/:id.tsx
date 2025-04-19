import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetExercisePresetWithListById } from '@entities/exercisePreset/api'
import { usePresetMenu } from '@entities/exercisePreset/hooks'
import FitnessListEditor from '@entities/fitness/ui/FitnessListEditor'
import { useUpdateExerciseListByExercisePreset } from '@features/exercise/api'
import { useHeaderHandler, useHeaderMenuHandler } from '@widgets/header'

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