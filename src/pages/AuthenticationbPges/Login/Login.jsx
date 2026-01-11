import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoEyeOff, IoLogIn } from "react-icons/io5";
import { FaEye, FaUserShield, FaUserTie, FaUser } from "react-icons/fa"; 
import { useForm } from "react-hook-form";
import SocialLogin from "../Social/SocialLogin";
import UseAuth from "../../../Hooks/UseAuth";
import toast from "react-hot-toast";
import { useLocation } from "react-router";

const Login = () => {
  const { signInUser } = UseAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); 
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = async (data) => {
    const { email, password } = data;
    performLogin(email, password);
  };

  const handleQuickLogin = (email, password) => {
    performLogin(email, password);
  };

  const performLogin = async (email, password) => {
    setLoading(true);
    try {
      const result = await signInUser(email, password);
      const user = result.user;
      toast.success(`Welcome back, ${user.displayName || "User"}!`);
      navigate(location?.state || '/');
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Login failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 ">
      <div className="w-full max-w-md rounded-2xl shadow-2xl p-8 border border-gray-100">
        <h2 className="text-3xl font-black mb-2 text-center text-gray-800">
          Welcome <span className="text-[#E56F61]">Back!</span>
        </h2>
        <p className="text-center text-gray-500 mb-8 text-sm font-medium">
          Please login to your account to continue
        </p>

        {/* --- Quick Login Buttons --- */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <button
            onClick={() => handleQuickLogin("user@gmail.com", "Ab1234")}
            className="cursor-pointer flex flex-col items-center gap-1 p-3 rounded-xl border border-gray-200 hover:border-[#E56F61] hover:bg-[#E56F61]/5 transition group"
          >
            <FaUser className="text-gray-400 group-hover:text-[#E56F61]" />
            <span className="text-[10px] font-bold uppercase tracking-tighter">User</span>
          </button>
          <button
            onClick={() => handleQuickLogin("vendor@gmail.com", "Ab1234")}
            className="flex flex-col items-center cursor-pointer gap-1 p-3 rounded-xl border border-gray-200 hover:border-[#E56F61] hover:bg-[#E56F61]/5 transition group"
          >
            <FaUserTie className="text-gray-400 group-hover:text-[#E56F61]" />
            <span className="text-[10px] font-bold uppercase tracking-tighter">Vendor</span>
          </button>
          <button
            onClick={() => handleQuickLogin("admin@gmail.com", "Ab1234")}
            className="flex flex-col items-center cursor-pointer gap-1 p-3 rounded-xl border border-gray-200 hover:border-[#E56F61] hover:bg-[#E56F61]/5 transition group"
          >
            <FaUserShield className="text-gray-400 group-hover:text-[#E56F61]" />
            <span className="text-[10px] font-bold uppercase tracking-tighter">Admin</span>
          </button>
        </div>

        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-200"></span></div>
          <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-gray-400 font-bold">Or use credentials</span></div>
        </div>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit(handleLogin)}>
          {/* Email */}
          <div className="flex flex-col">
            <label className="text-sm font-bold text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E56F61]/20 focus:border-[#E56F61] transition"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1 font-medium">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div className="relative flex flex-col">
            <label className="text-sm font-bold text-gray-700 mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E56F61]/20 focus:border-[#E56F61] transition"
              {...register("password", { required: "Password is required" })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-10 text-gray-400 hover:text-[#E56F61]"
            >
              {showPassword ? <FaEye /> : <IoEyeOff />}
            </button>
            {errors.password && <p className="text-red-500 text-xs mt-1 font-medium">{errors.password.message}</p>}
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <Link to="/forgot-password" size="sm" className="text-xs font-bold text-[#E56F61] hover:underline">
              Forgot Password?
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer flex items-center justify-center gap-2 px-4 py-3 bg-[#E56F61] text-white rounded-xl hover:bg-[#d15b4e] font-bold transition-all shadow-lg shadow-[#E56F61]/20 disabled:bg-gray-300"
          >
            {loading ? <span className="loading loading-spinner loading-sm"></span> : <><IoLogIn size={20} /> Login</>}
          </button>
        </form>

        {/* Social Login */}
        <div className="my-6 flex items-center">
          <div className="flex-1 h-px bg-gray-100"></div>
          <p className="px-3 text-gray-400 text-[10px] font-bold uppercase tracking-widest">Social Connect</p>
          <div className="flex-1 h-px bg-gray-100"></div>
        </div>
        <SocialLogin />

        {/* Register Link */}
        <p className="mt-8 text-center text-sm font-medium text-gray-500">
          Don't have an account?
          <Link to="/register" className="text-[#E56F61] hover:underline font-bold ml-1">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;