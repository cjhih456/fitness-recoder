import { useTranslation } from 'react-i18next'
import FitnessListSearch from '@entities/fitness/ui/FitnessListSearch'
import { useBottomNavi } from '@widgets/bottomNavi'
import { useHeaderHandler } from '@widgets/header'
function FitnessList() {
  const { t } = useTranslation('title')
  useBottomNavi()
  useHeaderHandler(t('exercise'))

  return <div className="grid h-full max-h-full overflow-hidden pt-4">
    <FitnessListSearch needSpace></FitnessListSearch>
  </div>
}

export default FitnessList