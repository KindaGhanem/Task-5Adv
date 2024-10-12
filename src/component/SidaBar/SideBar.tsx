
import axios from 'axios'
import './SidaBar.css'
import { useNavigate } from 'react-router-dom'


interface SideBar{
  logo:string ,
  logoInfo:string ,
  profile:string ,
  profileImg:string ,
  name:string ,
  icon11:string ,
  icon22:string ,
  icon33:string ,
  btn1:string ,
  btn2:string ,
  btn3:string ,
  btnout:string ,
} 




export default function SideBar({logo ,logoInfo , profileImg  , icon11 , icon22 ,icon33 , btn1, btn2,btn3 ,btnout  } :SideBar ) {

const navigate = useNavigate()

  function logOut() {
    axios.post('https://test1.focal-x.com/api/logout' , {
      "msg": "user logged out"
    } , 
    {
      headers:{
        Authorization: localStorage.getItem("token"),
      }
    })
    .then(res => {
      console.log(res.data)
      navigate("/SignIn")
    })
    .catch(error => console.log(error))
  }

  

  const userName  = localStorage.getItem('user');
  const profileImage = localStorage.getItem('userProf');




  return (
    <div className='SideBar'>
        <img src={logo} alt={logoInfo} className='SideBarLogo' ></img>
        <div>
          <img src={profileImage !== null ? profileImage : undefined} alt={profileImg} className ='SideBarProfile' ></img>
          <p className='name'> {userName} </p>
        </div>
        <div>
          <button className='active'> <img src={icon11} alt="" /> {btn1}</button>
          <button> <img src={icon22} alt="" /> {btn2}</button>
          <button><img src={icon22} alt="" />{btn3}</button>
        </div>

        <button className='LogOut' onClick = {() => logOut()} >{btnout} <img src={icon33} alt='' ></img> </button>

    </div>
  )
}
