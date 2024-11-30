import { useNavigate, useParams } from 'react-router-dom'
import { HeaderHandler, HeaderMenuHandler } from '../../components/provider/Header/HeaderHandler'
import { useMemo, useState } from 'react'
import FitnessListEditor from '../../components/Fitness/FitnessListEditor'
import { Button } from '@nextui-org/react'
import { useGetExercisePresetById } from '../../service/GqlStore/ExercisePreset'
import { useGetExerciseListByExercisePresetId } from '../../service/GqlStore/Exercise'
import { useUpdateExerciseListByExercisePreset } from '../../service/GqlStore/mixed/useUpdateExerciseListByExercisePreset'
import { useTranslation } from 'react-i18next'
import usePresetMenu from '../../hooks/usePreset/usePresetMenu'


export default function PresetDetailPage() {
  const params = useParams()
  const navigate = useNavigate()
  const { t } = useTranslation(['preset', 'common'])
  const id = useMemo(() => Number(params.id), [params])
  const { data: exercisePresetData } = useGetExercisePresetById(id)
  const exercisePreset = useMemo(() => exercisePresetData?.getExercisePresetById, [exercisePresetData])
  const { data: exerciseIdxListData } = useGetExerciseListByExercisePresetId(id)
  const exerciseIdxList = useMemo(() => exerciseIdxListData?.getExerciseListByExercisePresetId || [], [exerciseIdxListData])

  const updateExerciseList = useUpdateExerciseListByExercisePreset()
  const [newExerciseList, changeNewExerciseList] = useState<number[]>([])
  const oldExerciseList = useMemo(() => exerciseIdxList.map(v => v.exercise), [exerciseIdxList])

  const header = useMemo(() => {
    return [exercisePreset?.name]
  }, [exercisePreset])
  const headerMenu = usePresetMenu('headmenu', id)

  HeaderHandler(header)
  HeaderMenuHandler(headerMenu)
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