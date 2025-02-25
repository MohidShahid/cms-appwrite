import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import authService from '../appwrite/auth';
import Input from '../Components/Input'

function ChangePassword() {
    const { register, handleSubmit } = useForm(); // ✅ Initialize register
    const [info , setInfo] = useState("");

   const onSubmit = async(data) =>{
         console.log(data);
         const {oldPass , newPass} = data;
         await authService.changePassword(newPass , oldPass);
         setInfo("Password Updated Successfully");
   }
  return (
    <div className='flex flex-col w-full items-center justify-start'>
        <h1>Change Your Password</h1>
              <form className="flex flex-col gap-4 w-9/12" onSubmit={handleSubmit(onSubmit)}>
                    <Input
                      label="Old Password"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      type="text"
                      {...register("oldPass", {
                        required: true,
                      })}
                    />
                    <Input
                      label="New Password"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      type="text"
                      {...register("newPass", {
                        required: true,
                      })}
                    />
                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md">
                      Update Password
                    </button>
                  </form>
                  <small>{info}</small>
    </div>
  )
}

export default ChangePassword