import { useQuery } from "@tanstack/react-query";
import React from "react";
import axiosPublic from "../../../../Hooks/useAxios";
import Spinner from "../../../../components/common/Spinner/Spinner";

const ManageUsers = () => {
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const res = await axiosPublic.get("/users");
      return res.data;
    },
  });

  if (isLoading) return <Spinner />;



  return (
    <div className="overflow-x-auto p-4">
      <table className="table w-full min-w-[700px] border border-gray-200 rounded-lg shadow-lg">
        <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user, index) => (
            <tr key={user._id} className="hover:bg-gray-50 transition">
              {/* Index No */}
              <th className="text-gray-600">{index + 1}</th>

              {/* User Info */}
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img src={user.photoURL} alt={user.name} />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{user.name}</div>
                  </div>
                </div>
              </td>

              {/* Email */}
              <td className="text-gray-600">{user.email}</td>

              {/* Role */}
              <td className="capitalize">{user.role}</td>

              {/* Action Buttons */}
              <td className="flex justify-center gap-2">
                {user.role !== "admin" && (
                  <button
                
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm transition"
                  >
                    Make Admin
                  </button>
                )}

                {user.role !== "vendor" && (
                  <button
                    className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded text-sm transition"
                  >
                    Make Vendor
                  </button>
                )}

                {user.role === "vendor" && (
                  <button
                    className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm transition"
                  >
                    Mark as Fraud
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
