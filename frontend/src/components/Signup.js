import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate= useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem('user');
    if (auth) {
      navigate('/')
    }
  });


  const collectData = async () => {
    console.warn(name, email, password);
    let result = await fetch(`http://localhost:5000/register?${Date.now()}`, {
      method: 'post',
      body: JSON.stringify({ name, email, password }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    result = await result.json()
    console.warn(result);
      navigate('/');
      // saves data after refresh
      localStorage.setItem('user',JSON.stringify(result.result));
      localStorage.setItem('token',JSON.stringify(result.auth));
  }
  return (
    <div className='signup'>
      <h1>sign in</h1>
      <input className='inputbox' type='text' onChange={(e) => setName(e.target.value)} value={name} placeholder='enter name' />
      <input className='inputbox' type='email' onChange={(e) => setEmail(e.target.value)} value={email} placeholder='enter email' />
      <input className='inputbox' type='password' onChange={(e) => setPassword(e.target.value)} value={password} placeholder='enter password' />
      <button className="inputbtn " onClick={collectData}>Sign Up</button>
    </div>
  )
}

export default Signup;
