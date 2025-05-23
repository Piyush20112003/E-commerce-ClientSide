import React, { useContext, useState } from 'react'
import loginIcons from '../assets/signin.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';

const Login = () => {

    const[showPassword, setShowPassword] = useState(false)

    const [data, setData] = useState({
        email: '',
        password: ''
    })
    const navigate = useNavigate()
    const { fetchUserDetails, fetchUserAddToCart } = useContext(Context)
    

    const handleOnChange = (e) => {
        const {name, value} = e.target
        setData((preve) => {
            return {
                ...preve,
                [name] : value
            }
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault()

        const dataResponse = await fetch(SummaryApi.signIn.url,{
            method : SummaryApi.signIn.method,
            credentials : 'include',
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify(data)
        })
        const dataApi = await dataResponse.json()

        if(dataApi.success){
            toast.success(dataApi.message)
            navigate('/')
            fetchUserDetails()
            fetchUserAddToCart()
        }
        if(dataApi.error){
            toast.error(dataApi.message)
        }
    }
    // console.log("data login",data)


  return (
    <section id='login'>
        <div className='mx-auto container p-4 '>
            
           <div className='bg-richblack-5 p-5 w-full max-w-sm mx-auto rounded-md shadow-2xl'>
             <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full '>
              <img src={loginIcons} alt='login icons' />
             </div> 

             <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
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
                    <Link to={'/forgot-password'} className='block w-fit ml-auto hover:underline text-richblue-400 hover:text-richblue-700'>Forgot password ?
                    </Link>
                </div>
                <button className='bg-richblue-400 hover:bg-richblue-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Login</button>

            
             </form>

             <p className='my-5'>Don't have account ? <Link to={"/sign-up"} className=' text-richblue-400 hover:text-richblue-700 hover:underline'>Sign up</Link></p>
           </div>

        </div>

    </section>
  )
}

export default Login