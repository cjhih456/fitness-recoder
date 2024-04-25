import { Button } from '@nextui-org/react'
import { MdArrowBack } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import FitnessListSearch from '../components/Fitness/FitnessListSearch'
function FitnessList() {
  const navigate = useNavigate()
  function goBack() {
    navigate('/')
  }
  return <FitnessListSearch searchPrefix={
    <Button isIconOnly radius="full" onClick={goBack}><MdArrowBack></MdArrowBack></Button>
  }></FitnessListSearch>
}

export default FitnessList