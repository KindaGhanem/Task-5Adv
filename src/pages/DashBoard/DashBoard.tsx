
import SideBar from "../../component/SidaBar/SideBar"
import logo from './../../assets/images/Logo.png'
import productImg from './../../assets/images/Product.svg'
import bookmark from './../../assets/images/bookmark.svg'
import logout from './../../assets/images/sign-out-alt.svg'

import ItemDashBoard from "../../component/ItemsDashBoard/ItemDashBoard"
import './DashBoard.css'



export default function DashBoard() {



  return (
    <>
    <div className="DashBoardAll">
      <SideBar logo={logo} logoInfo='image' profile='' profileImg='profile' name='' icon11={productImg} icon22 = {bookmark} icon33={logout} btn1='Product' btn2='Favorites' btn3='Order List' btnout='Logout'  />
      <ItemDashBoard searchHolder='Search Product by name' />
    </div>
</>
  )
}
