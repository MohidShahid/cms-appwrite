import React , {useState} from "react";
import Input from "./Input";
import authService from "../appwrite/auth";
import Button from "./button";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login as AuthLogin} from "../store/authSlice";
import {  useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function SignupComponent() {
  const [error, setError ] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const handleAccount = async (data) => {
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        dispatch(AuthLogin(userData));
        navigate("/login");
      }
    } catch (error) {
      setError(error.message || "Failed to create Account");
    }
  };


  return (
    <div className="signup flex items-center justify-center w-full h-auto py-8 px-8 ">
      <div className="signup-container w-96 flex items-center justify-center flex-col gap-4 mx-auto max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
      <h2 className="text-center text-2xl font-bold leading-tight">
        Sign up to create account
      </h2>
      <p className="mt-2 text-center text-base text-black/60">
        Already have an account?&nbsp;
        <Link
          to="/login"
          className="font-medium text-primary transition-all duration-200 hover:underline"
        >
          Sign In
        </Link>
      </p>
      {error && <p className="text-blue-400">{error}</p>}
      
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(handleAccount)}>
      <Input
        label="Full Name"
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="Enter your name"
        {...register("name", {
          required: true,
        })}
      />
        <Input
          label="Email"
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter your email"
          {...register("email", {
            required: true,
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Invalid email address",
            },
          })}
        />
        <Input
          label="Password"
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter your password"
          type="password"
          {...register("password", {
            required: true,
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long",
            },
          })}
        />
        <Button type="submit">Create Account</Button>
      </form>

      
      </div>
    </div>
  );
}

export default SignupComponent;
