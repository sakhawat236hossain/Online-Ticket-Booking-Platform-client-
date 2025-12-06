import React from "react";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import SocialLogin from "../Social/SocialLogin";
import { useForm } from "react-hook-form";
import UseAuth from "../../../Hooks/UseAuth";

const Register = () => {
      const { createUser,updateUserProfile } = UseAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const formSubmit = async (data) => {
  console.log("Form Data:", data);
  try {
    const result = await createUser(data.email, data.password);
    const user = result.user;

    // profile update
    await updateUserProfile({
      displayName: data.name,
      photoURL: data.profileImage[0] ? URL.createObjectURL(data.profileImage[0]) : "",
    });

    console.log("Updated User:", user);
  } catch (error) {
    console.log("Error:", error);
  }
};




  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-100 via-pink-100 to-yellow-100 p-4">
      <div className="w-full bg-white rounded-2xl shadow-2xl p-6 max-w-lg">
        {/* Header */}
        <div className="mb-4 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Register</h1>
          <p className="text-sm text-gray-500">Create your new account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(formSubmit)} className="space-y-4">
          {/* Name */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-400 focus:outline-none transition"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Profile Image */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Profile Image
            </label>
            <input
              type="file"
              accept="image/*"
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-lime-50 file:text-lime-700
                hover:file:bg-lime-100
                bg-gray-100 border border-dashed border-lime-300 rounded-md cursor-pointer
                focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-lime-400
                py-2"
              {...register("profileImage", { required: "Profile Image is required" })}
            />
            {errors.profileImage && (
              <p className="text-red-500 text-sm mt-1">
                {errors.profileImage.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-400 focus:outline-none transition"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Enter a valid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-400 focus:outline-none transition"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z]).*$/,
                  message: "Password must contain at least 1 uppercase and 1 lowercase letter",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

       
        

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#E56F61] text-white rounded-lg hover:bg-white hover:text-[#E56F61] border border-[#E56F61] font-semibold transition-colors"
          >
            <FaUser /> Register
          </button>
        </form>

        {/* Social Login */}
        <div className="flex items-center my-3">
          <div className="flex-1 h-px bg-gray-300"></div>
          <p className="px-3 text-gray-400 text-sm">Or register with</p>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        <div className="mt-2">
          <SocialLogin />
        </div>

        {/* Login Link */}
        <p className="mt-3 text-center text-gray-500 text-sm">
          Already have an account?
          <Link to="/login" className="text-lime-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
