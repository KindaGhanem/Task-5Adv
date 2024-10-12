import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignIn from './pages/SignIn/SignIn.tsx'
import SignUp from './pages/SignUp/SignUp.tsx'
import DashBoard from './pages/DashBoard/DashBoard.tsx'
import ShowItemInfo from './pages/ShowItemInfo/ShowItemInfo.tsx'
import AddNewItem from './pages/AddNewItem/AddNewItem.tsx'
import UpdateItem from './pages/UpdateItem/UpdateItem.tsx'


const routes = createBrowserRouter([
{
  path : "/SignIn" ,
  element : <SignIn />,
} ,
{
  path : "/SignUp" ,
  element : <SignUp />
} ,
{
  path : "/ShowItemInfo/:id" ,
  element : <ShowItemInfo />
} ,
{
  path : "/" ,
  element : <DashBoard />
} ,
{
  path : "/AddNewItem" ,
  element : <AddNewItem />
} ,
{
  path : "/UpdateItem/:id" ,
  element : <UpdateItem />
} ,
])
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>, 
)
