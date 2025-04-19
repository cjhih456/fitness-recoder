import type { FitnessSearchFormData } from '@entities/fitness/model/FitnessSearchFormData'
import { Suspense, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { defaultFitnessSearchFormData } from '@entities/fitness/model/FitnessSearchFormData'
import FitnessSearchForm from '@entities/fitness/ui/FitnessSearchForm'
import FitnessListByFilter from '@features/fitness/ui/FitnessListByKeywords'
import { useHeaderSetValue } from '@shared/hooks/header'
import { useBottomNavi } from '@widgets/bottomNavi'

function FitnessList() {
  const { t } = useTranslation('title')
  useBottomNavi()
  const setHeader = useHeaderSetValue()
  setHeader(t('exercise'))
  const [searchFormData, setSearchFormData] = useState<FitnessSearchFormData>(defaultFitnessSearchFormData)

  return <div className="grid h-full max-h-full overflow-hidden pt-4">
    <FitnessSearchForm
      value={searchFormData}
      onValueChange={setSearchFormData}
      className='px-4'
    />
    <Suspense>
      <FitnessListByFilter
        searchFilter={searchFormData}
        className='px-4 mt-4'
      />
    </Suspense>
  </div>
}

export default FitnessList