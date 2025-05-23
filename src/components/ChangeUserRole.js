import React, { useState } from 'react'
import ROLE from '../common/role'
import { IoMdClose } from "react-icons/io";
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const ChangeUserRole = ({
    name,
    email,
    role,
    userId,
    onClose,
    callFunc,
}) => {
    const [userRole,setUserRole] = useState(role)

    const handleOnChangeSelect = (e) => {
        setUserRole(e.target.value)

        console.log(e.target.value)
    }

    const updateUserRole = async() =>{
        const fetchResponse = await fetch(SummaryApi.updateUser.url,{
            method : SummaryApi.updateUser.method,
            credentials : 'include',
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify({
                userId : userId,
                role : userRole
            })
        })

        const responseData = await fetchResponse.json()

        if(responseData.success){
            toast.success(responseData.message)
            onClose()
            callFunc()
        }

        console.log("role updated",responseData)

    }

  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-between items-center bg-richblack-100 bg-opacity-60'>
       <div className='mx-auto bg-richblack-5  p-4 w-full rounded-lg max-w-sm shadow-2xl border border-opacity-100'>

            <button className='block ml-auto' onClick={onClose}>
                <IoMdClose className='text-red-500 hover:text-white rounded-md  hover:bg-red-500' size={20}/>
            </button>

            <h1 className='pb-4 text-xl font-extrabold'>Change User Role</h1>

             <p className='text-richblue-300'>Name : {name}</p>   
             <p className='text-richblue-300'>Email : {email}</p> 

            <div className='flex items-center justify-between my-4'>
                <p className='text-richblue-300'>Role :</p>  
                <select className=' border border-opacity-100 bg-richblack-5 hover:bg-richblack-25 rounded-md px-4 py-1 text-richblue-400' value={userRole} onChange={handleOnChangeSelect}>
                    {
                        Object.values(ROLE).map(el => {
                            return(
                                <option value={el} key={el}>{el}</option>
                            )
                        })
                    }
                </select>
            </div>


            <button className='w-fit mx-auto block  py-1 px-3 rounded-full bg-richblue-400 text-white hover:bg-richblue-700' onClick={updateUserRole}>Change Role</button>
       </div>
    </div>
  )
}

export default ChangeUserRole