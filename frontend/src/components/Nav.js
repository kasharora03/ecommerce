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
    <img src='https://lh3.googleusercontent.com/3bXLbllNTRoiTCBdkybd1YzqVWWDRrRwJNkVRZ3mcf7rlydWfR13qJlCSxJRO8kPe304nw1jQ_B0niDo56gPgoGx6x_ZOjtVOK6UGIr3kshpmTq46pvFObfJ2K0wzoqk36MWWSnh0y9PzgE7PVSRz6Y' alt='nologo' className='logo'/>
    {
      auth?
      <ul className='nav-ul'>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/add'>Add</Link></li>
        <li><Link to='/update'>Update</Link></li>
        <li><Link onClick={logout} to='/signup'>Logout({JSON.parse(auth).name})</Link></li>
        </ul>:
        <ul className='nav-ul nav-right'>
        <li><Link to='/signup'>Signup</Link></li>
          <li><Link to='/login'>Login</Link></li>
          </ul>
    }
        {/* <li>{auth?<Link onClick={logout} to='/signup'>Logutt</Link>:<Link to='/signup'>Signup</Link>}</li> */}
    </div>
  )
}

export default Nav;
