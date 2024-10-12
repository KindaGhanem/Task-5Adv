import {useEffect, useState } from 'react'
import ButtonCommon from '../ButtonCommon/ButtonCommon'
import './ItemDashBoard.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import imageError from './../../assets/images/imageError.png'


interface Allitem{
    searchHolder : string ,

}

interface DashItem{
    id:number,
    name:string , 
    phoneDesc:string,
    image_url:string ,
    btnEdit:string,
    btnDelete:string ,
} 



export default function ItemDashBoard({searchHolder} : Allitem) {

  
  const navigate = useNavigate()
 
  const[show , setshow] = useState(true)
  const [items, setitems] = useState<Array <DashItem>>([])
  const [currentItemId, setcurrentId] = useState < number >(0);

  const [imgError, setImgError] = useState(false);


  


  const showInfo =(id: number) =>{
      navigate(`/ShowItemInfo/${id}`)
    }




    useEffect(() => {
      if(!localStorage.getItem("token")){
        navigate("Sign In")
      }
      axios.get('https://test1.focal-x.com/api/items' ,{
        headers:{
            Authorization : localStorage.getItem("token") 
        }
      })
      .then(res =>{
        console.log(res.data)
        setitems(res.data)
      })
    }, [])

    
    const deleteInfo =(id: number) =>{
      axios.delete(`https://test1.focal-x.com/api/items/${id}` , {
        headers:{
            Authorization : localStorage.getItem("token")
        } 
      })
      .then(res => {
        console.log(res.data) ,
        axios.get('https://test1.focal-x.com/api/items' ,{
          headers:{
              Authorization : localStorage.getItem("token") 
          }
        })
        .then(res =>{
          console.log(res.data)
          setitems(res.data)
        })    
      })
      .catch(error => console.log(error))
      setshow(!show)

    }
////////////search

const [search, setsearch] = useState<string>('');


    ///////////////pagenation

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(8);
    
    
    const totalPages = Math.ceil(items.filter(element => 
        search.toLowerCase() === '' ? true : element.name.toLowerCase().includes(search)).length / itemsPerPage);



    const currentItems = items.filter(element => 
        search.toLowerCase() === '' ? true : element.name.toLowerCase().includes(search))
        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePageClick = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    
    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };


    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    
    const numberOfCards = () => {
      const width = window.innerWidth;
      if (width < 850) {
          setItemsPerPage(4);
      } 
      else if (width < 1030) {
          setItemsPerPage(6);
      }
      else {
          setItemsPerPage(8);
      }
  };

  useEffect(() => {
      numberOfCards();
      window.addEventListener('resize', numberOfCards);

      return () => {
          window.removeEventListener('resize', numberOfCards);
      };
  }, []);






  return (
    <div className='ItemDashBoard'>
        <input type='search' placeholder={searchHolder} className='Dach-Search'  onChange={(event) => setsearch(event.target.value)} ></input> 
        {/* <div className='DashAddItems'> */}
        <Link to='/AddNewItem' className='AddLinkBtn' > <ButtonCommon btnSign='ADD NEW ITEM' size={''} auto={''} pop={''} onClick={undefined} padding={'padding'} margin={'margin'} /> </Link>
          <div className='CardsItems' >
            {currentItems.map((element , index) => {
              return(
                <div  key={index}>
                  <div className="Hover-part">
                      <div className="image-hover" >
                        <img src={imgError ? imageError: element.image_url}  alt={element.phoneDesc} className="card-img-top" onError={() => setImgError(true)} ></img>
                      </div>
                      <div className="content">
                          <h2 onClick = {()=>showInfo(element.id)}>{element.name}</h2>
                          <div className='CardItemButton' >
                              <Link to ={`/UpdateItem/${element.id}`} className='Edit'>{'Edit'}</Link>

                              <button onClick={() => {setshow(!show); setcurrentId(element.id); }} className='delete'>Delete</button>
                          </div>
                      </div>
                  </div>
                  <div className={(show) ? 'CoverPopUp' : 'CoverPopUpVisible'}>
                    <div className='PopUp'>
                      <p>  ARE YOU SURE YOU WANT TO DELETE THE PRODUCT?</p>
                      <div className='popupButton'>
                        <ButtonCommon btnSign={'Yes'} size={'size'} auto={''} pop={"pop"} onClick={() => deleteInfo(currentItemId)} padding={''} margin={''} />
                        <ButtonCommon btnSign={'No'} size={'size'} auto={''} pop={"pop"} onClick={() => setshow(!show)} padding={''} margin={''} />
                      </div>
                    </div> 
                  </div>
                </div>
              )
            })}
          </div>
          
          <div className="AllPageButton">
          <button onClick={handlePrev} disabled={currentPage === 1}>&lt;</button>
                    {Array.from({ length: totalPages }, (_, index) => {
                        const pageNumber = index + 1;
                        if (pageNumber <= 3 || pageNumber > totalPages - 1 || (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)) {
                            return (
                                <button 
                                    key={pageNumber} 
                                    onClick={() => handlePageClick(pageNumber)} 
                                    className={currentPage === pageNumber ? 'active' : ''}
                                >
                                    {pageNumber}
                                </button>
                            );
                        }
                        if (pageNumber === 4 && currentPage > 4) {
                            return <button key={pageNumber}>...</button>;
                        }
                        if (pageNumber === totalPages - 1 && currentPage < totalPages - 3) {
                            return <button key={pageNumber}>...</button>;
                        }
                        return null;
                    })}
                    <button onClick={handleNext} disabled={currentPage === totalPages}>&gt;</button>
                </div>
            {/* </div> */}
        </div>
  )
}
