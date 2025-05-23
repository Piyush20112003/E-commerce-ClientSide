import React, { useEffect, useState } from 'react'
import UploadProduct from '../components/UploadProduct'
import SummaryApi from '../common'
import AdminProductCard from '../components/AdminProductCard'

const AllProducts = () => {

  const [openUploadProduct,setOpenUploadProduct] = useState(false)
  const [allProduct,setAllProduct] = useState([])

  const fetchAllProduct = async() =>{
    const response = await fetch(SummaryApi.allProduct.url)
    const dataResponse = await response.json()

    console.log("product data",dataResponse)

    setAllProduct(dataResponse?.data || [])
  }

  useEffect(()=>{
    fetchAllProduct()
  },[])

  return (
    <div>
      <div className='bg-white py-2 px-4 flex justify-between items-center'>
        <h2 className='font-extrabold text-xl text-caribbeangreen-700'>All Products</h2>
        <button  className='border-2 font-bold hover:font-semibold border-caribbeangreen-400 text-caribbeangreen-500 hover:bg-caribbeangreen-600 hover:text-white transition-all hover:scale-105 py-2 px-3 rounded-full' onClick={() => setOpenUploadProduct(true)}>Upload Product</button>
      </div>

      {/**all product */}
      <div className='flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll'>
          {
            allProduct.map((product,index)=>{
              return(
                <AdminProductCard data={product} key={index+"allProduct"} fetchdata={fetchAllProduct}/>
                
              )
            })
          }
        </div>

     {/**upload product component */}

      {
        openUploadProduct && (
          <UploadProduct onClose={()=>setOpenUploadProduct(false)} fetchdata={fetchAllProduct}/>
        )
      }

    </div>
  )
}

export default AllProducts