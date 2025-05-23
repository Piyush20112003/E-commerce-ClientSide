import React from 'react'
import { CgClose } from 'react-icons/cg'

const DisplayImage = ({
    imgUrl,
    onClose
}) => {
  return (
    <div className='fixed bottom-0 top-12 right-0 left-0 flex justify-center items-center bg-richblack-100 bg-opacity-60  '>

        <div className='bg-richblack-25 rounded max-w-5xl mx-auto p-4 '>
                <div className='w-fit ml-auto text-2xl  text-red-500 hover:text-white rounded-md  hover:bg-red-500 cursor-pointer' onClick={onClose}>
                    <CgClose/>
                </div>

                <div className='flex justify-center p-4 max-w-[80vh] max-h-[80vh]'>
                <img src={imgUrl} className='w-full h-full rounded-lg'/>
                </div>
        </div>
  
    </div>
  )
}

export default DisplayImage