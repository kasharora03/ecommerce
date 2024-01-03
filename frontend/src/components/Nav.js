import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Nav = () => {
  const auth = localStorage.getItem('user');
  const navigate = useNavigate();
  const logout = ()=>{
    localStorage.clear();
    navigate('/signup');
  }
  return (
    <div >
      <ul className='nav-ul'>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/add'>Add</Link></li>
        <li><Link to='/login'>Login</Link></li>
        {/* <li>{auth?<Link onClick={logout} to='/signup'>Logutt</Link>:<Link to='/signup'>Signup</Link>}</li> */}
        {auth ?
          <li><Link onClick={logout} to='/signup'>Logutt</Link></li>:
          <>
          <li><Link to='/signup'>Signup</Link></li>
          <li><Link to='/login'>Login</Link></li>
          </>
        }
      </ul>
    </div>
  )
}

export default Nav;
