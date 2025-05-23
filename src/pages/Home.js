import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  return (
    <div>
        <CategoryList/>
        <BannerProduct/>

        <HorizontalCardProduct category={"airpodes"} heading={"Best Airpodes"}/>

        <HorizontalCardProduct category={"watches"} heading={"Trending Watches"}/>

       <VerticalCardProduct category={"mobiles"} heading={"Smartphones"}/>

       <VerticalCardProduct category={"Mouse"} heading={"Mouse"}/>

       <VerticalCardProduct category={"televisions"} heading={"Television's"}/>

       <VerticalCardProduct category={"camera"} heading={"Camera & Photography"}/>'
       '
       <VerticalCardProduct category={"earphones"} heading={"Wired Earphone's & Headphone's"}/>

       <VerticalCardProduct category={"speakers"} heading={"Bluetooth Speaker's"}/>

       <VerticalCardProduct category={"refrigerator"} heading={"Refrigerator"}/>

       <VerticalCardProduct category={"trimmers"} heading={"Trimmer's"}/>

       <VerticalCardProduct category={"printers"} heading={"Printer's"}/>

       <VerticalCardProduct category={"processor"} heading={"Processor's"}/>



    </div>
  )
}

export default Home