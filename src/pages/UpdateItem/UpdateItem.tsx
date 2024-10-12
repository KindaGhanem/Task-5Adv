
import SideBar from "../../component/SidaBar/SideBar";
import './UpdateItem.css'
import logo from './../../assets/images/Logo.png'
import productImg from './../../assets/images/Product.svg'
import bookmark from './../../assets/images/bookmark.svg'
import logout from './../../assets/images/sign-out-alt.svg'
import UpdateComponent from "../../component/UpdateComponent/UpdateComponent";


export default function UpdateItem() {
  return (
    <div className="EditItem">
       <SideBar logo={logo} logoInfo='image' profile='' profileImg='profile' name='' icon11={productImg} icon22 = {bookmark} icon33={logout} btn1='Product' btn2='Favorites' btn3='Order List' btnout='Logout'  />
       <UpdateComponent title={"EDIT ITEM"} label1={"Name"} valuename={""} label2={"Price"} valueprice={""} label3={"Image"} uploadImg={""} uploadDesc={"image"} add={"add"} sign={""} />





    </div>
  )
}
