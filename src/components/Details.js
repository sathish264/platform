import { useParams, useNavigate } from "react-router-dom"
import {useState, useEffect} from 'react'
import axios from 'axios'
export default function Details(){
    const {id}=useParams();
    const navigate= useNavigate()
    const [products, setProducts] =useState()
    useEffect(()=>{
         const fetchData = async()=>{
             try{
                 const response = await axios.get(`https://fakestoreapi.com/products/${id}`)
                 setProducts(response.data)
             }catch(err){
                 console.log(`product ${id} is not retrived`)
                 alert(id)
             }
         }
         fetchData()
    },[id])
    const handleBack=()=>{
         navigate('/Product')
    }
    return(
        <div  style={{marginTop:'85px'}}>
        {
             products?
             <div  className="d-flex" style={{border:'1px solid gray',marginLeft:'10px', position:'relative', boxShadow:'0px 3px 8px gray', borderStyle:'none'}}>
                <div>
                 <img src={products.image}  alt={products.category} style={{width:'200px',height:"300px",margin:'5px',objectFit:'contain'}}/>
                </div>
                <div className="m-5" style={{lineHeight:'19px'}}>
                 <h4 style={{color:'skyblue'}}>{products.title}</h4> 
                 <div className="d-flex">
                 <p className="btn btn-success"> <i className="bi bi-star-fill" style={{color:'gold', fontSize:'14px',marginRight:'5px'}}></i>{products.rating?.rate}</p>
                 <p className="m-2"> {products.rating?.count} reviews</p>
                 </div>
                 <p style={{flexWrap:'flex-wrap'}}>{products.description}</p>
                 </div>
                <div style={{position:'absolute', top:'10%',right:'50px'}}>
                    <h4 style={{color:'green'}}>price</h4>
                   <h4 style={{color:'skyblue'}}> &#36;{products.price}</h4>
                 </div>
                
            </div> : <p>Loading...</p>
        }
         <button className="btn btn-warning m-3" onClick={handleBack}> Go Back</button>
         </div>
         
    )
}