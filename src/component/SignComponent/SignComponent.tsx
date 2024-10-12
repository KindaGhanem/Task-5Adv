import { Link, useNavigate } from 'react-router-dom'
import './SignComponent.css'
import { FormEvent, useState } from 'react';
import axios from 'axios';
import ButtonCommon from '../ButtonCommon/ButtonCommon';
// import UploadImageComp from '../UploadImageComp/UploadImageComp';

import upload from './../../assets/images/Uploadicon.svg'

interface SignInUp {
    logo:string ,
    logoImg:string ,
    title:string ,
    desc:string ,
    nameform:string ,
    namefirst:string ,
    namelast:string ,
    emailform:string ,
    emailplace:string ,
    passwordform:string ,
    passwordplace:string ,
    profile:string ,
    uploadImg:string ,
    uploadDesc:string ,
    btnSign:string ,
    infoSign:string ,
    link:string ,
    none : string ,
    height : string ,
    validpassword:string ,
    linkto :string ,
    heightSignIn:string 
}




export default function SignComponent( {heightSignIn ,logo , logoImg , title , desc , nameform , namefirst , namelast , emailform , emailplace ,  passwordform , passwordplace , profile  , btnSign , infoSign , link , none ,height , validpassword ,linkto} : SignInUp ) {

  const [first_name,setfirst_name] = useState <string> ("")
  const [last_name,setlast_name] = useState <string> ("")
  const [email,setemail] = useState <string> ("")
  const [password,setpassword] = useState <string> ("")
  const [password_confirmation,setpassword_confirmation] = useState <string> ("")
  const [profile_image,setprofile_image] = useState <string | File | null> (null)



  const [isSignUp, setIsSignUp] = useState<boolean>(true);


  const navigate =useNavigate()


  function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()


    axios.post('https://test1.focal-x.com/api/login' , {
      email:email ,
      password : password
    })
    .then(res => {
      localStorage.setItem("token" , `Bearer ${res.data.token}`)
      localStorage.setItem("user" , ` ${res.data.user.user_name}`)
      localStorage.setItem("userProf" , ` ${res.data.user.profile_image_url}`)
      navigate("/")
    })
    .catch(error => console.log(error))
  }

  function signUp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()


    axios.post('https://test1.focal-x.com/api/register' , {
      first_name : first_name ,
      last_name : last_name ,
      user_name : first_name+'_'+last_name ,
      email:email ,
      password : password ,
      password_confirmation : password_confirmation ,
      profile_image : profile_image ,
    } , 
    {
      headers:{
          "Content-Type": "multipart/form-data"
      }
      ,
      timeout: 10000 
    })
    .then(res => {
      console.log(res.data)
      localStorage.setItem("token" , `Bearer ${res.data.data.token}`)
      localStorage.setItem("user" , ` ${res.data.data.user.user_name}`)
      localStorage.setItem("userProf" , ` ${res.data.data.user.profile_image_url}`)
      navigate("/")
    })
    .catch(error => console.log(error))
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    if (isSignUp) {
      
      signUp(event);
    } else { 
      signIn(event);
    }
  }


  return (
    <div className={`${height} ${heightSignIn} SignComp`} >
        <img src={logo} alt={logoImg}></img>
        <h1 className='title'>{title}</h1>
        <p className='desc par'>{desc}</p>

        <form className='form' onSubmit={(event) => handleSubmit(event)}>
          
            <label className={`${none} desc`}>{nameform}</label>
            <div className={`${none} passinput`}>
                <input type='text' placeholder={namefirst} onChange={(event) => setfirst_name(event.target.value)}></input>
                <input type='text' placeholder={namelast} onChange={(event) => setlast_name(event.target.value)}></input>
            </div>
            <div className='flex'>
              <label className='desc'>{emailform}</label>
              <input type='text' placeholder={emailplace} onChange={(event) => setemail(event.target.value)} ></input>
            </div>
            <div className='flex'>
              <label className='desc'>{passwordform}</label>
              <div className='passinput'>
                <input type='text' placeholder={passwordplace} onChange={(event) => setpassword(event.target.value)} ></input>
                <input className={`${none}`} type='text' placeholder={validpassword}  onChange={(event) => setpassword_confirmation(event.target.value)} ></input>
              </div>
            </div>
            <label className={`${none} desc`} >{profile}</label>
            <div className={`${none} Bg-Uplad`}>
            <input type='file' onChange={(event) => {
                                  const files = event.target.files;
                                  if (files && files.length > 0) {
                                    setprofile_image(files[0]);
                                  } else { setprofile_image('');}}} style={{ display: 'none' }} id="fileInput"></input>
                <label htmlFor="fileInput" className="uploadSign">
                  <img src={upload} alt=''></img>
                </label>
            </div>
            <ButtonCommon btnSign={btnSign} size={''} auto={''} pop={''} onClick={() => setIsSignUp(!isSignUp)} padding={''} margin={''} />
        </form>
        <p className='desc question'> {infoSign} <Link to={`${linkto}`} className='linkSign'>{link}</Link></p>
    </div>
    
  )
}






















// import { Link, useNavigate } from 'react-router-dom';
// import './SignComponent.css';
// import { FormEvent, useState } from 'react';
// import axios from 'axios';
// import ButtonCommon from '../ButtonCommon/ButtonCommon';
// import upload from './../../assets/images/Uploadicon.svg';

// interface SignInUp {
//   logo: string;
//   logoImg: string;
//   title: string;
//   desc: string;
//   nameform: string;
//   namefirst: string;
//   namelast: string;
//   emailform: string;
//   emailplace: string;
//   passwordform: string;
//   passwordplace: string;
//   profile: string;
//   uploadImg: string;
//   uploadDesc: string;
//   btnSign: string;
//   infoSign: string;
//   link: string;
//   none: string;
//   height: string;
//   validpassword: string;
//   linkto: string;
//   heightSignIn: string;
// }

// export default function SignComponent({ 
//   heightSignIn, 
//   logo, 
//   logoImg, 
//   title, 
//   desc, 
//   nameform, 
//   namefirst, 
//   namelast, 
//   emailform, 
//   emailplace, 
//   passwordform, 
//   passwordplace, 
//   profile, 
//   uploadImg, 
//   uploadDesc, 
//   btnSign, 
//   infoSign, 
//   link, 
//   none, 
//   height, 
//   validpassword, 
//   linkto 
// }: SignInUp) {
  
//   const [email, setEmail] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const [first_name, setFirstName] = useState<string>("");
//   const [last_name, setLastName] = useState<string>("");
//   const [password_confirmation, setPasswordConfirmation] = useState<string>("");
//   const [profile_image, setProfileImage] = useState<string | File>("");
//   const [user_name, setUserName] = useState<string>("");

//   const [isSignUp, setIsSignUp] = useState<boolean>(false);
//   const navigate = useNavigate();

//   // Function for signing up
//   function signUp(event: FormEvent<HTMLFormElement>) {
//     event.preventDefault();

//     const formData = new FormData();
//     formData.append('first_name', first_name);
//     formData.append('last_name', last_name);
//     formData.append('user_name', user_name);
//     formData.append('email', email);
//     formData.append('password', password);
//     formData.append('password_confirmation', password_confirmation);

//     if (profile_image instanceof File) {
//       formData.append('profile_image', profile_image);
//     }

//     axios.post('https://test1.focal-x.com/api/register', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     })
//     .then(res => {
//       // After successful registration, automatically log in the user
//       navigate("/Sign in");
//     })
//     .catch(error => {
//       console.log(error);
//       alert("Sign up failed: " + (error.response?.data?.message || "Unknown error"));
//     });
//   }

//   // Function for signing in after successful sign up
//   function signInAfterSignUp() {
//     axios.post('https://test1.focal-x.com/api/login', {
//       email: email,
//       password: password
//     })
//     .then(res => {
//       localStorage.setItem("token", `Bearer ${res.data.token}`);
//       localStorage.setItem("user", res.data.user.user_name);
//       localStorage.setItem("userProf", res.data.user.profile_image_url);
//       navigate("/");
//     })
//     .catch(error => {
//       console.log(error);
//       alert("Login after sign up failed: " + (error.response?.data?.message || "Unknown error"));
//     });
//   }

//   function handleSubmit(event: FormEvent<HTMLFormElement>) {
//     if (isSignUp) {
//       signUp(event);
//     } else {
//       // Logic for signing in (not provided in this code)
//     }
//   }

//   return (
//     <div className={`${height} ${heightSignIn} SignComp`}>
//       <img src={logo} alt={logoImg}></img>
//       <h1 className='title'>{title}</h1>
//       <p className='desc par'>{desc}</p>

//       <form className='form' onSubmit={handleSubmit}>
//         <label className={`${none} desc`}>{nameform}</label>
//         <div className={`${none} passinput`}>
//           <input type='text' placeholder={namefirst} onChange={(event) => setFirstName(event.target.value)}></input>
//           <input type='text' placeholder={namelast} onChange={(event) => setLastName(event.target.value)}></input>
//         </div>
//         <div className='flex'>
//           <label className='desc'>{emailform}</label>
//           <input type='text' placeholder={emailplace} onChange={(event) => setEmail(event.target.value)} ></input>
//         </div>
//         <input type='text'  placeholder='username' onChange={(event) => setUserName(event.target.value)}></input>
//         <div className='flex'>
//           <label className='desc'>{passwordform}</label>
//           <div className='passinput'>
//             <input type='password' placeholder={passwordplace} onChange={(event) => setPassword(event.target.value)} ></input>
//             <input className={`${none}`} type='password' placeholder={validpassword} onChange={(event) => setPasswordConfirmation(event.target.value)} ></input>
//           </div>
//         </div>
//         <label className={`${none} desc`} >{profile}</label>
//         <div className={`${none} Bg-Uplad`}>
//           <input className='inputImage' type='file' onChange={(event) => {
//             const files = event.target.files;
//             if (files && files.length > 0) {
//               setProfileImage(files[0]);
//             } else {
//               setProfileImage('');
//             }
//           }} ></input>
//           <img src={upload} alt=''></img>
//         </div>
//         <ButtonCommon btnSign={btnSign} size={''} auto={''} pop={''} onClick={() => setIsSignUp(!isSignUp)} padding={''} />
//       </form>
//       <p className='desc'>{infoSign} <Link to={`${linkto}`} className='linkSign'>{link}</Link></p>
//     </div>
//   );
// }
