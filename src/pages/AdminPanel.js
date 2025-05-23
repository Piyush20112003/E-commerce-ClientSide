import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { FaRegCircleUser } from "react-icons/fa6";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import ROLE from '../common/role';

const AdminPanel = () => {
    const user = useSelector(state => state?.user?.user)
    const navigate = useNavigate()


    useEffect(()=>{
        if(user?.role !== ROLE.ADMIN ){
            navigate("/")
        }
    },[user])

  return (
    <div className='min-h-[calc(100vh-120px)] md:flex hidden font-inter'>

        <aside className='bg-white min-h-full  w-64  max-w-60 customShadow'>
                <div className='h-40  flex justify-center items-center flex-col'>
                    <div className='text-5xl rounded-full cursor-pointer relative flex justify-center  shadowshadow-caribbeangreen-300'>
                        {
                        user?.profilePic ? (
                            <img src={user?.profilePic} className='w-20 h-20 rounded-full' alt={user?.name} />
                        ) : (
                            <FaRegCircleUser className='text-richblue-300'/>
                        )
                        }
                    </div>
                    <p className='capitalize text-caribbeangreen-300 text-lg font-semibold'>{user?.name}</p>
                    <p className='text-sm text-red-300'>{user?.role}</p>
                </div>

                 {/***navigation */}       
                <div>   
                    <nav className='grid p-4'>
                        <Link to={"all-users"} className='px-2 py-1 hover:scale-105 hover:bg-richblack-25'>All Users</Link>
                        <Link to={"all-products"} className='px-2 py-1 hover:scale-105 hover:bg-richblack-25'>All product</Link>
                    </nav>
                </div>  
        </aside>

        <main className='w-full h-full p-2'>
            <Outlet/>
        </main>
    </div>
  )
}

export default AdminPanel