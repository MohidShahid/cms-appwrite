import React from 'react'
import authService from '../appwrite/auth';
import { useDispatch } from 'react-redux';
import {logout as authlogout, logout } from '../store/authSlice'
import { useNavigate } from 'react-router-dom';


function Logoutbtn() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const handleLogout =  ()=>{
        authService.getCurrentSession().then((currentSession)=> {
          if(currentSession){
            authService.logout(currentSession.$id)
            dispatch(logout())
          }
          navigate('/login');
        });
  }
  return (
    <button className='px-2 py-2 rounded bg-red-600 text-white' onClick={handleLogout}>Logout</button>
  )
}

export default Logoutbtn;