import {useState,useEffect} from 'react';
export default  function CheckOut() {
    const [data, setData] =useState({
        Name:'',
        number:'',
        pincode:'',
        address:''
    })
    const [submitData, setSubmitData]=useState(()=>{
       let stored= localStorage.getItem("submitData")
       return stored?JSON.parse(stored):{}
    })
    useEffect(()=>{
        if(submitData&&Object.keys(submitData).length>0){
            localStorage.setItem("submitData", JSON.stringify(submitData))
        }

    }, [submitData])
    const handleInput=(e)=>{
         let {name, value}=e.target;
         setData((prevData)=>({...prevData, [name]:value}))
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
         setSubmitData(data)
         setData({Name:'',number:'',pincode:'', address:''})
    }
     return(
         <div style={{marginTop:'85px'}} >
            <div style={{lineHeight:'0.5',boxShadow:'0px 3px 8px gray'}} className="card p-2">
                <div className="d-flex justify-content-end">
                  <button className="btn btn-warning w-25" data-bs-toggle="modal"  data-bs-target="#myModal"
                  style={{borderStyle:'none'}} >
                     {submitData.Name ? 'Change' : 'Address'}</button>
                </div>
                <div>
                {submitData.Name && (
                        <>
                            <p>{submitData.Name}</p>
                            <p>{submitData.address}</p>
                            <p>{submitData.pincode}</p>
                            <p>{submitData.number}</p>
                        </>
                    )}
                </div>
             </div>
             <div className="modal fade"  id="myModal" tabIndex="-1" > 
                <div className="modal-dialog  card">
                 <div className="modal-content">
                    <div className="modal-header">
                                <h4>Address</h4>
                    </div>
                    <div className="modal-body">
                        <div className="d-flex flex-column rounded-pill">
                              <label>Full Name</label>
                              <input type="text" className="form-control rounded-pill"  placeholder="Name"
                              onChange={handleInput} name="Name"  value={data.Name}/>
                        </div>
                        <div className="d-flex flex-column">
                             <label>Contact No</label>
                              <input type="tel"  className="form-control rounded-pill"  placeholder="number"
                              onChange={handleInput}  name="number" value={data.number}/>
                        </div>
                        <div className="d-flex flex-column">
                              <label>PinCode</label>
                              <input type="text"  className="form-control rounded-pill"  placeholder="pincode"
                              onChange={handleInput}  name="pincode" value={data.pincode}/>
                        </div>
                        <div className="d-flex flex-column">
                              <label>Full Address </label>
                              <input type="text"  className="form-control rounded-pill"  placeholder="address"
                              onChange={handleInput}  name="address" value={data.address}/>
                        </div>       
                    </div>
                    <div className="modal-footer">
                      <button className="btn btn-success" data-bs-dismiss="modal"  onClick={handleSubmit}> Submit</button>
                    </div>
                </div>
                </div>
            </div>
            <form>
                  
            </form>
        </div>

     )
}
