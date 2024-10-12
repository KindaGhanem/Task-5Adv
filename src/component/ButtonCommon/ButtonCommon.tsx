import { MouseEventHandler } from 'react'
import './ButtonCommon.css'


interface btn{
    btnSign:string,
    size:string,
    auto:string,
    pop:string,
    onClick:MouseEventHandler<HTMLDivElement> | undefined,
    padding:string ,
    margin:string ,
    

}


export default function ButtonCommon({btnSign , size , auto , pop , onClick , padding , margin} : btn) {
  return (
    <div className={`${auto}`} onClick={onClick}>
        <input type='submit' value={btnSign} className={`sendBtn ${size} ${pop} ${padding} ${margin}`}></input>
    </div>
  )
}
