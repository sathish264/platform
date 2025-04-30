import { useEffect,useState, useContext, useCallback} from 'react';
import {UserContext} from './UserContext'
import {useNavigate} from 'react-router-dom'
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { IoFilterOutline } from "react-icons/io5";
import axios from 'axios';
import './Product.css';
export default function Product(){
  const navigate= useNavigate()
  const {product, setProduct,  setCart, setWishlist,wishlist} = useContext(UserContext)
  const [category, setCategory] =useState([])
  const [filter, setFilter] =useState([])
  const [showFilter, setShowFilter] =useState(false)
  const [selectedCategory , setSelectedCategory] =useState("All")
  const price=[{min:0, max:30},{min:31, max:60},{min:61, max:120}]
  const [selectedPrice, setSelectedPrice]=useState(null)
  useEffect(()=>{
    const  fetchData = async()=>{
       try{
         const response = await axios.get('https://fakestoreapi.com/products')
         setProduct(response.data)
       } catch(err){
         console.log(err)
       }
    }
    fetchData();

  },[setProduct])
    const handleCart = async(item,id) => {
      setCart((prevCart)=>{
         const exisitingItem= prevCart.find(item=> item.id === id)
         if(!exisitingItem){
           return [...prevCart, {...item,quantity:1}]
         } else{
           return prevCart.map(product=>(
              product.id ===id? {...product, quantity:product.quantity+1}: product
           ))
         }
    });
   try{
    await axios.post("http://localhost:8080/addCart", {
       id: item.id,
       name: item.title,
       price: item.price,
       quantity:1
    })
    console.log(product)
       
   }catch(err){
    console.log('Error adding to DB cart', err)  
   }
  }
  const handleDetails =(items)=>{
     navigate(`/product/${items.id}`)
  }
  const handleIconButton =(items)=>{
    setWishlist((prev)=>{
     const existingItem = prev.find((p)=>p.id === items.id)
      if(existingItem){
        return  prev.filter((p)=>p.id!==items.id)
      } else{
        return  [...prev, items]
      }
    }
    )
}
useEffect(()=>{
 console.log("updated wishlist", wishlist)
},[wishlist])
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
  
useEffect(() => {
  // Set categories once the products are available
  if (product && product.length > 0) {
    const FilterCategories = [...new Set(product.map((item) => item.category))];
    setCategory(FilterCategories);
  }
}, [product, setCategory]);


const handleCategory=(e)=>{
  setSelectedCategory(e.target.value)
}
const handlePriceFilter=(min, max,e)=>{
  if(e.target.checked){
       setSelectedPrice(`${min}-${max}`)
  } else{
     setSelectedPrice(null)
  }

}; 

// useEffect for filter 


const applyFilter=useCallback(()=>{
  let filtered = product;

  if (selectedCategory !== "All") {
    filtered = filtered.filter(item => item.category === selectedCategory);
  }

  if (selectedPrice) {
    const [min, max] = selectedPrice.split("-").map(Number);
    filtered = filtered.filter(item => item.price >= min && item.price <= max);
  }

  setFilter(filtered);
},[product,selectedCategory, selectedPrice])

useEffect(()=>{
  applyFilter();
}, [applyFilter])

// To Show and Hide Button 
   
const handleFilter=(e)=>{
   e.preventDefault()
   setShowFilter(!showFilter)
}
   return(
    <>
    <div className="container" >
      <div  className="items_filter">
         <button className="btn btn-light fs-5 d-block d-sm-none ">Recommended</button> <hr />
         <button className="btn btn-light fs-5 d-block d-sm-none " onClick={handleFilter}> <IoFilterOutline /> Filter</button>
         
       </div>
        {
          showFilter && (

            <div className="d-block d-sm-none">
            <div>
            <label htmlFor="category">Category</label>
           <select style={{height:'40px'}} className="form-select" onChange={handleCategory} id="category">
             <option value="All" key="All">All</option>
           {
             category.map((item)=>(
               <option value={item} key={item}>{item}</option>
             ))
           }
           </select>
           </div>
           <div>
                <h6>Price</h6>
                {
                  price.map((p, index)=>(
                    <div key={index}>
                        <input type="checkbox" value={`${p.min} - ${p.max}`}  className="form-check-input" onChange={(e)=>handlePriceFilter(p.min, p.max,e)}/>
                        <label className='form-label ms-2'>{`${p.min} - ${p.max}`}</label>
                   </div>
                  ))
                }
               
           </div>
          </div>
          )
      }

<div className="d-none d-md-block ms-2">
          <div>
            <label htmlFor="category">Category</label>
            <select style={{ height: '40px' }} className="form-select" onChange={handleCategory} id="category">
              <option value="All" key="All">All</option>
              {category.map((item) => (
                <option value={item} key={item}>{item}</option>
              ))}
            </select>
          </div>
          <div>
            <h6>Price</h6>
            {price.map((p, index) => (
              <div key={index}>
                <input
                  type="checkbox"
                  value={`${p.min} - ${p.max}`}
                  className="form-check-input"
                  onChange={(e) => handlePriceFilter(p.min, p.max, e)}
                />
                <label className='form-label ms-2'>{`${p.min} - ${p.max}`}</label>
              </div>
            ))}
          </div>
        </div>
     <div className="grid_container"  >
       {
         filter.map((items)=>(
           <div  key={items.id}   className="items_card">
             <div >
              <div>
              <div>
              <i className="bi bi-heart-fill heart_symbol" onClick={()=>handleIconButton(items)} style={{
                    color: wishlist.some((i) => i.id === items.id) ? 'red' : 'lightgray',
                  }}  />
              </div>
              <img src={items.image} alt={items.category}  onClick={()=>handleDetails(items)}  className="image"/>
    
              </div>
              <div className="items_content">
              <p>{items.title}</p>
               <div style={{lineHeight:"0.8"}}>
               <p>{render(items.rating.rate)}</p>
              </div>
              <p className="mb-2"> Price :&#36;{items.price}</p>
              </div>
              </div>
              <div className="mt-5">
               <button onClick={()=>handleCart(items, items.id)} className="items_button" >Add to Cart</button>
              </div>
            </div>
         ))
       }
     </div>
    </div>
     </>
   )
}
