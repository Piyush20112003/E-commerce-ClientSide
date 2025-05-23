import React, { useState } from 'react'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate  } from 'react-router-dom';
import loginIcons from '../assets/signin.gif'
import imageTobase64 from '../helpers/imageTobase64';
import SummaryApi from '../common';
import { toast } from 'react-toastify';


const SignUp = () => {
      const[showPassword, setShowPassword] = useState(false)
      const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
      const [data,setData] = useState({
        email : "",
        password : "",
        name : "",
        confirmPassword : "",
        profilePic : "",
      })
  
      const navigate = useNavigate()

      const handleOnChange = (e) =>{
        const { name , value } = e.target
  
        setData((preve)=>{
            return{
                ...preve,
                [name] : value
            }
        })
      } 

      const handleUploadPic = async (e) => {
        const file = e.target.files[0];
      
        // Check file size (example: 4MB limit)
        if (file.size > 4 * 1024 * 1024) {
          toast.error("File size should be less than 4MB");
          return;
        }
      
        const imagePic = await imageTobase64(file);
      
        setData((preve) => ({
          ...preve,
          profilePic: imagePic,
        }));
      };
      

  
      const handleSubmit = async (e) => {
        e.preventDefault();
      
        if (data.password !== data.confirmPassword) {
          toast.error("Please check password and confirm password");
          return;
        }
      
        try {
          const dataResponse = await fetch(SummaryApi.signUP.url, {
            method: SummaryApi.signUP.method,
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(data),
          });
      
          if (!dataResponse.ok) {
            // Handle specific error
            if (dataResponse.status === 413) {
              toast.error("Uploaded image is too large");
            } else {
              toast.error(`Error: ${dataResponse.statusText}`);
            }
            return;
          }
      
          const dataApi = await dataResponse.json();
      
          if (dataApi.success) {
            toast.success(dataApi.message);
            navigate("/login");
          } else if (dataApi.error) {
            toast.error(dataApi.message);
          }
        } catch (error) {
          toast.error("Something went wrong");
          console.error(error);
        }
      };
  

            
  return (
     <section id='signup'>
        <div className='mx-auto container p-4 '>
            {/* Icon */}
           <div className='bg-richblack-5 p-5 w-full max-w-sm mx-auto rounded-md shadow-2xl'>
             <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
               <div>
                <img src={data.profilePic || loginIcons} alt='login icons' />
               </div>

               <form>
                <label>
                  <div className='text-xs bg-opacity-80 bg-slate-300 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full hover:scale-90 transition-all'>
                   Upload Photo
                  </div>
                  <input type='file' className='hidden' onChange={handleUploadPic}/>
                </label>
                 
               </form>
               
             </div> 

            {/*Name*/} 
             <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
                <div className='grid'>
                    <label>Name :</label>
                    <div className='bg-slate-200 p-2 rounded-lg' >
                        <input className='w-full h-full outline-none bg-transparent'
                        type='text'              placeholder='Enter your name' 
                        name='name'
                        required
                        onChange={handleOnChange}
                        value={data.name}
                        />
                    </div>
                </div>
               {/* Email field */}
                <div className='grid'>
                    <label>Email :</label>
                    <div className='bg-slate-200 p-2 rounded-lg' >
                        <input className='w-full h-full outline-none bg-transparent'
                        type='email'              placeholder='Enter email' 
                        name='email'
                        required
                        onChange={handleOnChange}
                        value={data.email}
                        />
                    </div>
                </div>
               {/* Password Field */}
               
                <div>
                    <label>Password :</label>
                    <div className='bg-slate-200 p-2 flex rounded-lg' >
                        <input className='w-full h-full outline-none bg-transparent'
                        placeholder='Enter password'
                        onChange={handleOnChange}
                        name='password'
                        required
                        value={data.password}
                        type={showPassword ? 'text' : 'password'}
                        />
                        <div className='cursor-pointer text-xl' onClick={() => setShowPassword((preve) => !preve)}>
                         <span>
                            {
                                showPassword ? (
                                    <FaEyeSlash />
                                ) : (
                                    <FaEye  />
                                )
                            }
  
                         </span>
                        </div>
                    </div>
                </div>
                {/* Confirm password field */}
                <div>
                    <label>Confirm Password :</label>
                    <div className='bg-slate-200 p-2 flex rounded-lg' >
                        <input className='w-full h-full outline-none bg-transparent'
                        placeholder='Enter confirm password'
                        onChange={handleOnChange}
                        name='confirmPassword'
                        required
                        value={data.confirmPassword}
                        type={showConfirmPassword ? 'text' : 'password'}
                        />
                        <div className='cursor-pointer text-xl' onClick={() => setShowConfirmPassword((preve) => !preve)}>
                         <span>
                            {
                                showConfirmPassword ? (
                                    <FaEyeSlash />
                                ) : (
                                    <FaEye  />
                                )
                            }
  
                         </span>
                        </div>
                    </div>
                </div>

                <button className='bg-richblue-400 hover:bg-richblue-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Sign up</button>

             </form>

            <p className='my-5'>Already have account ? <Link to={"/login"} className=' text-richblue-400 hover:text-richblue-700 hover:underline'>Login</Link></p>
           </div>

        </div>

    </section>
  )
}

export default SignUp



