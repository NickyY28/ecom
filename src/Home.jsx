import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SmartPhones from './SmartPhones'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Home = (props) => {    //xyz function ko props ke andar Home component ko milega. Iska matlab hai, Home component ab xyz function ko directly access kar sakta hai.
  console.log(props.det)
  
    const[arr,setarr] = useState([])
    const [loader, setloader] = useState(true)

    const xyz = async () => {
            let res = await fetch('https://dummyjson.com/products?limit=0');
            let data = await res.json();
            setloader(false)
            console.log(data);
            console.log(data.products)
            setarr(data.products)
            // if(props.category==="all"){
            //   let newArr=data.products
            //   setarr(newArr)
    
            //   }
            //   else{
            //     let newArr=data.products.filter((value)=> value.category.includes(props.category) )
            //     setCurrentPage(1)
            //     setarr(newArr)
            //   }
    
    }
    useEffect(()=>{
        xyz()
    },[props.category])
    const handleView = (ans)=>{
      console.log(ans)
     
    }
  
  
    const handleCart = (ans)=>{
      console.log(ans)
      props.xyz(ans) //yaha ans me hum ele bhej rhe h jo ek object h which had data of each item
      //Ab Home component mein jab bhi koi item add karne ki zarurat hoti hai, woh xyz function ko call karta hai.
    }
    // handleCart(ele) mein kya ho raha hai?
// Tum jab handleCart(ele) call karte ho, toh tum ele (product data) ko xyz function ko pass kar rahe ho.
// Yani tum ele ko props.xyz ke through App.js mein jo xyz function hai, usko de rahe ho.

// ----------------------------pagination starts here-----------------------------------
 const [currentPage, setCurrentPage] = useState(1);
  let itemPerPage = 8
  let lastIndex = itemPerPage * currentPage
  let firstIndex = lastIndex - itemPerPage
 let filteredArr = arr.filter(item =>
  item.category.toLowerCase().includes(props.det.toLowerCase()) || item.title.toLowerCase().includes(props.det.toLowerCase()));
  const paginatedArr = filteredArr.slice(firstIndex, lastIndex);
  let numberOfbtn = Math.ceil(filteredArr.length/itemPerPage)
  // setarr(paginatedArr)
    
  function handleNext(){
    if(currentPage<=numberOfbtn-1){
      setCurrentPage(currentPage+1)
    }
  }
  function handlePrev(){
    if(currentPage>=2){
      setCurrentPage(currentPage-1)
    }
  }
  function handlePage(page){
    setCurrentPage(page)
  }

   
    return (
    <div>
      <div className="font-sans p-4 mx-auto lg:max-w-7xl md:max-w-4xl max-w-xl">
     
     <h1 className='text-3xl my-2'>SmartPhones</h1>
     <SmartPhones arr={arr}/>
    <div  className="grid  grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
    { loader ?
          Array(8).fill('').map((object)=>{
            return <div className='min-h-[600px] bg-white p-4 border relative'>
               <SkeletonTheme baseColor='' highlightColor='gray'>
                <Skeleton height={300}></Skeleton>
                <Skeleton height={20} className='mt-10' width={200}></Skeleton>
                <Skeleton height={20} className='mt-5' width={100}></Skeleton>
                 <div className='flex  gap-4 justify-between absolute bottom-12 left-[50%] translate-x-[-50%]'>
                  <Skeleton height={40} width={130} ></Skeleton>
                  <Skeleton height={40} width={130} ></Skeleton>
                  </div>               
               </SkeletonTheme>
            </div>
          })
         :
          paginatedArr.map((object,i)=>{ //ele tumhare arr.map() ke andar ek object hai. Yeh object har product ka data rakhta hai, jo tum fetch kar rahe ho (data.products).
            return <Link to={'/view'} state={object} key={object.id}><div  className=" p-4 pb-8 bg-white border rounded-md relative max-sm:p-10 max-sm:pb-16 hover:shadow-lg transition min-h-[640px]">
            <div className="flex items-center justify-center border h-[300px]">
               <img src={object.thumbnail} alt="" className='bg-blue-50 h-full object-contain'/>
            </div>
           <div className="flex items-center justify-between   mt-6">
           <div className="flex items-center justify-stat  gap-1">
            {
             Array(5).fill('').map((star,i)=>{
                 return Math.round(object.rating)>=i+1 ? <span key={i} className='bi bi-star-fill b text-orange-400 '></span>:
                 <span key={i} className='bi bi-star-fill text-gray-400 '></span>
             })
            }
            </div>
            <span>{object.rating}</span>
           </div>
           
           <h1 className=' text-xl font-[inter] font-bold'>&#8377;{(object.price-(object.discountPercentage*object.price)/100).toFixed(2)} <sub className='font-normal text-red-500'><del className='text-gray-600'>MRP:&#8377;{object.price}</del>(-{object.discountPercentage}%)</sub></h1>
           <div className="flex items-center gap-2 my-8 mb-10">
           <button className='flex-grow py-2 bg-gradient-to-tr from-blue-700 to-blue-400 rounded-sm text-white font-semibold'>Buy Now</button>
           <Link to={'/'}  className='flex-grow border'> <button onClick={()=>handleCart(object)} className='border border-blue-800 rounded-sm py-1.5 w-full text-blue-800 transition capitalize hover:bg-blue-700 hover:border-blue-700 flex items-center justify-center gap-2 font-bold hover:text-white font-font-head'><span className='bi bi-cart-plus text-xl'></span> cart</button></Link>
           </div> 
           <span className={`font-semibold text-right block ${object.availabilityStatus[0]=='I' ? 'text-green-500': 'text-red-500'}`}>{object.availabilityStatus}</span>
           
      </div>
      </Link>
          
        })
      } 
      </div>

    <ul className='flex items-center justify-center bg-white my-4'>
       <li><span className="bi bi-chevron-left"></span></li>
          <li onClick={handlePrev} className='px-4 py-2 border hover:bg-gray-500 cursor-pointer '>Previous</li>
          {
          Array(numberOfbtn).fill('').map((btn,i)=>{
      return <li key={i} onClick={()=>handlePage(i+1)} className={`px-2 py-2 border hover:bg-gray-500 flex-grow text-center cursor-pointer ${(i+1)==currentPage ? 'bg-blue-600 text-white border-none' : 'bg-white'}`}>{i+1}</li>
          })
          }
        <li onClick={handleNext} className='px-4 py-2 border hover:bg-gray-500'>Next</li>
        <li><span className="bi bi-chevron-right"></span></li>
    </ul>
    </div>
  </div>
  )
}

export default Home


