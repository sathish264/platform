import Header from './Header'
import Product from './Product'
import Footer from './Footer'
import {useState} from 'react';
import {UserContext} from './UserContext'
export  default function Filter(){
    const [product, setProduct] =useState([])
    const [wishlist, setWishlist] =useState([])
     return(
         <div>
            <UserContext.Provider value={{product, setProduct, wishlist, setWishlist}} >
             <Header />
             <main>
                 <Product />
             </main>
            
             <Footer />
            </UserContext.Provider>
         </div>
     )
}