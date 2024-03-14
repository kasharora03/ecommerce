import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/')
        }
    })
    const handleLogin = async () => {
        console.warn(email, password)
        let result = await fetch('http://localhost:5000/login', {
            method: 'post',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        console.warn(result);
        if (result.auth) {
            localStorage.setItem('user', JSON.stringify(result.user));
            localStorage.setItem('token', JSON.stringify(result.auth));
            navigate('/');
        } else {
            alert('Please enter correct credentials');
        }
    }
    return (
        <div className='login'>
            <h1>login</h1>
            <input type='text' className='inputbox' placeholder='enter email' onChange={(e) => setEmail(e.target.value)} value={email} />
            <input type='password' className='inputbox' placeholder='enter password' onChange={(e) => setPassword(e.target.value)} value={password} />
            <button className="inputbtn" type='button' onClick={handleLogin}>Login</button>
        </div>
    )
}

export default Login;
