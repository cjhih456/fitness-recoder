import { useTranslation } from 'react-i18next'
import useBottomNavi from '@ui/BottomNavi/hooks/useBottomNavi'
import FitnessListSearch from '@ui/Fitness/FitnessListSearch'
import useHeaderHandler from '@ui/Header/hooks/useHeaderHandler'
function FitnessList() {
  const { t } = useTranslation('title')
  useBottomNavi()
  useHeaderHandler(t('exercise'))

  return <div className="grid h-full max-h-full overflow-hidden pt-4">
    <FitnessListSearch needSpace></FitnessListSearch>
  </div>
}

export default FitnessList