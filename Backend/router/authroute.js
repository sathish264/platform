const express= require('express')
const connectDB= require('./lib/db.js')
const bcrypt = require('bcrypt')
const router= express.Router();
//post 

router.post("/register",  async(req , res)=>{
     let {username, password, confirmPassword} =req.body;
     if (!username || !password || !confirmPassword) {
        return res.status(400).json({ message: 'All fields are required' });
      }
    
      if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
      }
      try{
           const [existingUser] = await connectDB.query('select*from register where username=?', [username])
           if(existingUser.length>0){
             return res.status(400).json({message:"user already exist"})
           } else{
            const hashed =  await bcrypt.hash(password,10)
               await connectDB.query('Insert Into register(username, password)values(?,?)',[username, hashed])
               
                return res.status(200).json({message:'recorded insert sucessfully'})
               

           }

      }catch(err){
        console.log(err)
      }
})

module.exports= router;