import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FaTrashAlt, FaEnvelopeOpenText, FaUserCircle } from "react-icons/fa";
import { MdMarkEmailRead } from "react-icons/md";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Spinner from "../../../../components/common/Spinner/Spinner";

const ManageMessages = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [selectedMsg, setSelectedMsg] = useState(null);

    const { data: messages = [], isLoading } = useQuery({
        queryKey: ["contactMessages"],
        queryFn: async () => {
            const res = await axiosSecure.get("/contact");
            return res.data;
        },
    });

   const handleDelete = async (id) => {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#E56F61",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                const res = await axiosSecure.delete(`/contact/${id}`);
                
                if (res.data.deletedCount > 0) {
                    queryClient.invalidateQueries(["contactMessages"]);
                    
                    Swal.fire({
                        title: "Deleted!",
                        text: "The message has been removed.",
                        icon: "success",
                        timer: 1500,
                        showConfirmButton: false
                    });
                }
            } catch (error) {
                console.error("Delete Error:", error);
                Swal.fire("Error", "Failed to delete the message.", "error");
            }
        }
    });
};

    if (isLoading) return <Spinner />;

    return (
        <div className="p-6 md:p-10 bg-base-100 min-h-screen">
            <title>Manage User Messages | Dashboard</title>
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
                    <div>
                        <h1 className="text-3xl font-black uppercase tracking-tight flex items-center gap-3">
                            User <span className="text-[#E56F61]">Messages</span> <MdMarkEmailRead className="text-[#E56F61]"/>
                        </h1>
                        <p className="text-base-content/50 font-medium">Total Inquiries: {messages.length}</p>
                    </div>
                </div>

                {/* Messages Table */}
                <div className="overflow-x-auto bg-base-200 rounded-[2rem] shadow-xl border border-base-300">
                    <table className="table w-full">
                        <thead className="bg-base-300">
                            <tr className="text-base-content/70">
                                <th className="py-6 pl-8">User Info</th>
                                <th>Subject/Phone</th>
                                <th>Received At</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {messages.map((msg) => (
                                <tr key={msg._id} className="hover:bg-base-100/50 transition-colors border-b border-base-300/50">
                                    <td className="pl-8 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="text-[#E56F61] bg-[#E56F61]/10 p-3 rounded-full">
                                                <FaUserCircle size={24} />
                                            </div>
                                            <div>
                                                <div className="font-bold text-base">{msg.name}</div>
                                                <div className="text-xs opacity-50 font-semibold">{msg.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="text-sm font-medium">{msg.phone || "N/A"}</div>
                                    </td>
                                    <td>
                                        <div className="text-xs font-bold opacity-60">
                                            {new Date(msg.submittedAt).toLocaleDateString()}
                                        </div>
                                    </td>
                                    <td className="text-center">
                                        <div className="flex justify-center gap-2">
                                            {/* View Modal Trigger */}
                                            <button 
                                                onClick={() => {
                                                    setSelectedMsg(msg);
                                                    document.getElementById('msg_modal').showModal();
                                                }}
                                                className="btn btn-sm bg-[#E56F61] hover:bg-[#d15b4e] text-white border-none rounded-xl"
                                            >
                                                <FaEnvelopeOpenText /> View
                                            </button>
                                            
                                            <button 
                                                onClick={() => handleDelete(msg._id)}
                                                className="btn btn-sm btn-square btn-outline border-base-300 hover:bg-red-500 hover:border-red-500"
                                            >
                                                <FaTrashAlt />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* --- Message Preview Modal --- */}
            <dialog id="msg_modal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box rounded-[2rem] bg-base-100 border border-base-300 p-8">
                    <h3 className="font-black text-2xl mb-4 text-[#E56F61]">Full Message</h3>
                    <div className="space-y-4 py-4">
                        <div className="bg-base-200 p-4 rounded-2xl">
                            <p className="text-xs font-black uppercase opacity-40 mb-1">From</p>
                            <p className="font-bold">{selectedMsg?.name} ({selectedMsg?.email})</p>
                        </div>
                        <div className="bg-base-200 p-4 rounded-2xl">
                            <p className="text-xs font-black uppercase opacity-40 mb-1">Message Content</p>
                            <p className="text-base-content/80 leading-relaxed italic">
                                "{selectedMsg?.message}"
                            </p>
                        </div>
                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn rounded-xl px-8">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default ManageMessages;