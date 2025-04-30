const express= require('express')
const product= require("./product.json")
const app= express()
const cors = require('cors')
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')
var mysql = require('mysql2')
const port =8080;

let sceretKey="my_sceret_key"

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
// Database Connection
let con = mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'Sathish@19',
        database:'ecomerce'
})
con.connect(function(err){
       if(err) throw err;
      console.log('connected')
})
// import product data into product table
 // your local product array

app.post('/import-products', (req, res) => {
  product.forEach(prod => {
    const { id, title, price, description, category, image, rating } = prod;
    const { rate, count } = rating;

    const sql = `INSERT INTO products
      (id, title, price, description, category, image, rating_rate, rating_count)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    con.query(sql, [id, title, price, description, category, image, rate, count], (err, result) => {
      if (err) console.error(`Failed to insert product ${id}:`, err.message);
    });
  });

  res.status(201).json({ message: "Products imported successfully" });
});


// register route

app.post('/register', (req , res)=>{
    let {username, password, confirmPassword}= req.body;
     if(!username || !password|| !confirmPassword){
       return res.status(400).json({message:'All fields are required'})
     }
     if(password !== confirmPassword){
       return res.status(400).json({message:'password does not match'})
     }
   con.query('select*from register where username=?',[username], async(err, results)=>{
       if(err){
             return res.status(400). json({message:'Internal server error'})
       }
      if(results.length>0){
            return res.status(409).json({message:'user already exist'})
     }
     try{
        const hashed = await bcrypt.hash(password, 10)
        con.query('Insert Into register(username, password) values(?,?)',[username, hashed], (err, result)=>{
           if(err){
             return res.status(500).json({message:'internal server error'})
           }
            return res.status(201).json({message:'user registration sucessful'})

        })

     }catch(err){
        console.log(err)
     }

    })
 
})

// login route 

app.post('/login', (req , res)=>{
      let {username, password}= req.body;
      if(!username || !password){
             return res.status(400).json({message:'All fields are required'})
      }
      con.query('select*from register where username=?',[username], async(err, results)=>{
           if(err){
             return res.status(500).json({message:'Internal server error'})
           }
           if(results.length===0){
                   return res.status(404).json({message:'user not found'})
           }
  try{
      const isMatch = await bcrypt.compare(password,results[0].password)
      if(!isMatch){
             return res.status(401).json({message:'password does not match'})
      } else{
        const playload = {id:results[0].id, username:results[0].username}
        const token =JWT.sign(playload, sceretKey,{expiresIn:"10m"})
        console.log(token)
             return res.status(200).json({message:'login sucessful', token:token})
         
      }
    
  }catch(err){
       console.log(err)
       return res.status(500).json({message:'internal server'})
  }         
})

})

//Verify Token 

 function VerifyToken(){
   const  verify =JWT.verify(token, sceretKey)
 }
   
//Delete cart item route based on product id

app.delete('/cart/:id', async(req,res)=>{
    let {id} =req.params
    const sql ='Delete from cart where product_id=?'
    con.query(sql, [id], (err, result)=>{
       if(err){
         return res.status(500).json({message:"Database error", err})
       }
       if(result.affectedRows===0){
         return res.status(400).json({message:'No Records found with the given Id'})
       }
       return res.status(200).json({message:"record delete sucessfully"})
   
    })
})   

// Add To Cart Route //

app.post("/addCart", (req, res)=>{
  let {id, name, price, quantity} = req.body
  let check ='select*from Cart where product_id=?'
  con.query(check, [id], async(err, result)=>{
      if(err){
        return res.status(500).json({message:"Database error", err})
      }
      if(result.length===0){
        console.log(result)
        let Insert="Insert Into Cart(product_id, name, price, quantity) values(?,?,?,?)"
        con.query(Insert, [id, name,price, quantity], (err, result)=>{
         if(err){
            return res.status(500).json({message:"Internal server err", err})
         }
          return res.status(201).json({message:"Record inserted Sucessfully"})
        })
      } else{
         let  update='Update Cart set quantity=quantity+1 where product_id=?'
         con.query(update, [quantity,  id], (err, result)=>{
            if(err){
              return res.status(500).json({message:'Internal server', err})
            }
            return res.status(201).json({message:'record update sucessfully'})
         })

      }
     
     })
})

// search functionality

app.get("/search", (req, res)=>{
   let {keyword}= req.query;
   let sql = 'select*from products where category LIKE ? or title like ? '
   let searchTerm = `%${keyword}%`
   con.query(sql, [searchTerm,searchTerm], (err, result)=>{
     if(err){
       return res.status(500).json({message:'Internal server', err})
     }
     if(result.length===0){
       return res.status(404).json({message:'No products found in this category'})
     }
     return res.status(201).json({message:"category item found", products:result.length, product:result})
   })
})
// forgot password 

app.post("/forgotpassword", (req, res)=>{
    let { username, newPassword } = req.body

    if(!username || !newPassword){
       return res.status(400).json({message:'All fields are  required'})
    }

  let check ='select*from register where username=?'  // checking username exist or not 
  con.query(check, [username], async(err, result)=>{
     if(err){
       return res.status(500).json({message:"Internal server"})
     }
     if(result.length===0){
      return res.status(404).json({message:"username not found"})
     }
      try{
        let hashedPassword = await bcrypt.hash(newPassword, 10)
        let updatePassword = 'update register set password=? where username=?'
        con.query(updatePassword, [hashedPassword, username], (err, result)=>{
           if(err){
             return res.status(500).json({message:'Internal server', err})
           }
           return res.status(200).json({message:'password updated sucessfully', data:result})
        })

      }catch(err){
        console.log("hashing error", err)
               return res.status(500).json({message:"Error hashing password"})
      }
  })

})





app.listen(port, ()=>{ 
       console.log(`server is liseting at ${port}`)
})
