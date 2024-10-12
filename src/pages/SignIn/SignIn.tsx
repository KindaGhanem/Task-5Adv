
import SignComponent from '../../component/SignComponent/SignComponent'
import './SignIn.css'
import logo from './../../assets/images/Logo.png'

export default function SignIn() { 



  return (
 

    <section className='SignIn'>

      <SignComponent logo={logo} logoImg='logo' title='Sign In' desc='Enter your credentials to access your account' emailform='Email' emailplace='Enter Your Email' passwordform='Password' passwordplace='Enter your password' btnSign='SIGN IN' infoSign='Dont have an account? ' link=' Create one' linkto='/SignUp' nameform='' namefirst='' namelast='' profile='' uploadImg='' uploadDesc='' height='' validpassword='' none='none' heightSignIn={'heightSignIn'} />

    </section>
  )
}

