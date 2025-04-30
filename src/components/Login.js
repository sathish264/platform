import {Link, Outlet, useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import { useState, useContext} from 'react'
import {UserContext} from './UserContext'
import axios from 'axios'
export default function Login(){
  const [data, setData] =useState({username:'', password:''})
  const [error, setError] = useState({})
  const {setLoggedIn} =useContext(UserContext)
  const navigate =useNavigate()
    const styles={
      container:{
              display:'flex',
              justifyContent:'center',
              alignItems:'center',
              height:'100vh'
      },
      login_card:{
            width:'300px',
            border:'1px',
            margin:'10px',
            padding:'20px',
            boxShadow:'0px 3px 8px gray',
      },
    register:{
        textDecoration:'none',
        color:'black',
        fontFamily:'Roboto'

    }
      
    }
     const handleInput=(e)=>{
       let {name, value} = e.target
       setData((prev)=>({...prev, [name]:value}))
     }
     const  handleSubmit= async(e)=>{
      e.preventDefault()
       if(data.username===""){
         setError({username:"please enter username"})
       } else {
          setError({username:''})
       }
       if(data.password===""){
         setError({password:'please enter password'})
       } else{
         setError({password:''})
       }
       
      try{
          const response = await axios.post('http://localhost:8080/login',data)
          if(response.status===200){
             toast.success("login sucessful")
             localStorage.setItem("token", response.data.token)
             setData({username:'', password:''})
             setLoggedIn(true)
             navigate('/product')
          }  
      }catch(err){
       
          if(err.response){
            if(err.response.status === 404){
              toast.error("Invalid credentials")
              setData({username:'', password:''})
            } else {
              toast.error("Something went wrong. Please try again.")
            }
          } else {
            toast.error("Network error. Check your connection.")
          }
          // ✅ Reset form in all error cases
          setData({ username: '', password: '' })
        }

       
      }
      
     return(
         <>
       <form style={styles.container} onSubmit={handleSubmit}>
        <div style={styles.login_card}>
           <div className="d-flex flex-column">
             <label className="form-label ms-2">username</label>
             <input type="text"  className="form-control w-100" style={{height:'35px'}} onChange={handleInput} name="username" placeholder="username"  autoComplete='off'/>
             {error && <p style={{color:'red'}}>{error.username}</p>}
           </div>
           <div className="d-flex flex-column">
              <label className='m-2'>password</label>
              <input type="password"  className="form-control w-100" style={{height:'35px'}} onChange={handleInput} name="password" placeholder="password" autoComplete='off' />
              {error && <p style={{color:'red'}}>{error.password}</p>}
           </div>
          <div className="d-flex justify-content-space-around">
            <p  className="me-4"><Link to="/register" style={styles.register}> Register here ?</Link></p>
            <p > <Link to="/forgotpassword" style={styles.register}>forgot password?</Link></p>
          </div>
           <button className="btn btn-danger w-100 mt-1" type="submit">Login</button>
        </div>
         <Outlet />
       </form>
            
         </>
     )
}