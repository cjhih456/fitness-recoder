import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetExerciseListByExercisePresetId } from '@hooks/apollo/Exercise'
import { useExercisePresetFragment } from '@hooks/apollo/ExercisePreset'
import useUpdateExerciseListByExercisePreset from '@hooks/apollo/mixed/useUpdateExerciseListByExercisePreset'
import usePresetMenu from '@hooks/usePresetMenu/usePresetMenu'
import useHeaderHandler from '@provider/Header/hooks/useHeaderHandler'
import useHeaderMenuHandler from '@provider/Header/hooks/useHeaderMenuHandler'
import FitnessListEditor from '@ui/Fitness/FitnessListEditor'

export default function PresetDetailPage() {
  const params = useParams()
  const navigate = useNavigate()
  const { t } = useTranslation(['preset', 'common'])
  const id = useMemo(() => Number(params.id), [params])
  const exercisePreset = useExercisePresetFragment(id)
  const { data: exerciseIdxListData } = useGetExerciseListByExercisePresetId(id)
  const exerciseList = useMemo(() => exerciseIdxListData?.getExerciseListByExercisePresetId || [], [exerciseIdxListData])

  const updateExerciseList = useUpdateExerciseListByExercisePreset()
  const oldExerciseList = useMemo(() => exerciseList.map(v => v.exercise), [exerciseList])

  const headerMenu = usePresetMenu(id)

  useHeaderHandler([exercisePreset.name])
  useHeaderMenuHandler(headerMenu)
  function savePreset(exerciseIdxList: number[]) {
    if (!id) return
    updateExerciseList(id, exerciseList, exerciseIdxList).finally(() => {
      navigate('/preset')
    })
  }
  return <div>
    <FitnessListEditor
      savedIdxData={oldExerciseList}
      saveBtnText={t('actionBtn.save')}
      onSaveAction={savePreset}
    />
  </div>
}