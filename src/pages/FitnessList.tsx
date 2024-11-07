import { useTranslation } from 'react-i18next'
import FitnessListSearch from '../components/Fitness/FitnessListSearch'
import { useBottomNavi } from '../components/provider/BottomNavi/useBottomNavi'
import { HeaderHandler } from '../components/provider/Header/HeaderHandler'
function FitnessList() {
  const { t } = useTranslation('title')
  useBottomNavi()
  HeaderHandler([t('exercise')])

  return <div className="grid h-full max-h-full overflow-hidden">
    <FitnessListSearch needSpace></FitnessListSearch>
  </div>
}

export default FitnessList