import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Home'
import Signin from './Signin'
import Login from './Login'
import Navbar from './Navbar'
import ViewDetails from './ViewDetails'
import Cart from './Cart'
import { toast, ToastContainer } from 'react-toastify'
import Wishlist from './Wishlist'
function App() {
  const [cartArr, setcartArr] = useState([]);
  console.log(cartArr) // Output: []
 function xyz(ans){            //ye function use hoga cart me kuch bhi add krne k liye
  console.log(ans)  //jo bhi clicked object h vo print hoga
  let find = cartArr.find((item)=>item.id === ans.id)
  if (find){
    return toast.warning('item already added',{position:'top-center'})
         }
    else {
      ans.quantity = 1   //item already added nhi h
      setcartArr([...cartArr,ans]) //cartArr =me clicked object add kiya
      toast.success('item added sucessfully',{position:'top-center'})
    }
 }
  const [det,setdet] = useState("")
 function search(ans){
  console.log(ans)
  setdet(ans)
 }
 

  return (
   <BrowserRouter>
   <div className='h-[70px]'>
   <Navbar cartArr={cartArr} search={search}/>
   </div>
   <Routes>
    {/* Home component ko xyz function ek prop ke form mein bhej rahe ho */}
    {<Route path='/' element={<Home xyz = {xyz} det={det}/>} />} 
    <Route path='/signin' element={<Signin/>} />
    <Route path='/login' element={<Login/>} />
    <Route path='/view' element={<ViewDetails xyz={xyz}/>}/>
    <Route path='/cart' element={<Cart cartArr = {cartArr} setcartArr={setcartArr}/>} />
    <Route path='/wishlist' element={<Wishlist/>}/>
   </Routes>
   <ToastContainer/>
   </BrowserRouter>
      
  )
}

export default App
