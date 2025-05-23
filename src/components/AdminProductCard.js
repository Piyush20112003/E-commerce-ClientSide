import React, { useState } from 'react'
import { MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';
import displayINRCurrency from '../helpers/displayCurrency';

const AdminProductCard = ({
    data,
    fetchdata
}) => {
    const [editProduct,setEditProduct] = useState(false)

  return (
    <div className='bg-white p-4 rounded shadow-xl '>
       <div className='w-40'>

            <div className='w-40 h-32 flex justify-center items-center'>
              <img src={data?.productImage[0]}  className='mx-auto object-fill h-full hover:scale-90 transition-all'/>   
            </div> 
            <h1 className='line-clamp-1 text-ellipsis text-richblue-600 font-medium'>{data.productName}</h1>


            <div>

                <p className='font-semibold text-caribbeangreen-700'>
                  {
                    displayINRCurrency(data.sellingPrice)
                  }
        
                </p>

                <div className='w-fit ml-auto p-2 bg-richblack-25 text-richblack-300 hover:bg-caribbeangreen-300 transition-all rounded-full hover:text-richblack-25 cursor-pointer' onClick={()=>setEditProduct(true)}>
                    <MdModeEditOutline/>
                </div>

            </div>    
       </div>
  
        {
          editProduct && (
            <AdminEditProduct productData={data} onClose={()=>setEditProduct(false)} fetchdata={fetchdata}/>
          )
        }
    
    </div>
  )
}

export default AdminProductCard