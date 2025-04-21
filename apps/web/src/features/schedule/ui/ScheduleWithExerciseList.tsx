import type { Schedule } from '@fitness/struct'
import { Button } from '@heroui/react';
import { useTranslation } from 'react-i18next';
import { useGetExerciseListByScheduleId } from '@entities/exercise/api'
import SimpleFitnessList from '@entities/fitness/ui/SimpleFitnessList';
import ScheduleDisplay from '@entities/schedule/ui/ScheduleDisplay'
import SetState from '@entities/set/ui/SetState';
import { BooleanRender } from '@shared/ui/StateRender';
import { useScheduleActions, useScheduleMenu } from '../hooks';

interface ScheduleWithExerciseListProps {
  schedule: Schedule.Data,
  idx: number
}

const ScheduleDisplayWithExerciseList = ({ schedule, idx }: ScheduleWithExerciseListProps) => {
  const { t } = useTranslation(['scheduleList', 'common'])
  const { data: exerciseListData } = useGetExerciseListByScheduleId(schedule.id)
  const exerciseList = exerciseListData.getExerciseListByScheduleId

  const {
    gotoModifyScheduleAction,
    gotoScheduleDetail
  } = useScheduleActions()

  const scheduleMenu = useScheduleMenu()

  return <ScheduleDisplay
    schedule={schedule}
    title={t('schedule.row.title', { n: idx })}
    menu={scheduleMenu({ scheduleId: schedule.id, scheduleType: schedule.type })}
    exerciseListCount={exerciseList.length}
  >
    {(id, type, date) => {
      return <>
        <SimpleFitnessList exerciseDataList={exerciseList}>
          {exerciseData => <SetState exerciseDataId={exerciseData.id} />}
        </SimpleFitnessList>
        <div className="grid grid-flow-col auto-cols-auto gap-x-4">
          <BooleanRender
            state={type !== 'FINISH'}
            render={{
              true: () => <Button key={`${id}-modify`} onPress={() => gotoModifyScheduleAction(id, date)}>
                {t('common:modify')}
              </Button>
            }}
          />
          <Button key={`${id}-detail`} onPress={() => gotoScheduleDetail(id, date)}>
            {type === 'FINISH' ? t('common:detail') : t('schedule.actionBtn.start')}
          </Button>
        </div>
      </>
    }}
  </ScheduleDisplay>
}

export default ScheduleDisplayWithExerciseList
