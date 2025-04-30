import {Link, Outlet,useNavigate} from 'react-router-dom'
import {useContext} from 'react'
import {UserContext} from './UserContext'
export default function Navbar(){
    const {cart, setCart, setLoggedIn, wishlist}=useContext(UserContext)
    const navigate=useNavigate()
    const handleLogOut =()=>{
       localStorage.removeItem("token")
       localStorage.removeItem("cart")
       setCart([])
       setLoggedIn(false)
       navigate('/')
    }
    
    return(
      <>
      <div className="top_nav">
        <div  className="nav_container">
        <div> 
          <input type='search' placeholder="Search Item" className=" form-control rounded-pill"/>
        </div>
        <div className="nav_content" >
        <Link to="/product" style={{color:'black'}}><i className="bi bi-house"></i></Link>
        <Link to="/wishlist"  style={{color:'black'}} > <i className="bi bi-heart position-relative">{(wishlist.length>0)&& <span className="cart_badge">{wishlist.length}</span>}</i>   </Link>
          <Link to="/product/cart" style={{color:'black'}} ><i className="bi bi-cart position-relative">{
              (cart.length>0)&&
              <span className="cart_badge">{cart.length}</span>
             }
               </i> </Link>
        </div>
        </div>
      </div>
      <div className="bottom_nav">
       <ul>  
          <li><Link to="/Dashboard"> <i className="bi bi-house-door-fill"></i></Link></li>
           <li><Link to="/product"><i className="bi bi-person-standing-dress" ></i></Link></li>
           <li><Link to="/product/cart"><i className="bi bi-bag" ></i></Link></li>
           <li onClick={handleLogOut}><i className="bi bi-box-arrow-right"></i> </li>
       </ul>
       </div>
       <Outlet />
      </>     
    )
}