import { Button } from '@nextui-org/react'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import FitnessListEditor from '@components/Fitness/FitnessListEditor'
import { useGetExerciseListByExercisePresetId } from '@hooks/apollo/Exercise'
import useExercisePresetFragment from '@hooks/apollo/Fragments/useExercisePresetFragment'
import useUpdateExerciseListByExercisePreset from '@hooks/apollo/mixed/useUpdateExerciseListByExercisePreset'
import useHeaderHandler from '@hooks/provider/Header/useHeaderHandler'
import useHeaderMenuHandler from '@hooks/provider/Header/useHeaderMenuHandler'
import usePresetMenu from '@hooks/usePresetMenu/usePresetMenu'

export default function PresetDetailPage() {
  const params = useParams()
  const navigate = useNavigate()
  const { t } = useTranslation(['preset', 'common'])
  const id = useMemo(() => Number(params.id), [params])
  const [exercisePreset] = useExercisePresetFragment(id)
  const { data: exerciseIdxListData } = useGetExerciseListByExercisePresetId(id)
  const exerciseIdxList = useMemo(() => exerciseIdxListData?.getExerciseListByExercisePresetId || [], [exerciseIdxListData])

  const updateExerciseList = useUpdateExerciseListByExercisePreset()
  const [newExerciseList, changeNewExerciseList] = useState<number[]>([])
  const oldExerciseList = useMemo(() => exerciseIdxList.map(v => v.exercise), [exerciseIdxList])

  const header = useMemo(() => {
    return [exercisePreset?.name]
  }, [exercisePreset])
  const headerMenu = usePresetMenu(id)

  useHeaderHandler(header)
  useHeaderMenuHandler(headerMenu)
  function savePreset() {
    if (!id) return
    updateExerciseList(id, exerciseIdxList, newExerciseList).finally(() => {
      navigate('/preset')
    })
  }
  return <div>
    <FitnessListEditor
      savedIdxData={oldExerciseList}
      exerciseIdxList={newExerciseList}
      onChangeExerciseIdxList={changeNewExerciseList}>
      <Button onClick={savePreset}>{t('actionBtn.save')}</Button>
    </FitnessListEditor>
  </div>
}