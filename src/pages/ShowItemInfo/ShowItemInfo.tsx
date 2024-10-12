import ShowComponent from "../../component/ShowComponent/ShowComponent";
import SideBar from "../../component/SidaBar/SideBar";
import logo from './../../assets/images/Logo.png'
import productImg from './../../assets/images/Product.svg'
import bookmark from './../../assets/images/bookmark.svg'
import logout from './../../assets/images/sign-out-alt.svg'


export default function ShowItemInfo() {



  return (
    <div className= "DashBoardAll">
        <SideBar logo={logo} logoInfo='image' profile='' profileImg='profile' name='Mohammad AlKordy' icon11={productImg} icon22 = {bookmark} icon33={logout} btn1='Product' btn2='Favorites' btn3='Order List' btnout='Logout'  />
        <ShowComponent firsttitle='Price :' secondtitle='Added At :' thirdtitle='Update AT :' control={""}  />

    </div>
  )
}
