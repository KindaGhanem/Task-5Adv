import { FormEvent, useEffect, useState } from "react";
import ButtonCommon from "../ButtonCommon/ButtonCommon";
import ControlBack from "../ControlBack/ControlBack";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";


import upload from './../../assets/images/Uploadicon.svg'

interface AddItem{
    title:string ,
    label1:string ,
    valuename:string ,
    label2:string ,
    valueprice:string ,
    label3:string ,
    uploadImg: string ,
    uploadDesc: string ,
    add: string ,
    sign: string ,
}

interface UpdateArray{
    name:string ,
    price:string ,
    image_url:File |string | any ,
}
export default function UpdateComponent({title ,label1 , label2 , label3 , uploadDesc } : AddItem) {

    const [name, setname] = useState<string> ('')
    const [price, setprice] = useState <string>('')
    const [image, setimage] = useState <any | string>(null)
    const [items, setitems] = useState< UpdateArray >()

    
  const uploadImg : any = image ? URL.createObjectURL(image) :  ''



    const navigate=useNavigate()

    const param = useParams<string> ()

    useEffect(() => {
        if(!localStorage.getItem("token")){
            navigate("SignIn")
        }
        axios.get(`https://test1.focal-x.com/api/items/${param.id}` ,{

        headers:{
            Authorization : localStorage.getItem("token")
        }
        })
        .then(res =>{
            console.log(res.data)
            setitems(res.data)
        })

        axios.post('https://test1.focal-x.com/api/items' , {
          name:name ,
          price : price ,
          image: image ,
          _method : 'PUT'
        } ,
        {
          headers:{
              Authorization: localStorage.getItem("token"),
              "Content-Type": "multipart/form-data"
          }
        })
        .then(res => {
          console.log(res.data)
          navigate("/")
        })
        .catch(error => console.log(error))
    }, [])


    function send(event: FormEvent<HTMLFormElement>) {
      event.preventDefault()
  
      axios.post(`https://test1.focal-x.com/api/items/${param.id}` , {
        name:name ,
        price : price ,
        image: image ,
        _method : 'PUT'

      } ,
      {
        headers:{
            Authorization: localStorage.getItem("token"),
            "Content-Type": "multipart/form-data"
        }
      })
      .then(res => {
        console.log(res.data)
        navigate("/")
      })
      .catch(error => console.log(error))
    }


  return (
    <div className="AddItem">
      <ControlBack title={title} />
      <form className='FormAdd' onSubmit={(event) => send(event)} >
          <div className='TopForm'>
            <div className='FormLeft'>
              <label>{label1}</label>
              <input type='text' onChange={(event) => setname(event.target.value)} defaultValue={items?.name}></input>
              <label>{label2}</label>
              <input type='text' onChange={(event) => setprice(event.target.value)} defaultValue={items?.price}></input>
            </div>
            <div className='FormRight'>
              <label>{label3}</label>
              <input type='file' onChange={(event) => {
                const files = event.target.files;
                if (files && files.length > 0) {
                    setimage(files[0]);
                } else {
                    setimage(null);
                }
            }} 
                  style={{ display: 'none' }}
                  id="fileInput"
            ></input>
          <label htmlFor="fileInput" className="file-upload">
                {uploadImg ? (
                    <img src={uploadImg} alt={uploadDesc} className='imageupload' />
                ) : (
                  <img src={upload} alt={uploadDesc} className='imageupload' />
                    
                )}
            </label>
            </div>
          </div>
          <ButtonCommon btnSign={"Save"} size='' auto={'auto'} pop={''} onClick={undefined} padding={'padding'} margin={""} />
      </form>
  

  </div>

  )
}
