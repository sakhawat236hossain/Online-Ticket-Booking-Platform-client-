import React from "react";
import { FaUser, FaEnvelope, FaUserTag } from "react-icons/fa";
import UseAuth from "../../../Hooks/UseAuth";
import useRole from "../../../Hooks/useRole";

const Profile = () => {
  const { user } = UseAuth();
  const {role, isLoading}=useRole()

  return (
    <div className="max-w-4xl mx-auto mt-12 px-6">
      <div className="bg-white shadow-xl rounded-2xl border border-gray-200 p-8 flex flex-col md:flex-row items-center md:items-start gap-8">

        {/* Profile Picture */}
        <div className="flex flex-col items-center md:items-start">
          <div className="w-32 h-32 rounded-full shadow-lg border border-gray-300 flex items-center justify-center bg-gray-100 overflow-hidden">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.displayName}
                className="w-full h-full object-cover"
              />
            ) : (
              <FaUser className="text-gray-500" size={70} />
            )}
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mt-4 md:mt-6 text-center md:text-left">
            {user?.displayName || "Guest User"}
          </h2>
          <p className="text-gray-500 text-sm text-center md:text-left">
            Joined: {user?.metadata?.creationTime
              ? new Date(user.metadata.creationTime).toLocaleDateString()
              : "N/A"}
          </p>
        </div>

        {/* Info Section */}
        <div className="flex-1 w-full space-y-4">

          {/* Full Name */}
          <div className="flex items-center gap-4 p-4 rounded-xl border bg-gray-50 shadow-sm">
            <div className="bg-blue-100 p-3 rounded-xl">
              <FaUser className="text-blue-600" />
            </div>
            <div>
              <p className="text-xs uppercase text-gray-500">Full Name</p>
              <p className="text-lg font-semibold text-gray-800">
                {user?.displayName || "N/A"}
              </p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center gap-4 p-4 rounded-xl border bg-gray-50 shadow-sm">
            <div className="bg-purple-100 p-3 rounded-xl">
              <FaEnvelope className="text-purple-600" />
            </div>
            <div>
              <p className="text-xs uppercase text-gray-500">Email</p>
              <p className="text-lg font-semibold text-gray-800">
                {user?.email || "N/A"}
              </p>
            </div>
          </div>

          {/* Role */}
          <div className="flex items-center gap-4 p-4 rounded-xl border bg-gray-50 shadow-sm">
            <div className="bg-green-100 p-3 rounded-xl">
              <FaUserTag className="text-green-600" />
            </div>
            <div>
              <p className="text-xs uppercase text-gray-500">Role</p>
              <p className="text-lg font-semibold text-gray-800">{role}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;
