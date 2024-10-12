import SignComponent from "../../component/SignComponent/SignComponent";
import './SignUp.css'
import logo from './../../assets/images/Logo.png'
import upload from './../../assets/images/Uploadicon.svg'


export default function SignUp() {
  return (
    <section className="SignUp">
      <SignComponent logo={logo} logoImg='logo' title='Sign UP' desc='Fill in the following fields to create an account.' emailform='Email' emailplace='Enter Your Email' passwordform='Password' passwordplace='Enter your password' btnSign='SIGN UP' infoSign='Dont have an account? ' link='Sign in' nameform='Name' namefirst='First Name' namelast='Last Name' profile='Profile Image' uploadImg={upload} uploadDesc='upload' validpassword='Re-enter your password' linkto="/SignIn" height='height' none='' heightSignIn={""} />


    </section> 
  )
}
