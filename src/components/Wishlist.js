import {UserContext} from './UserContext'
import {useContext}  from 'react';
import {useNavigate} from 'react-router-dom'
export default function Wishlist(){
    const {wishlist} =useContext(UserContext)
    const navigate = useNavigate()
    const handleBack=()=>{
      navigate("/product", {replace:true})
   }
     return(
         <>
          <div style={{marginTop:'85px'}}>
            {
              wishlist.length>0? (
              <div>
                {
                   wishlist.map((items)=>(
                    <div className="card m-3 p-5" key={items.id}>
                    <div  className="d-flex flex-row">
                        <img src={items.image}  alt={items.category} className="wishlist_image"/>
                        <div className="mt-3 ms-3" style={{lineHeight:1.2}}>
                        <p  style={{color:'red', fontFamily:'Roboto', fontWeight:'500'}}>{items.title}</p>
                        <p> <em style={{color:'green', fontWeight:'500'}}>category :</em> {items.category}</p>
                        <p> <strong> Price:</strong> &#36;{items.price}</p>
                        <strong>Description</strong>
                        <p style={{marginTop:"3px"}}>{items.description}</p>
                        </div>
                    </div>
                    </div>
                   ))
                }
              </div>) : <p> No Items in Wishlist</p>
            }
          </div>
          <button className="btn btn-info mt-2 ms-3 " onClick={handleBack}>Back</button>
         </>
     )
}