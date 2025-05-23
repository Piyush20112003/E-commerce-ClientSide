import React, { useContext, useEffect, useState } from 'react'
import SummaryApi from '../common'
import Context from '../context'
import displayINRCurrency from '../helpers/displayCurrency'
import { MdDelete } from "react-icons/md";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { IoCaretBackCircleSharp } from "react-icons/io5";
import { Link } from 'react-router-dom'

const Cart = () => {
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)
    const context = useContext(Context)
    const loadingCart = new Array(4).fill(null)


    const fetchData = async() =>{
        
        const response = await fetch(SummaryApi.addToCartProductView.url,{
            method : SummaryApi.addToCartProductView.method,
            credentials : 'include',
            headers : {
                "content-type" : 'application/json'
            },
        })
       
        const responseData = await response.json()

        if(responseData.success){
            setData(responseData.data)
        }

    }

    const handleLoading = async() =>{
        await fetchData()
    }

    useEffect(()=>{
        setLoading(true)
        handleLoading()
        setLoading(false)
    },[])


    const increaseQty = async(id,qty) =>{
        const response = await fetch(SummaryApi.updateCartProduct.url,{
            method : SummaryApi.updateCartProduct.method,
            credentials : 'include',
            headers : {
                "content-type" : 'application/json'
            },
            body : JSON.stringify(
                {   
                    _id : id,
                    quantity : qty + 1
                }
            )
        })

        const responseData = await response.json()

        if(responseData.success){
            fetchData()
        }
    }


    const decraseQty = async(id,qty) =>{
       if(qty >= 2){
            const response = await fetch(SummaryApi.updateCartProduct.url,{
                method : SummaryApi.updateCartProduct.method,
                credentials : 'include',
                headers : {
                    "content-type" : 'application/json'
                },
                body : JSON.stringify(
                    {   
                        _id : id,
                        quantity : qty - 1
                    }
                )
            })

            const responseData = await response.json()


            if(responseData.success){
                fetchData()
            }
        }
    }

    const deleteCartProduct = async(id)=>{
        const response = await fetch(SummaryApi.deleteCartProduct.url,{
            method : SummaryApi.deleteCartProduct.method,
            credentials : 'include',
            headers : {
                "content-type" : 'application/json'
            },
            body : JSON.stringify(
                {   
                    _id : id,
                }
            )
        })

        const responseData = await response.json()

        if(responseData.success){
            fetchData()
            context.fetchUserAddToCart()
        }
    }

    const totalQty = data.reduce((previousValue,currentValue)=> previousValue + currentValue.quantity,0)
    const totalPrice = data.reduce((preve,curr)=> preve + (curr.quantity * curr?.productId?.sellingPrice) ,0)

    

  return (
    <div className='container mx-auto'>
        
        <div className='ml-5'>
           <button className='bg-richblack-600 rounded-full hover:scale-90 transition-all p-0.5'>
            <Link to={'/'}>
                  <IoCaretBackCircleSharp size={36} className='text-richblack-100  rounded-full'/>
            </Link>
           </button>
        </div>
        <div className='text-center text-lg my-3 font-semibold'>
            {
                data.length === 0 && !loading && (
                    <p className='bg-white py-5 text-pink-400 shadow-lg'>Cart is Empty</p>
                )
            }
        </div>

        <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>   
                {/***view product */}
                <div className='w-full max-w-4xl'>
                    {
                        loading ? (
                            loadingCart?.map((el,index) => {
                                return(
                                    <div key={el+"Add To Cart Loading"+index} className='w-full bg-slate-200 h-32 my-3 border border-slate-300 animate-pulse rounded'>
                                    </div>
                                )
                            })
                             
                        ) : (
                          data.map((product,index)=>{
                           return(
                            <div key={product?._id+"Add To Cart Loading"} className='w-full bg-white h-32 my-3 border shadow-xl border-slate-300  rounded grid grid-cols-[128px,1fr]'>
                                <div className='w-32 h-32 bg-slate-200'>
                                    <img src={product?.productId?.productImage[0]} className='w-full h-full hover:scale-95 object-scale-down mix-blend-multiply' />
                                </div>
                                <div className='px-4 py-2 relative'>
                                    {/**delete product */}
                                    <div className='absolute right-2 text-richblack-300 rounded-full p-2 hover:bg-red-500 hover:text-richblack-5 cursor-pointer hover:scale-90 transition-all ' onClick={()=>deleteCartProduct(product?._id)}>
                                        <MdDelete size={20}/>
                                    </div>

                                    <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1 font-semibold text-caribbeangreen-700'>{product?.productId?.productName}</h2>
                                    <p className='capitalize text-slate-500'>{product?.productId.category}</p>
                                    <div className='flex items-center justify-between'>
                                            <p className='text-richblue-500 font-semibold text-lg'>{displayINRCurrency(product?.productId?.sellingPrice)}</p>
                                            <p className='text-caribbeangreen-400 font-semibold text-lg'>{displayINRCurrency(product?.productId?.sellingPrice  * product?.quantity)}</p>
                                    </div>
                                    <div className='flex items-center gap-3 mt-1'>
                                        <button className='border border-richblue-600 text-richblue-600 hover:bg-richblue-600 hover:text-white w-6 h-6 flex justify-center items-center rounded hover:scale-90 transition-all ' onClick={()=>decraseQty(product?._id,product?.quantity)}><FaMinus /></button>
                                        <spanc className='text-red-400 font-semibold'>{product?.quantity}</spanc>
                                        <button className='border border-richblue-600 text-richblue-600 hover:bg-richblue-600 hover:text-white w-6 h-6 flex justify-center items-center rounded hover:scale-90 transition-all ' onClick={()=>increaseQty(product?._id,product?.quantity)}><FaPlus /></button>
                                    </div>
                                </div>    
                            </div>
                           )
                          })
                        )
                    }
                </div>


                {/***summary  */}
                <div className='mt-5 lg:mt-0 w-full max-w-sm rounded-md '>
                        {
                            loading ? (
                            <div className='h-36 bg-slate-200 border border-slate-300 animate-pulse rounded-md'>
                                
                            </div>
                            ) : (
                                <div className='h-36 bg-white rounded-md shadow-xl'>
                                    <h2 className='text-white bg-richblue-200 px-4 py-2 rounded-sm font-semibold'>Summary</h2>
                                    <div className='flex items-center justify-between p-4 px-4 gap-2 font-semibold text-lg text-caribbeangreen-600 '>
                                        <p>Quantity:</p>
                                        <p className='text-richblack-400 font-semibold'>{totalQty}</p>
                                    </div>

                                    <div className='flex items-center justify-between px-4 gap-2 font-semibold text-lg text-caribbeangreen-600'>
                                        <p>Total Price:</p>
                                        <p className='text-richblack-400 font-semibold' >{displayINRCurrency(totalPrice)}</p>    
                                    </div>

                                    <button className='bg-red-500 p-2 text-richblack-25 w-full rounded-md hover:bg-red-700 hover:text-white mt-2  font-semibold transition-all'>Payment</button>

                                </div>
                            )
                        }
                </div>
        </div>
    </div>
  )
}

export default Cart