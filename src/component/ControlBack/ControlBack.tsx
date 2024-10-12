import { Link } from 'react-router-dom'
import './ControlBack.css'
import control from './../../assets/images/Control.svg'

interface title{
  title:string | undefined
}

export default function ControlBack({title} : title) {
  return (
    <>
    <Link to="/"> <img src={control} alt="image" className='controlImg'></img> </Link>
    <h1 className='TitleCommon'>{title}</h1>
    </>
  )
}
