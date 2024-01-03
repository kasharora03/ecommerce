const express = require('express');
const cors = require('cors');
const app = express();
require('./db/config');
const User = require('./db/Users');

app.use(express.json());
app.use(cors()); //to resolve api integration issue

app.post('/register', async (req, res) => {
    let newUser = new User(req.body);
    let result = await newUser.save();
    result = result.toObject();
    delete result.password
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('Pragma', 'no-cache');
    res.send(result);
}); 
app.post('/login',async (req,res)=>{
    if(req.body.password && req.body.email){
        let user = await User.findOne(req.body).select("-password");
        if(user){
            res.send(user)
        }else{
            res.send({result:'no user found'})
        }
    }else{
        res.send({result:'no user found'})
    }
   
})
app.get('/register',(req,res)=>{
    res.send('hello')
})
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
