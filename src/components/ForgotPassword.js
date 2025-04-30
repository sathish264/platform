export default function ForgotPassword(){
    const handleInput=(e)=>{
     console.log(e)
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
    }
     return(
        <>
        <form onSubmit={handleSubmit}>
        <div style={{marginTop:'85px'}}>
            <div className="col-6">
                  <label>Username</label>
                <input type="text"  onChange={handleInput} className="form-control" />
           </div>
           <div className="col-6">
               <label>New Password</label>
               <input type="password" onChange={handleInput} className="form-control" />
          </div>
          <button className="btn btn-success mt-3" type="submit">Update Password</button>
        </div>
        </form>
        </>
     )
}