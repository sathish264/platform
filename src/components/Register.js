import {Link, useNavigate } from 'react-router-dom'
import {useState} from'react';
import axios from 'axios';
export default function Register(){
  const navigate = useNavigate()
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
    const [register, setRegister]=useState({username:'',password:'',confirmPassword:''})
    const [data, setData]=useState([])
    const [error, setError] =useState()
  
    const handleChange=(event)=>{
      let {name, value} =event.target
       setRegister((prev)=>({
        ...prev, [name]:value
       }))
     
    }

  
    const handleRegister=async(e)=>{
      e.preventDefault()
      if(register.password!==register.confirmPassword){
            setError('please confirm password')
      }
       else{
         setError('')
         setData((prevData)=>[...prevData, register])
        
      }
      try {
        const response = await axios.post('http://localhost:8080/register', register);
        if(response.status===200){
        
          setRegister({username:'', password:" ", confirmPassword:''})
          alert(response.data.message)
          navigate('/')
        }
        
      } catch (err) {
        if (err.response) {
          if (err.response.status === 409) {
            alert('User already exists!');
          } else if (err.response.status === 400) {
            alert(err.response.data.message); // for missing fields or mismatched passwords
          } else {
            alert('Something went wrong. Please try again.');
          }
        } else {
          alert('No response from server.');
        }
        
      }
      console.log(data)
    }
  
   
     return(
         <>
       <form style={styles.container}>
        <div style={styles.login_card}>
           <div className="d-flex flex-column">
             <label className="form-label ms-2">username</label>
             <input type="text" name="username" placeholder="username" className="form-control w-100" style={{height:'35px'}} onChange={handleChange} value={register.username}/>
           </div>
           <div className="d-flex flex-column">
              <label className='m-2'>password</label>
              <input type="password"  name="password"  placeholder="password"  className="form-control w-100" style={{height:'35px'}} onChange={handleChange} value={register.password}/>
             
           </div>
           <div className="d-flex flex-column">
              <label className='m-2'> Confirm Password</label>
              <input type="password"   name="confirmPassword" placeholder="confirmPassword" className="form-control w-100" style={{height:'35px'}} onChange={handleChange} value={register.confirmPassword}/>
              {error&& <p style={{color:'red'}}>{error}</p>}
            </div>
             <p className="m-2">Already Register?<Link to="/" style={{textDecoration:'none', color:'black'}}>Login</Link></p>
           <button className="btn btn-danger w-100 mt-1" onClick={handleRegister}>Register</button>
        </div>
         
       </form>
         </>
     )
}