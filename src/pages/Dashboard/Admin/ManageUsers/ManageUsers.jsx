import { useQuery } from "@tanstack/react-query";
import React from "react";
import Spinner from "../../../../components/common/Spinner/Spinner";
import { FiUserCheck, FiUserX, FiAlertTriangle, FiUserPlus } from "react-icons/fi";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const ManageUsers = () => {
    const axiosSecure=useAxiosSecure()

    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ["allUsers"],
        queryFn: async () => {
            const res = await axiosSecure.get("/users");
            return res.data;
        },
    });


    // Action Handlers 
    const handleAction = async (id, actionType) => {
        let apiUrl, successMessage, buttonText;
        
        switch (actionType) {
            case 'admin':
                apiUrl = `makeAdmin/${id}`;
                successMessage = "User successfully promoted to Admin!";
                buttonText = "Make Admin";
                break;
            case 'vendor':
                apiUrl = `makeVendor/${id}`;
                successMessage = "User successfully promoted to Vendor!";
                buttonText = "Make Vendor";
                break;
            case 'fraud':
                // Fraud requires confirmation before action
                Swal.fire({
                    title: "Confirm Fraud Mark?",
                    html: "<span class='text-red-600 font-semibold'>This action will permanently ban the vendor and hide ALL their tickets.</span>",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#EF4444",
                    cancelButtonColor: "#4B5563",
                    confirmButtonText: "Yes, Mark as Fraud",
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        try {
                            // Call the updated backend API
                            await axiosSecure.patch(`makeFraud/${id}`); 
                            await refetch();
                            toast.success("Vendor marked as Fraud and all tickets hidden!");
                        } catch (error) {
                            console.error("Fraud action failed:", error);
                            toast.error("Failed to mark as fraud.");
                        }
                    }
                });
                return; // Exit here if it's fraud action (handled by Swal)
            default:
                return;
        }

        // For Admin/Vendor promotion actions
        try {
            await axiosSecure.patch(apiUrl);
            await refetch();
            toast.success(successMessage);
        } catch (error) {
            console.error(`${buttonText} action failed:`, error);
            toast.error(`Failed to execute action: ${buttonText}.`);
        }
    };

    if (isLoading) return <div className="flex justify-center items-center h-screen dark:bg-gray-900"><Spinner /></div>;

    return (
        <div className="p-8  min-h-screen">
            <title>Manage Users - Dashboard</title>
            <h2 className="text-3xl font-extrabold mb-8 text-center ">
                 (Manage All Users)
            </h2>

            <div className="overflow-x-auto  rounded-xl shadow-2xl">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead>
                        <tr>
                            <th className="py-3 px-6 text-left text-xs font-semibold  uppercase tracking-wider">#</th>
                            <th className="py-3 px-6 text-left text-xs font-semibold  uppercase tracking-wider">Name</th>
                            <th className="py-3 px-6 text-left text-xs font-semibold  uppercase tracking-wider">Email</th>
                            <th className="py-3 px-6 text-left text-xs font-semibold  uppercase tracking-wider">Role</th>
                            <th className="py-3 px-6 text-center text-xs font-semibold  uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {users.map((user, index) => (
                            <tr key={user._id} className="transition-colors duration-150">
                                {/* Index No */}
                                <td className="py-4 px-6 whitespace-nowrap text-sm font-medium">{index + 1}</td>

                                {/* User Info */}
                                <td className="py-4 px-6 whitespace-nowrap">
                                    <div className="flex items-center gap-3">
                                        <div className="flex-shrink-0 h-10 w-10 rounded-full overflow-hidden">
                                            <img 
                                                className="h-full w-full object-cover" 
                                                src={user.photoURL || 'https://via.placeholder.com/150/50577a/FFFFFF?text=U'} 
                                                alt={user.name} 
                                            />
                                        </div>
                                        <div>
                                            <div className="font-bold">{user.name || "N/A"}</div>
                                        </div>
                                    </div>
                                </td>

                                {/* Email */}
                                <td className="py-4 px-6 whitespace-nowrap text-sm ">{user.email}</td>

                                {/* Role */}
                                <td className="py-4 px-6 whitespace-nowrap">
                                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full capitalize 
                                        ${user.role === 'admin' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' 
                                        : user.role === 'vendor' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
                                        : user.role === 'fraud' ? 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-400' 
                                        : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'}`
                                    }>
                                        {user.role}
                                    </span>
                                </td>

                                {/* Action Buttons */}
                                <td className="py-4 px-6 whitespace-nowrap text-center text-sm font-medium">
                                    <div className="flex justify-center gap-2 flex-wrap">
                                        {/* Make Admin */}
                                        {user.role !== "admin" && (
                                            <button
                                                onClick={() => handleAction(user._id, 'admin')}
                                                title="Promote to Admin"
                                                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-medium transition flex items-center gap-1"
                                            >
                                                <FiUserCheck className="w-4 h-4" /> Admin
                                            </button>
                                        )}

                                        {/* Make Vendor */}
                                        {user.role !== "vendor" && user.role !== "fraud" && (
                                            <button
                                                onClick={() => handleAction(user._id, 'vendor')}
                                                title="Promote to Vendor"
                                                className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-medium transition flex items-center gap-1"
                                            >
                                                <FiUserPlus className="w-4 h-4" /> Vendor
                                            </button>
                                        )}
                                        
                                        {/* Mark as Fraud (Only for Vendors) */}
                                        {user.role === "vendor" && (
                                            <button
                                                onClick={() => handleAction(user._id, 'fraud')}
                                                title="Mark as Fraud and Ban"
                                                className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-medium transition flex items-center gap-1"
                                            >
                                                <FiAlertTriangle className="w-4 h-4" /> Fraud
                                            </button>
                                        )}
                                        
                                        {/* Disabled/Info State */}
                                        {(user.role === "admin" || user.role === "fraud") && (
                                            <span className="px-3 py-1.5 bg-gray-500 text-white rounded-lg text-xs font-medium opacity-70">
                                                No Action
                                            </span>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;