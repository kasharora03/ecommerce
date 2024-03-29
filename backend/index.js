const express = require('express');
const cors = require('cors');
const app = express();
require('./db/config');
const User = require('./db/Users');
const Product = require('./db/Product')
const Jwt = require('jsonwebtoken');
const jwtkey = 'e-comm';

app.use(express.json());
app.use(cors()); //to resolve api integration issue
// post req
app.post('/register', async (req, res) => {
    let newUser = new User(req.body);
    let result = await newUser.save();
    result = result.toObject();
    delete result.password
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('Pragma', 'no-cache');
    Jwt.sign({result},jwtkey,{expiresIn:"2h"},(err,token)=>{
        if(err){
            res.send('something went wrong')
        }
        res.send({ result, auth:token})
    })
}); 
app.post('/login',async (req,res)=>{
    if(req.body.password && req.body.email){
        let user = await User.findOne(req.body).select("-password");
        if(user){
            
            Jwt.sign({user},jwtkey,{expiresIn:"2h"},(err,token)=>{
                if(err){
                    res.send('something went wrong')
                }
                res.send({ user, auth:token})
            })
        }else{
            res.send({result:'no user found'})
        }
    }else{
        res.send({result:'no user found'})
    }
   
})
app.post('/addproduct',async(req,res)=>{
    let product=new Product(req.body);
    let result = await product.save();
    res.send(result)
})
app.get('/register',(req,res)=>{
    res.send('hello')
})
app.get('/products',async(req,res)=>{
    let products = await Product.find();
    if(products.length>0){
        res.send(products)
    }else{
        res.send({result:"no product found"})
    }
})
app.delete('/products/:id', async(req,res)=>{
    const result =await Product.deleteOne({_id:req.params.id});
    res.send(result);
})
app.get('/product/:id',async(req,res)=>{
    let result = await Product.findOne({_id:req.params.id});
    if(result){
        res.send(result)
    }else{
        res.send('no result')
    }
})
app.put('/product/:id',async(req,res)=>{
    let result = await Product.updateOne(
        {_id:req.params.id},
        {$set:req.body}
    )
    res.send(result)
});
app.get('/search/:key',async(req,res)=>{
    let result=await Product.find({
        $or:[{name:{ $regex :req.params.key}},
            {company:{ $regex :req.params.key}},
            {category:{ $regex :req.params.key}}
        ]
    });
    res.send(result);
})
function verifyToken(req,res,next){
    let token = req.headers['authorization'];
    if(token){
        token = token.split(' ')[1];
        console.warn('middle',token);
        Jwt.verify(token,jwtkey,(err,success,valid)=>{
            if(err){
                res.status(403).send('please add valid token')
            }else{
                next(); 
            }
        })
    }else{
        res.status(403).send('please add token with header')
    }
    // token = token.split('')
    
    next();
}
app.listen(5000, () => {
    console.log('Server is running on port 5000');
    
});
