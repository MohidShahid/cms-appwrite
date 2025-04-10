import React, { useState } from 'react'
import {Button , Input } from './Index/index'
import { Link , useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import authService from '../appwrite/auth'
import { useDispatch , useSelector} from 'react-redux'
import {login as AuthLogin} from '../store/authSlice'


function Login() {
  const {handleSubmit , register} = useForm()
  const [error , setErrors] = useState('');
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const login = async (data)=>{
    setErrors("")
    try{
      const session = await authService.login(data)
      if(session){
        const userData = await authService.getCurrentUser();
        console.log(userData)
        if(userData){
              dispatch(AuthLogin(userData))
              navigate('/')
        }
      }
    }
  catch(error){
  setErrors(error.message)
  }
  }
  // bg-gray-100  border-black/10
  return (
    <div
    className='flex items-center justify-center w-full my-16'
    >
        <div className={`mx-auto w-full max-w-lg rounded-xl p-10 border`}>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className='mt-8'>
            <div className='space-y-5'>
                <Input
                label="Email: "
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                    required: true,
                    validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                })}
                />
                <Input
                label="Password: "
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                    required: true,
                })}
                />
                <Button
                type="submit"
                className="w-full"
                >Sign in</Button>
            </div>
        </form>
        </div>
    </div>
  )
}


export default Login