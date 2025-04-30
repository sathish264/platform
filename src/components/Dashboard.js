import { UserContext } from './UserContext';
import {useContext, useEffect} from 'react'
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import axios from 'axios'
export default function Dashbord(){
    const {product ,setProduct} =useContext(UserContext)

    useEffect(()=>{
        const fetchData = async()=>{
         try{
             const response = await axios.get("https://fakestoreapi.com/products");
              setProduct(response.data)
         }catch(err){
             console.group("Data is not retrieved" , err)
         }
        }
     fetchData();
    }, [setProduct])
    // star rating
    const render=(rating)=>{
      return Array.from({ length: 5 }, (_, index) => {
        const starValue = index + 1;
       if(rating>=starValue){
          return <FaStar  key={index}  style={{color:"gold"}}/>
       } else if( rating>= starValue-0.5){
        return <FaStarHalfAlt   key={index}  style={{color:"gold"}}/>
     } else{
       return <FaRegStar   key={index}  style={{color:"gold"}}/>
     }
      })
    }
    
     return (

         <div className="container">
                     <div className="grid_container">
                     {
                       product.map((items, index)=>(
                         <div  key={items.id} className="items_card">
               
                            <div>
                               <img src={items.image} alt={items.category}  className="image"/>
                            </div>
                            <div className="items_content">
                                 <p>{items.title}</p>
                                 <div>
                                    <p>{render(items.rating.rate)}<span className="m-2 text-success fw-500">{items.rating.rate}</span></p>
                                  </div>
                                 <p> Price: &#36;{items.price}</p>
                            </div>
                          </div>
                       ))
                     }
                   </div>
                   </div>
    
     )
}
