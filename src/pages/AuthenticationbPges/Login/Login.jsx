import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoEyeOff, IoLogIn } from "react-icons/io5";
import SocialLogin from "../Social/SocialLogin";
import { FaEye } from "react-icons/fa";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-100 via-pink-100 to-yellow-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        {/* Title */}
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Welcome Back!
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Please login to your account to continue
        </p>

        {/* Form */}
        <form className="flex flex-col gap-5">
          {/* Email */}
          <div className="flex flex-col mb-4">
            <label className="text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E56F61] transition"
              required
            />
          </div>

          <div className="relative flex flex-col mb-4">
            <label className="text-sm font-medium mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E56F61] transition"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-9 text-gray-700"
            >
              {showPassword ? <FaEye /> : <IoEyeOff />}
            </button>
          </div>

          {/* Forget Password */}
          <div className="text-left">
            <Link className="text-sm text-[#E56F61] hover:underline">
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full cursor-pointer flex items-center justify-center gap-2 px-4 py-2 bg-[#E56F61] text-white rounded-lg hover:bg-white hover:text-[#E56F61] border border-[#E56F61] font-semibold transition-colors"
          >
            <IoLogIn /> Login
          </button>
          {/* Social Login */}
          <div className="mt-2">
            <SocialLogin />
          </div>
          {/* Register Link */}
          <p className="text-sm text-center text-gray-500">
            Don't have an account?
            <Link
              to="/register"
              className="text-[#E56F61] hover:underline font-medium"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
