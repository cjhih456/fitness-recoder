import { useTranslation } from 'react-i18next'
import FitnessListSearch from '@components/Fitness/FitnessListSearch'
import { useBottomNavi } from '@provider/BottomNaviProvider'
import { useHeaderHandler } from '@provider/HeaderProvider'
function FitnessList() {
  const { t } = useTranslation('title')
  useBottomNavi()
  useHeaderHandler([t('exercise')])

  return <div className="grid h-full max-h-full overflow-hidden pt-4">
    <FitnessListSearch needSpace></FitnessListSearch>
  </div>
}

export default FitnessList