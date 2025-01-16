import { useEffect, useState } from 'react';
import ButtonCommon from '../ButtonCommon/ButtonCommon';
import './ItemDashBoard.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import imageError from './../../assets/images/imageError.png';

interface Allitem {
    searchHolder: string,
}

interface DashItem {
    id: number,
    name: string,
    phoneDesc: string,
    image_url: string,
    btnEdit: string,
    btnDelete: string,
}

export default function ItemDashBoard({ searchHolder }: Allitem) {
    const navigate = useNavigate();
    const [show, setShow] = useState(true);
    const [items, setItems] = useState<Array<DashItem>>([]);
    const [currentItemId, setCurrentId] = useState<number>(0);
    const [imgError, setImgError] = useState(false);
    const [search, setSearch] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(8);

    // التحقق من وجود الرمز عند تحميل المكون
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/SignIn");
            return; // منع تنفيذ الكود التالي إذا لم يكن هناك رمز
        }

        // إجراء طلب للحصول على العناصر
        axios.get('https://test1.focal-x.com/api/items', {
            headers: {
                Authorization: token
            }
        })
        .then(res => {
            console.log(res.data);
            setItems(res.data);
        })
        .catch(error => {
            console.error("Error fetching items:", error);
        });
    }, [navigate]);

    const deleteInfo = (id: number) => {
        axios.delete(`https://test1.focal-x.com/api/items/${id}`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
        .then(res => {
            console.log(res.data);
            // تحديث العناصر بعد الحذف
            return axios.get('https://test1.focal-x.com/api/items', {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });
        })
        .then(res => {
            console.log(res.data);
            setItems(res.data);
        })
        .catch(error => console.log(error));

        setShow(!show);
    };

    // البحث
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
        } else if (width < 1030) {
            setItemsPerPage(6);
        } else {
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
            <input type='search' placeholder={searchHolder} className='Dach-Search' onChange={(event) => setSearch(event.target.value)} />
            <Link to='/AddNewItem' className='AddLinkBtn'>
                <ButtonCommon btnSign='ADD NEW ITEM' size={''} auto={''} pop={''} onClick={undefined} padding={'padding'} margin={'margin'} />
            </Link>
            <div className='CardsItems'>
                {currentItems.map((element, index) => (
                    <div key={index}>
                        <div className="Hover-part">
                            <div className="image-hover">
                                <img src={imgError ? imageError : element.image_url} alt={element.phoneDesc} className="card-img-top" onError={() => setImgError(true)} />
                            </div>
                            <div className="content">
                                <h2 onClick={() => navigate(`/ShowItemInfo/${element.id}`)}>{element.name}</h2>
                                <div className='CardItemButton'>
                                    <Link to={`/UpdateItem/${element.id}`} className='Edit'>{'Edit'}</Link>
                                    <button onClick={() => { setShow(!show); setCurrentId(element.id); }} className='delete'>Delete</button>
                                </div>
                            </div>
                        </div>
                        <div className={(show) ? 'CoverPopUp' : 'CoverPopUpVisible'}>
                            <div className='PopUp'>
                                <p>ARE YOU SURE YOU WANT TO DELETE THE PRODUCT?</p>
                                <div className='popupButton'>
                                    <ButtonCommon btnSign={'Yes'} size={'size'} auto={''} pop={"pop"} onClick={() => deleteInfo(currentItemId)} padding={''} margin={''} />
                                    <ButtonCommon btnSign={'No'} size={'size'} auto={''} pop={"pop"} onClick={() => setShow(!show)} padding={''} margin={''} />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* عناصر التحكم في الصفحات */}
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
        </div>
    );
}
