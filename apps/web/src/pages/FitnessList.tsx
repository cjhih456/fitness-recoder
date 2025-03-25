import { useTranslation } from 'react-i18next'
import { useBottomNavi } from '@globalUi/BottomNavi'
import { useHeaderHandler } from '@globalUi/Header'
import FitnessListSearch from '@ui/Fitness/FitnessListSearch'
function FitnessList() {
  const { t } = useTranslation('title')
  useBottomNavi()
  useHeaderHandler(t('exercise'))

  return <div className="grid h-full max-h-full overflow-hidden pt-4">
    <FitnessListSearch needSpace></FitnessListSearch>
  </div>
}

export default FitnessList