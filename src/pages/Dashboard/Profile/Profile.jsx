import React from "react";
import { FaUser, FaEnvelope, FaUserTag, FaSpinner } from "react-icons/fa";
import UseAuth from "../../../Hooks/UseAuth";
import useRole from "../../../Hooks/useRole";

const Profile = () => {
  const { user } = UseAuth();
  const { role, isLoading } = useRole();

  // Helper function to format the join date (Logic unchanged)
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
      <title>Profile - Page</title>
      {/* Main Card Container: Added bg-white for visibility */}
      <div className=" shadow-2xl rounded-3xl border border-gray-100 p-8 sm:p-12 flex flex-col md:flex-row gap-10">
        
        {/* Profile Summary Section */}
        <div className="md:w-1/3 flex flex-col items-center border-b md:border-b-0 md:border-r border-gray-200 pb-8 md:pb-0 md:pr-10">
          <div className="w-40 h-40 rounded-full shadow-xl ring-4 ring-blue-500 ring-opacity-30 flex items-center justify-center  overflow-hidden transition-transform transform hover:scale-105 duration-300">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.displayName}
                className="w-full h-full object-cover"
              />
            ) : (
              // Enhanced FaUser color and background
              <FaUser className="" size={80} />
            )}
          </div>
          
          <h2 className="text-3xl font-extrabold  mt-6 text-center">
            {user?.displayName || "Guest User"}
          </h2>
          
          <p className="text-sm font-medium text-blue-800  py-1 px-4 rounded-full mt-3 shadow-sm">
            {isLoading ? (
              <span className="flex items-center gap-2">
                <FaSpinner className="animate-spin text-blue-600" /> Loading Role...
              </span>
            ) : (
              role.toUpperCase()
            )}
          </p>

          <p className=" text-sm mt-4">
            Member Since: **{formatJoinDate(user?.metadata?.creationTime)}**
          </p>
        </div>

        {/* Details Section */}
        <div className="md:w-2/3 flex-1 w-full space-y-6">
          <h3 className="text-2xl font-bold border-b border-gray-200 pb-3 mb-4">Account Details</h3>

          {/* Full Name */}
          <DetailCard 
            icon={<FaUser className="text-blue-600" size={24} />}
            title="Full Name"
            value={user?.displayName || "N/A"}
            color="blue"
          />

          {/* Email */}
          <DetailCard 
            icon={<FaEnvelope className="text-purple-600" size={24} />}
            title="Email Address"
            value={user?.email || "N/A"}
            color="purple"
          />

          {/* Role (Conditional Loading State - Enhanced Styling) */}
          {/* Note: Classes here must be explicitly defined since the DetailCard is not used */}
          <div className="flex items-center gap-4 p-5 rounded-xl border border-green-200 shadow-md transition duration-300 hover:shadow-lg hover:shadow-green-200/50">
            <div className=" p-4 rounded-xl">
              <FaUserTag className="text-green-600" size={24} />
            </div>
            <div>
              <p className="text-xs uppercase font-medium  tracking-wider">User Role</p>
              {isLoading ? (
                <p className="text-lg font-semibold  flex items-center gap-2">
                  <FaSpinner className="animate-spin " /> Fetching role...
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


const DetailCard = ({ icon, title, value, color }) => {
    const colorClasses = {
        blue: {
           
            border: 'border-blue-200',
            hoverShadow: 'hover:shadow-blue-200/50',
            text: 'text-blue-800', 
            iconBg: 'bg-blue-100'
        },
        purple: {
            
            border: 'border-purple-200',
            hoverShadow: 'hover:shadow-purple-200/50',
            text: 'text-purple-800',
            iconBg: 'bg-purple-100'
        }
    };

    const classes = colorClasses[color] || colorClasses.blue;

    return (
        // Added text-gray-700 for the title text
        <div className={`flex items-center gap-4 p-5 rounded-xl border ${classes.border} ${classes.bg} shadow-md transition duration-300 hover:shadow-lg ${classes.hoverShadow}`}>
            <div className={`${classes.iconBg} p-4 rounded-xl`}>
                {icon}
            </div>
            <div>
                <p className="text-xs uppercase font-medium  tracking-wider">{title}</p>
                <p className={`text-xl font-bold ${classes.text}`}>
                    {value}
                </p>
            </div>
        </div>
    );
}

export default Profile;