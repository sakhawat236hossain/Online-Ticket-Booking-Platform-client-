import React from "react";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import SocialLogin from "../Social/SocialLogin";
import { useForm } from "react-hook-form";
import UseAuth from "../../../Hooks/UseAuth";

import toast from "react-hot-toast";
import { uploadImageToImgBB } from "../../../Utils";
import Spinner from "../../../components/common/Spinner/Spinner";
import { useLocation } from "react-router";

const Register = () => {
  const { createUser, updateUserProfile, setUser, loading } = UseAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const formSubmit = async (data) => {
    const { email, password, name, profileImage } = data;
    const imgFile = profileImage[0];

    try {
      //  Upload image
      const photoURL = await uploadImageToImgBB(imgFile);

      //  Create user
      const result = await createUser(email, password);
      const user = result.user;

      //  Update profile
      await updateUserProfile({
        displayName: name,
        photoURL: photoURL || "",
      });

      setUser({ ...user, displayName: name, photoURL: photoURL || "" });

      toast.success("Registration successful! ");

      reset();
      navigate(location?.state || "/");
    } catch (error) {
      console.log("Error:", error);
      toast.error("Registration failed!");
    }
  };

  if (loading) {
    return <Spinner></Spinner>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-100 via-pink-100 to-yellow-100 p-4">
      <div className="w-full bg-white rounded-2xl shadow-2xl p-6 max-w-lg">
        <div className="mb-4 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Register</h1>
          <p className="text-sm text-gray-500">Create your new account</p>
        </div>

        <form onSubmit={handleSubmit(formSubmit)} className="space-y-4">
          {/* Name */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-400 transition"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Image */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Profile Image
            </label>
            <input
              type="file"
              accept="image/*"
              className="block w-full text-sm bg-gray-100 border border-dashed border-lime-300 rounded-md p-2"
              {...register("profileImage", {
                required: "Profile Image is required",
              })}
            />
            {errors.profileImage && (
              <p className="text-red-500">{errors.profileImage.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-400"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-400"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters" },
              })}
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer flex items-center justify-center gap-2 px-4 py-2 bg-[#E56F61] text-white rounded-lg hover:bg-white hover:text-[#E56F61] border border-[#E56F61] font-semibold transition"
          >
            <FaUser /> Register
          </button>
        </form>

        <div className="flex items-center my-3">
          <div className="flex-1 h-px bg-gray-300"></div>
          <p className="px-3 text-gray-400 text-sm">Or register with</p>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        <SocialLogin />

        <p className="mt-3 text-center text-gray-500 text-sm">
          Already have an account?
          <Link to="/login" className="text-lime-500 underline ml-1">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
