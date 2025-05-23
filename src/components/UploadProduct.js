import React, { useState } from 'react'
import { IoClose } from "react-icons/io5";
import productCategory from '../helpers/productCategory'
import { FaCloudUploadAlt } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import uploadImage from '../helpers/uploadImage';
import DisplayImage from './DisplayImage';
import SummaryApi from '../common'
import {toast} from 'react-toastify'

const UploadProduct = ({
  onClose,
  fetchData
}) => {

  const [data,setData] = useState({
    productName : "",
    brandName : "",
    category : "",
    productImage : [],
    description : "",
    price : "",
    sellingPrice : ""
  })

  const [openFullScreenImage,setOpenFullScreenImage] = useState(false)
  const [fullScreenImage,setFullScreenImage] = useState("")


  const handleOnChange = (e)=>{
    const { name, value} = e.target

    setData((preve)=>{
      return{
        ...preve,
        [name]  : value
      }
    })
  }

  const handleUploadProduct = async(e) => {
  const file = e.target.files[0]
  const uploadImageCloudinary = await uploadImage(file)

  setData((preve)=>{
    return{
      ...preve,
      productImage : [ ...preve.productImage, uploadImageCloudinary.url]
    }
  })
  }

  const handleDeleteProductImage = async(index)=>{
    console.log("image index",index)
    
    const newProductImage = [...data.productImage]
    newProductImage.splice(index,1)

    setData((preve)=>{
      return{
        ...preve,
        productImage : [...newProductImage]
      }
    })
    
  }

  {/**upload product */}
  const handleSubmit = async(e) =>{
    e.preventDefault()
    console.log("Data", data)
    const response = await fetch(SummaryApi.uploadProduct.url,{
      method : SummaryApi.uploadProduct.method,
      credentials : 'include',
      headers : {
        "content-type" : "application/json"
      },
      body : JSON.stringify(data)
    })

    const responseData = await response.json()

    if(responseData.success){
        toast.success(responseData?.message)
        onClose()
        fetchData()
    }
    if(responseData.error){
      toast.error(responseData?.message)
    }
  }


  return (
    <div className='fixed w-full  h-full bg-richblack-100 bg-opacity-60  top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
      <div className='bg-richblack-5 p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden shadow-2xl'>
         
         <div className='flex justify-between items-center '>
          <h2 className='font-extrabold text-xl text-caribbeangreen-700'>Upload Product</h2>
          <div className='w-fit ml-auto text-2xl text-red-500 hover:text-white rounded-md  hover:bg-red-500 cursor-pointer' onClick={onClose}>
            <IoClose />
          </div>
         </div>

         <form className='grid p-4 text-richblue-500  gap-2 overflow-y-scroll h-full pb-5' onSubmit={handleSubmit}>
          <label htmlFor='productName' className='font-bold text-lg'>Product Name :</label>
          <input 
              type='text' 
              id='productName' 
              placeholder='Enter product name' 
              name='productName'
              value={data.productName} 
              onChange={handleOnChange}
              className='p-2 bg-richblack-5 border rounded'
              required
            />

             <label htmlFor='brandName' className='mt-3 font-bold text-lg'>Brand Name :</label>
              <input 
              type='text' 
              id='brandName' 
              placeholder='Enter brand name' 
              value={data.brandName} 
              name='brandName'
              onChange={handleOnChange}
              className='p-2 bg-richblack-5 border rounded'
              required
            />

              <label htmlFor='category' className='mt-3 font-bold text-lg'>Category :</label>
              <select required value={data.category} name='category' onChange={handleOnChange} className='p-2 bg-richblack-5 border rounded'>
                  <option value={""}>Select Category</option>
                  {
                    productCategory.map((el,index)=>{
                      return(
                        <option value={el.value} key={el.value+index}>{el.label}</option>
                      )
                    })
                  }
              </select>

              <label htmlFor='productImage' className='mt-3 font-bold text-lg'>Product Image :
              </label>

              <label htmlFor='uploadImageInput'>
               <div className='p-2 bg-richblack-5 border rounded h-32 w-full flex justify-center items-center cursor-pointer'>
                        <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
                          <span className='text-2xl text-richblack-400 rounded-full'><FaCloudUploadAlt/></span>
                          <p className='text-sm'>Upload Product Image</p>
                          <input type='file' id='uploadImageInput'  className='hidden' 
                          onChange={handleUploadProduct}
                          />
                        </div>
               </div>
              </label>

              <div>
                  {
                    data?.productImage[0] ? (
                        <div className='flex items-center gap-2'>
                            {
                              data.productImage.map((el,index)=>{
                                return(
                                  <div className='relative group'>
                                      <img 
                                        src={el} 
                                        alt={el} 
                                        width={80} 
                                        height={80}  
                                        className='bg-richblack-5 cursor-pointer rounded-md' 
                                        onClick={()=>{
                                          setOpenFullScreenImage(true)
                                          setFullScreenImage(el)
                                        }}
                                        />

                                        <div className='absolute bottom-0 right-0 p-1 text-white bg-red-500 rounded-full hidden group-hover:block cursor-pointer' onClick={()=>handleDeleteProductImage(index)} 
                                          >
                                          <AiFillDelete />
                                        </div>
                                  </div>
                                  
                                )
                              })
                            }
                        </div>
                    ) : (
                      <p className='text-red-700 font-medium text-xs'>Please upload product image*</p>
                    )
                  }
                  
              </div>

              <label htmlFor='price' className='mt-3 font-bold'>Price :</label>
              <input 
                type='number' 
                id='price' 
                placeholder='Enter price' 
                value={data.price} 
                name='price'
                onChange={handleOnChange}
                className='p-2 bg-richblack-5 border rounded'
                required
              />

              <label htmlFor='sellingPrice' className='mt-3 font-bold'>Selling Price :</label>
              <input 
                type='number' 
                id='sellingPrice' 
                placeholder='Enter selling price' 
                value={data.sellingPrice} 
                name='sellingPrice'
                onChange={handleOnChange}
                className='p-2 bg-richblack-5 border rounded'
                required
              />

              <label htmlFor='description' className='mt-3 font-bold'>Description :</label>
              <textarea 
                className='h-28 bg-richblack-5 border resize-none p-1 rounded-md' 
                placeholder='Enter product description' 
                rows={3} 
                onChange={handleOnChange} 
                name='description'
                value={data.description}
              >
              </textarea>


              <button className='px-3 py-2 bg-richblue-400 text-richblack-25 mb-10 rounded-2xl transition-all font-bold hover:bg-richblue-700'>Upload Product</button>

         </form>
      </div>

      {/***display image full screen */}
      {
        openFullScreenImage && (
          <DisplayImage onClose={()=>setOpenFullScreenImage(false)} imgUrl={fullScreenImage}/>
        )
       }
    </div>
  )
}

export default UploadProduct