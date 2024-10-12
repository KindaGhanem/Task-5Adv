import AddComponent from "../../component/AddComponent/AddComponent";
import SideBar from "../../component/SidaBar/SideBar";
import logo from './../../assets/images/Logo.png'
import productImg from './../../assets/images/Product.svg'
import bookmark from './../../assets/images/bookmark.svg'
import logout from './../../assets/images/sign-out-alt.svg'
// import upload from './../../assets/images/Uploadicon.svg'

export default function AddNewItem() {
  return (
    <div className="DashBoardAll">
      <SideBar logo={logo} logoInfo='image' profile='' profileImg='profile' name='' icon11={productImg} icon22 = {bookmark} icon33={logout} btn1='Product' btn2='Favorites' btn3='Order List' btnout='Logout' />
      <AddComponent title="ADD NEW ITEM" label1={"Name"} holdername={"Enter the product name"} label2={"Price"} holderprice={"Enter the product price"} label3={"Image"} uploadDesc={'uploadDesc'} add={'add'} sign={''} />
    </div>
  ) 
}
