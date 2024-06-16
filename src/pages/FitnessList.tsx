import FitnessListSearch from '../components/Fitness/FitnessListSearch'
import { HeaderHandler } from '../components/provider/Header/useHeaderContext'
function FitnessList() {
  HeaderHandler(['Search Exercises'])

  return <div className="grid h-screen overflow-hiden">
    <FitnessListSearch needSpace></FitnessListSearch>
  </div>
}

export default FitnessList