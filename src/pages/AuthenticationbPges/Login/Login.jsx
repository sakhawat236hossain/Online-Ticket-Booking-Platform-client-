import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoEyeOff, IoLogIn } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import { useForm } from "react-hook-form";
import SocialLogin from "../Social/SocialLogin";
import UseAuth from "../../../Hooks/UseAuth";
import toast from "react-hot-toast";
import Spinner from "../../../components/common/Spinner/Spinner";
import { useLocation } from "react-router";

const Login = () => {
  const { signInUser} = UseAuth(); 
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = async (data) => {
    const { email, password } = data;

    try {
      const result = await signInUser(email, password);
      const user = result.user;

   

      toast.success(`Welcome back, ${user.displayName || "User"}!`);
       navigate(location?.state || '/');
    } catch (error) {
      console.log(error);
      if (error.code === "auth/user-not-found") {
        toast.error("User not found!");
      } else if (error.code === "auth/wrong-password") {
        toast.error("Wrong password!");
      } else {
        toast.error("Login failed!");
      }
    }
  };



  return (
    <div className="min-h-screen flex items-center justify-center  p-4">
      <div className="w-full max-w-md  rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold mb-6 text-center ">
          Welcome Back!
        </h2>
        <p className="text-center  mb-6">
          Please login to your account to continue
        </p>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit(handleLogin)}>
          {/* Email */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 border 0 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E56F61] transition"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="relative flex flex-col">
            <label className="text-sm font-medium mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E56F61] transition"
              {...register("password", { required: "Password is required" })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-9 "
            >
              {showPassword ? <FaEye /> : <IoEyeOff />}
            </button>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Forgot Password */}
          <div className="text-left">
            <Link to="/forgot-password" className="text-sm text-[#E56F61] hover:underline">
              Forgot Password?
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full cursor-pointer flex items-center justify-center gap-2 px-4 py-2 bg-[#E56F61]  rounded-lg hover:bg-white hover:text-[#E56F61] border border-[#E56F61] font-semibold transition-colors"
          >
            <IoLogIn /> Login
          </button>
        </form>

        {/* Social Login */}
        <div className="my-3 flex items-center">
          <div className="flex-1 h-px "></div>
          <p className="px-3  text-sm">Or login with</p>
          <div className="flex-1 h-px "></div>
        </div>
        <SocialLogin />

        {/* Register Link */}
        <p className="mt-3 text-center  text-sm">
          Don't have an account?
          <Link
            to="/register"
            className="text-[#E56F61] hover:underline font-medium ml-1"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
