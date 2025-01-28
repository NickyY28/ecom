import React, { useRef } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from 'react-router-dom';

const SmartPhones = (props) => {

    var settings = {
        // dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 5000,
    autoplaySpeed: 0,
    cssEase: "linear",
    responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        }
      ]
        
      };

     

    let smartphones = props.arr.filter((ele)=>ele.category.includes('smart'))
    console.log(smartphones)
  return (
    <div className='h-max p-3 bg-black'>
    <Slider {...settings} >
   {
     smartphones.map((mobile)=>{
       return <Link to={'/view'} state={mobile} className='w-full flex justify-center'>
         <img className='h-[300px] w-[200px] m-auto' src={mobile.thumbnail} alt="" />
         <h1 className='text-center my-2 text-white'>{mobile.title}</h1>
       </Link>
     })
   }

 </Slider>
 </div>
  )
}

export default SmartPhones