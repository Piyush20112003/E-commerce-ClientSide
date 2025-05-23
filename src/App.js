import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer} from 'react-toastify';
import { useEffect, useState } from "react";
import SummaryApi from "./common";
import Context from "./context";
import { setUserDetails } from "./store/userSlice";
import { useDispatch } from "react-redux";

function App(){

  const dispatch = useDispatch()
  const [cartProductCount,setCartProductCount] = useState(0)


  const fetchUserDetails = async()=>{
    const dataResponse = await fetch(SummaryApi.current_user.url,{
      method : SummaryApi.current_user.method,
      credentials : 'include'
    })

    const dataApi = await dataResponse.json()

    
    if(dataApi.success){
      dispatch(setUserDetails(dataApi.data))
    }

    // console.log("data-user", dataResponse)

}

const fetchUserAddToCart = async()=>{
    const dataResponse = await fetch(SummaryApi.addToCartProductCount.url,{
      method : SummaryApi.addToCartProductCount.method,
      credentials : 'include'
    })

    const dataApi = await dataResponse.json()

    setCartProductCount(dataApi?.data?.count)
  }
   
  useEffect(()=>{
    /**user Details */
    fetchUserDetails()
    /**user Details cart product */
    fetchUserAddToCart()

  },[])


  return(
    <>

    <Context.Provider value={{
        fetchUserDetails, // user detail fetch
        cartProductCount, // current user add to cart product count,
          fetchUserAddToCart 
         
    }}>

    <ToastContainer position="top-center" />

    <Header/>    
     <main className="min-h-[calc(100vh-60px)] pt-20 font-inter">
     <Outlet/>
     </main>
    
    <Footer/>
    </Context.Provider>

    </>
  ) 
}

export default App;