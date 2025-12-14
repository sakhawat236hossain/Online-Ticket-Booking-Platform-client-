import React from "react";
import { FaUser, FaEnvelope, FaUserTag, FaSpinner } from "react-icons/fa";
import UseAuth from "../../../Hooks/UseAuth";
import useRole from "../../../Hooks/useRole";

const Profile = () => {
  const { user } = UseAuth();
  const { role, isLoading } = useRole();

  // Helper function to format the join date
  const formatJoinDate = (timestamp) => {
    if (!timestamp) return "N/A";
    try {
      return new Date(timestamp).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (e) {
      return "N/A";
    }
  };

  return (
    <div className="max-w-5xl mx-auto my-16 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-2xl rounded-3xl border border-gray-100 p-8 sm:p-12 flex flex-col md:flex-row gap-10">
        
        {/* Profile Summary Section */}
        <div className="md:w-1/3 flex flex-col items-center border-b md:border-b-0 md:border-r border-gray-200 pb-8 md:pb-0 md:pr-10">
          <div className="w-40 h-40 rounded-full shadow-xl ring-4 ring-blue-500 ring-opacity-20 flex items-center justify-center bg-gray-100 overflow-hidden transition-transform transform hover:scale-105 duration-300">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.displayName}
                className="w-full h-full object-cover"
              />
            ) : (
              <FaUser className="text-gray-400" size={80} />
            )}
          </div>
          
          <h2 className="text-3xl font-extrabold text-gray-900 mt-6 text-center">
            {user?.displayName || "Guest User"}
          </h2>
          
          <p className="text-sm font-medium text-blue-600 bg-blue-50 py-1 px-3 rounded-full mt-2 shadow-sm">
            {isLoading ? (
              <span className="flex items-center gap-2">
                <FaSpinner className="animate-spin" /> Loading Role...
              </span>
            ) : (
              role.toUpperCase()
            )}
          </p>

          <p className="text-gray-500 text-sm mt-4">
            Member Since: **{formatJoinDate(user?.metadata?.creationTime)}**
          </p>
        </div>

        {/* Details Section */}
        <div className="md:w-2/3 flex-1 w-full space-y-6">
          <h3 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-4">Account Details</h3>

          {/* Full Name */}
          <DetailCard 
            icon={<FaUser className="text-blue-600" />}
            title="Full Name"
            value={user?.displayName || "N/A"}
            color="blue"
          />

          {/* Email */}
          <DetailCard 
            icon={<FaEnvelope className="text-purple-600" />}
            title="Email Address"
            value={user?.email || "N/A"}
            color="purple"
          />

          {/* Role (Conditional Loading State) */}
          <div className="flex items-center gap-4 p-5 rounded-xl border border-green-200 bg-green-50 shadow-md transition duration-300 hover:shadow-lg">
            <div className="bg-green-100 p-4 rounded-xl">
              <FaUserTag className="text-green-600" size={24} />
            </div>
            <div>
              <p className="text-xs uppercase font-medium text-gray-600 tracking-wider">User Role</p>
              {isLoading ? (
                <p className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <FaSpinner className="animate-spin text-green-500" /> Fetching role...
                </p>
              ) : (
                <p className="text-xl font-bold text-green-700 capitalize">
                  {role || "Unknown"}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Card Component for Details
const DetailCard = ({ icon, title, value, color }) => {
    const colorClasses = {
        blue: {
            bg: 'bg-blue-50',
            border: 'border-blue-200',
            hoverShadow: 'hover:shadow-blue-200/50',
            text: 'text-blue-700'
        },
        purple: {
            bg: 'bg-purple-50',
            border: 'border-purple-200',
            hoverShadow: 'hover:shadow-purple-200/50',
            text: 'text-purple-700'
        }
    };

    const classes = colorClasses[color] || colorClasses.blue;

    return (
        <div className={`flex items-center gap-4 p-5 rounded-xl border ${classes.border} ${classes.bg} shadow-md transition duration-300 hover:shadow-lg ${classes.hoverShadow}`}>
            <div className={`bg-${color}-100 p-4 rounded-xl`}>
                {icon}
            </div>
            <div>
                <p className="text-xs uppercase font-medium text-gray-600 tracking-wider">{title}</p>
                <p className={`text-xl font-bold ${classes.text}`}>
                    {value}
                </p>
            </div>
        </div>
    );
}

export default Profile;