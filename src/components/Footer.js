import './Product.css'
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
export default function Footer(){
     return(
        <div className="footer_container">
            <div className="footer_container_1 mb-3">
                <div className="m-3">
                  <h5>Be The First to Know </h5>
                  <p>Sign up for updates from meta muse</p>
                  <div className="d-flex">
                      <input type="search" placeholder="Enter your email" className="form-control"/>
                      <button className="btn btn-light text-dark  p-1 ms-2">Subscribe</button>
                  </div>
                 </div>
                 <div style={{lineHeight:1.5}} className="mt-3">
                     <h4>Contact Us</h4>
                     <p>+91 6302983615</p>
                     <p>customercare@mettus.com</p>
                     <h4>Currency</h4>
                     <p>.USD</p>
                     <p>Transcation will be completed in Euros and a currency available on  hover.</p>
                 </div> 
            </div>
             <hr className="text-white fs-1" />
            <div className="footer_container_2 m-3">
                 <div className="mb-3">
                       <h5>Metamuse</h5>
                       <ul style={{listStyleType:'none',padding: 0, margin: 0, lineHeight:1.8}}>
                         <li>About Us</li>
                         <li>Stories</li>
                         <li>Artisans</li>
                         <li>Boutique</li>
                         <li>Contact Us</li>
                         <li>Eu Compliance Docs</li>
                       </ul>
                 </div>
                 <div className='mb-3'>
                     <h5>QUICKLINKS</h5>
                     <ul style={{listStyleType:'none',padding: 0, margin: 0, lineHeight:1.8}}>
                        <li>Orders&Shipping</li>
                        <li>Join/Login as a Seller</li>
                        <li>Payment & pricing</li>
                        <li>Return & Refunds</li>
                        <li>FAQs</li>
                        <li>Privacy Policy</li>
                        <li>Terms & Conditions</li>
                     </ul>
                 </div>
                 <div style={{padding:0, margin:0}}>
                      <h5>FOLLOWUS</h5>
                      <FaLinkedin  style={{fontSize:'30px'}} className="m-3"/>
                      <FaInstagram  style={{fontSize:'30px'}}/>
                    <div>
                        <h5>metta muse ACCEPTS</h5>
                        <div >
                           <img src="https://img.icons8.com/color/48/000000/visa.png" alt="Visa" />
                           <img src="https://img.icons8.com/color/48/000000/mastercard.png" alt="MasterCard" />
                           <img src="https://img.icons8.com/color/48/000000/visa.png" alt="Visa" />
                        </div>
                    </div>  
                 </div>
            </div>
            <div className="m-3">
             <p className="footer_container_3"> Copyright@2023 mettamuse.All are required</p>
            </div>
        </div>
     )
}