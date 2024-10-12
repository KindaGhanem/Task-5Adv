import {  useNavigate, useParams } from 'react-router-dom'
import './ShowComponent.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import ControlBack from '../ControlBack/ControlBack'


interface showItem{
    control:string ,
    firsttitle:string ,
    secondtitle:string ,
    thirdtitle:string ,
}
interface arrayItem{
    name:string | undefined ,
    image_url:string ,
    price:number ,
    created_at: number,
    updated_at: number ,
}


export default function ShowComponent({ firsttitle , secondtitle , thirdtitle  }:showItem ) {



    const [items, setitems] = useState< arrayItem>()
    const navigate=useNavigate()

    const param = useParams<string> ()

    useEffect(() => {
        if(!localStorage.getItem("token")){
            navigate("Sign In")
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
    }, [])



    const formatDate = (timestamp: number): string => {
        const date = new Date(timestamp);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day}/${month}/${year}`
    }
   


  return (
    <div className='infoshow'>
        <ControlBack title={items?.name} />
        <img src={items?.image_url} alt='' className='phoneImage' ></img>
        <div className='pricedate'>
            <p>{firsttitle} <span>{items?.price} </span></p>
            <p className='createDate'>{secondtitle} <span>{items ? formatDate(items?.created_at) : ''}</span></p>
            <p className='updateDate'>{thirdtitle} <span>{items ? formatDate(items?.updated_at) : ''}</span></p>
    </div>
    </div>
  )}
