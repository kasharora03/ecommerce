import React from 'react';
import { useState } from 'react';

const Signup = () => {
    const [name, setName] = useState(''); 
    const [password, setPassword] = useState(''); 
    const [email, setEmail] = useState('');   
    const collectData = () =>{
        console.warn(name, email, password)
    }
  return (
    <div className='signup'>
    <h1>sign in</h1>
      <input className='inputbox' type='text' onChange={(e)=>setName(e.target.value)} value={name} placeholder='enter name'/>
      <input className='inputbox' type='email' onChange={(e)=>setEmail(e.target.value)} value={email} placeholder='enter email'/>
      <input className='inputbox' type='password' onChange={(e)=>setPassword(e.target.value)} value={password} placeholder='enter password'/>
      <button className="inputbtn " onClick={collectData}>Sign Up</button>
    </div>
  )
}

export default Signup;
