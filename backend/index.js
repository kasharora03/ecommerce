const express = require('express');
const app = express();
require('./db/config');
const User = require('./db/Users');

app.use(express.json());

app.post('/register', async (req, res) => {
    let newUser = new User(req.body);
    let result = await newUser.save();
    res.send(result);
});
app.get('/register',(req,res)=>{
    res.send('hello')
})
app.listen(8000, () => {
    console.log('Server is running on port 8000');
});
