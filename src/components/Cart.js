import {useContext, useState, useEffect} from 'react'
import { toast } from 'react-toastify'
import { UserContext } from './UserContext'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
export default function Cart(){
   const navigate = useNavigate()
    const {cart,setCart}= useContext(UserContext)
    const [price, setPrice] =useState(0)
    const handleOrder=()=>{
       navigate("/CheckOut")
    }
    const handleRemove= async(items)=>{
      const confirmDelete = window.confirm(`Are you sure you want to remove ${items.title} ?`);
      if(!confirmDelete) return ;
      try{
         const response= await axios.delete(`http://localhost:8080/cart/${items.id}`)
          alert(JSON.stringify(response.data))
          setCart((prevCart)=>
            prevCart.filter(product=> product.id!==items.id)
        )
         toast.warning(`${items.title} has been removed.`);
      }catch(err){
         console.log("Database error", err)
      }
    
  
    }
    useEffect(()=>{
       if(cart.length===0 && price===0){
        navigate("/product")
       }
    },[cart, price,navigate])
    const handleContinue=()=>{
       navigate('/product', {replace:true})
    }
    const handleLogin=()=>{
       navigate('/')
    }
    useEffect(()=>{
      let totalPrice = cart.reduce((acc, curr)=>acc+curr.price*curr.quantity,0)
     setPrice(totalPrice)
  
    }, [cart])
    const  SGST=  (9/100)*price 
    
    
     return(
       <div style={{marginTop:'75px'}} className="main_content">
           {
             cart.length===0? 
             <div className="d-flex justify-content-center align-items-center vh-100">
             <div className="card w-50 p-3">
                <i className="bi bi-bag" style={{textAlign:'center'}}> </i>
                <p style={{textAlign:'center'}}>No cart Items</p>
                <div style={{textAlign:'center'}}>
                <button className="btn btn-secondary" onClick={handleContinue}>Continue</button>
                <button className="btn btn-danger ms-3" onClick={handleLogin}>Login</button>
                </div>
             </div> 
             </div>:  <div>
               {
                 cart.map((items, index)=>(
                   <div className="card p-3 m-2" key={items.id} style={{lineHeight:"0.8"}}>
                     <div className="d-flex">
                     <img src={items.image}  alt={items.category} className="wishlist_image"/>
                  <div style={{lineHeight:1.0}} className="m-4" >
                       <p>{items.title}</p>
                       <p>{items.category}</p>
                       <p> Price : &#36;{items.price*items.quantity}</p>
                       <p>Quantity: {items.quantity}</p>
                       <button className="btn btn-danger" onClick={()=>handleRemove(items)}> Remove</button>
                   </div>
                   </div>
                  </div>
                 ))
               } 
                
                </div>
           }
          <div className="card p-3 m-2">
  <div>
    <h5>Bill Summary</h5>

    <div className="d-flex justify-content-between">
      <p>Total Price:</p>
      <p>&#36;{price.toFixed(2)}</p>
    </div>

    <div className="d-flex justify-content-between">
      <p>SGST (9%):</p>
      <p>&#36;{SGST.toFixed(2)}</p>
    </div>

    <div className="d-flex justify-content-between">
      <p>CGST (9%):</p>
      <p>&#36;{SGST.toFixed(2)}</p>
    </div>

    <hr />

    <div className="d-flex justify-content-between">
      <p><strong>Grand Total:</strong></p>
      <p><strong>&#36;{(price + SGST * 2).toFixed(2)}</strong></p>
    </div>
  </div>
</div>

         <div className="m-2 mb-5">
                    <button className="btn btn-success" style={{float:"right"}} onClick={handleOrder}>Proceed to check Out</button>
          </div>
       </div>
      

     )
   }