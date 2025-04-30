import { BrowserRouter,Routes,Route } from "react-router-dom";
import {useState,useEffect} from 'react';
import {UserContext} from './components/UserContext'
import { ToastContainer } from "react-toastify";
import Product from "./components/Product";
import Details from "./components/Details";
import Cart from './components/Cart'
import Login from './components/Login'
import Register from "./components/Register";
import Navbar  from './components/Navbar'
import Protected from './components/Protected'
import Dashboard from './components/Dashboard'
import Wishlist from './components/Wishlist';
import ForgotPassword from "./components/ForgotPassword";
import CheckOut from './components/CheckOut'
import Footer from "./components/Footer";
function App() {
  const [product, setProduct] =useState([])
  const [wishlist, setWishlist] =useState(()=>{
      const liked= localStorage.getItem('wishlist')
      return liked? JSON.parse(liked):[]
  })
  const [cart,setCart]=useState(()=>{
      const storedCart= localStorage.getItem('cart')
      return storedCart? JSON.parse(storedCart):[]
  })
  const [loggedIn, setLoggedIn]=useState()
  useEffect(()=>{
    localStorage.setItem("cart",JSON.stringify(cart)) 
  },[cart])
  useEffect(()=>{
    const token= localStorage.getItem('token')
    setLoggedIn(!!token)
  },[])
  useEffect(()=>{
     localStorage.setItem("wishlist", JSON.stringify(wishlist))
  }, [wishlist])
  return (
    <UserContext.Provider value={{cart,setCart ,product, setProduct, loggedIn, setLoggedIn, wishlist, setWishlist}} >
   <BrowserRouter>
   {loggedIn&& <Navbar />}
   <Routes>
    <Route path="/" element={<Login/>} />
    <Route path="/forgotpassword"element={<ForgotPassword/>} />
    <Route path="/Dashboard" element={ <Dashboard/>} />
    <Route path="/register" element={<Register/> } />
    <Route path="/product" element={<Protected> <Product /></Protected>}/>
    <Route path="/product/:id" element= {<Protected> <Details /></Protected>} />
    <Route path="/product/cart" element={<Protected> <Cart /> </Protected>} />
    <Route path="/wishlist" element={<Protected><Wishlist /></Protected>} />
    <Route path="/CheckOut"  element={<Protected><CheckOut/></Protected>} />
    <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
    <Footer />
   </BrowserRouter>
   <ToastContainer position="top-center" autoClose={3000} hideProgressBar={true}  />
   </UserContext.Provider>
  );
}

export default App;
