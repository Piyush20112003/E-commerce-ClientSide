import React, { useContext, useState } from 'react'
import { FiSearch } from "react-icons/fi";
import { FaCircleUser } from "react-icons/fa6";
import { IoMdCart } from "react-icons/io";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/banner/Logo-Full-Light.png'
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role';
import Context from '../context';

const Header = () => {
  const user = useSelector(state => state?.user?.user)
  const dispatch = useDispatch()
  const [menuDisplay,setMenuDisplay] = useState(false)
  const context = useContext(Context)
  const navigate = useNavigate()
  const searchInput = useLocation()
  const URLSearch = new URLSearchParams(searchInput?.search)
  const searchQuery = URLSearch.getAll("q")
  const [search,setSearch] = useState(searchQuery)



  const handleLogout = async() => {
    const fetchData = await fetch(SummaryApi.logout_user.url,{
      method : SummaryApi.logout_user.method,
      credentials : 'include'
    })

    const data = await fetchData.json()

    if(data.success){
      toast.success(data.message)
      dispatch(setUserDetails(null))
      navigate("/")
    }

    if(data.error){
      toast.error(data.message)
    }

  }

  const handleSearch = (e)=>{
    const { value } = e.target
    setSearch(value)

    if(value){
      navigate(`/search?q=${value}`)
    }else{
      navigate("/search")
    }
  }

  return (
    <header className='h-16 shadow-md bg-richblack-800 fixed w-full z-40 '>
      <div className='h-full container mx-auto flex items-center px-3 justify-between'>
        <div className=''>
          <Link to={'/'}>
          <img src={logo} className='w-32 h-11 rounded-2xl'/>
          </Link>
        </div>

        <div className='hidden lg:flex items-center w-full justify-between max-w-sm rounded-xl focus-within:shadow pl-2 bg-richblack-500'>
          <input type='text' placeholder='search product here...' className='w-full outline-none bg-richblack-500 text-richblack-25 placeholder:text-richblack-25' onChange={handleSearch} value={search}/>
          <div className='text-lg min-w-[50px] h-8 flex items-center justify-center rounded-r-xl text-white bg-richblack-700  hover:bg-richblack-800'>
          <FiSearch/>
          </div>
        </div>

        <div className='flex items-center gap-7'>  

            <div className='relative flex justify-center'>
              {
                user?._id && (
                  <div className='text-3xl cursor-pointer relative flex justify-center' onClick={() => setMenuDisplay(preve => !preve)}>
                  {
                   user?.profilePic ? (
                  <img src={user?.profilePic} className='w-10 h-10 rounded-full' alt={user?.name} />
                   ) : (<FaCircleUser  className='text-richblack-200 hover:text-richblack-400'/>)
                  }
                  </div>
                )
              }
              

              {
                menuDisplay && (
                  <div className='absolute bg-richblack-5 bottom-0 top-11 h-fit p-2 shadow-lg rounded '>
                   <nav>
                    {
                      user?.role === ROLE.ADMIN && (
                        <Link to={"/admin-panel/all-products"} className='whitespace-nowrap hidden md:block hover:rounded-md hover:text-richblack-700 hover:bg-richblack-25 p-2' onClick={() => setMenuDisplay(preve => !preve)}>
                        Admin Panel
                        </Link>
                      )
                    }
                    
                   </nav>
                  </div>
                )
              }
              
            </div>

           {
            user?._id && (
               <Link to={"/cart"}  className='text-2xl relative'>
              <span className='text-richblack-25 hover:text-richblack-400'><IoMdCart/></span>
              <div className='bg-richblue-400 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
                <p className='text-xs font-semibold'>{context?.cartProductCount}</p>
              </div>
            </Link>
            )
           }
            

            <div>
              {
                user?._id  ? (
                  <button onClick={handleLogout} className='px-3 py-1 rounded-full text-white bg-richblue-400 hover:bg-richblue-600'>Logout</button>
                ) : (
                  <Link to={'/login'} className='px-5 py-3 rounded-full text-white bg-richblue-400 hover:bg-richblue-600'>Login</Link>
                )
              }
              
            </div>
            
          
        </div>


      </div>
    </header>
  )
}

export default Header