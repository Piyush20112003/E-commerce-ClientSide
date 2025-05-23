import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import SummaryApi from '../common'
import VerticalCard from '../components/VerticalCard'
import { IoCaretBackCircleSharp } from "react-icons/io5";

const SearchProduct = () => {
    const query = useLocation()
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)

    console.log("query",query.search)

    const fetchProduct = async()=>{
        setLoading(true)
        const response = await fetch(SummaryApi.searchProduct.url+query.search)
        const dataResponse = await response.json()
        setLoading(false)

        setData(dataResponse.data)
    }

    useEffect(()=>{
        fetchProduct()
    },[query])

  return (
    <div className='container mx-auto p-4'>
      <div className='ml-4'>
                 <button className='bg-richblack-600 rounded-full hover:scale-90 transition-all p-0.5'>
                  <Link to={'/'}>
                        <IoCaretBackCircleSharp size={36} className='text-richblack-100  rounded-full'/>
                  </Link>
                 </button>
              </div>
      {
        loading && (
          <p className='text-lg text-center text-caribbeangreen-600 font-bold'>
            Loading Product ...</p>
        )
      }
 
      <p className='text-lg font-bold my-3 text-caribbeangreen-600'>Search Results : {data.length}</p>

      {
        data.length === 0 && !loading && (
           <p className='bg-white text-lg text-center p-4 text-caribbeangreen-600 font-bold shadow-xl'>No Product Found...</p>
        )
      }

      {
        data.length !==0 && !loading && (
          <VerticalCard loading={loading} data={data}/>
        )
      }

    </div>
  )
}

export default SearchProduct