import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { uploadImageToImgBB } from "../../../../Utils";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Spinner from "../../../../components/common/Spinner/Spinner";
import UseAuth from "../../../../Hooks/UseAuth";
import { FiEdit, FiTrash2, FiX, FiClock, FiDollarSign } from "react-icons/fi";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const MyAddedTickets = () => {
  const { user } = UseAuth();
  const queryClient = useQueryClient();
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [preview, setPreview] = useState(null);
  const modalRef = useRef();
  const axiosSecure=useAxiosSecure()

  // Fetch vendor Tickets
  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ["myTickets", user?.email], 
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axiosSecure.get(`/vendor-tickets?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const { register, handleSubmit, reset } = useForm();

  // Status colors with improved dark mode compatibility
  const statusColor = {
    approved: "bg-green-600 dark:bg-green-500 text-white",
    rejected: "bg-red-600 dark:bg-red-500 text-white",
    pending: "bg-yellow-500 dark:bg-yellow-400 text-gray-900", 
  };

  const openUpdateModal = (ticket) => {
    setSelectedTicket(ticket);
    setPreview(ticket.image || null);
    reset({
      title: ticket.title,
      from: ticket.from,
      to: ticket.to,
      transport: ticket.transport,
      price: ticket.price,
      quantity: ticket.quantity,
      // Date time format is crucial for datetime-local input
      departure: new Date(ticket.departure).toISOString().slice(0, 16), 
      perks: Array.isArray(ticket.perks) ? ticket.perks.join(", ") : ticket.perks,
      imageFile: null,
    });
  };

  // handle Update
  const handleUpdate = async (data) => {
    try {
      let imageUrl = selectedTicket.image;
      if (data.imageFile && data.imageFile[0]) {
        imageUrl = await uploadImageToImgBB(data.imageFile[0]);
      }

      const payload = {
        ...data,
        // Ensure perks are correctly split
        perks: data.perks.split(",").map((p) => p.trim()), 
        image: imageUrl,
      };

      await axiosSecure.patch(`/tickets/${selectedTicket._id}`, payload);
      queryClient.invalidateQueries(["myTickets"]);
      toast.success("Ticket updated successfully!");
      setSelectedTicket(null);
      setPreview(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update ticket.");
    }
  };

  // Handle Delete
  const handleDelete = (ticketId) => {
    Swal.fire({
      title: "Confirm Deletion?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444", // Red color
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/tickets/${ticketId}`);
          queryClient.invalidateQueries(["myTickets"]);
          Swal.fire({
            title: "Deleted!",
            text: "Your ticket has been successfully removed.",
            icon: "success",
            confirmButtonColor: "#10B981",
          });
          setSelectedTicket(null);
          setPreview(null);
        } catch (err) {
          console.error(err);
          Swal.fire({
            title: "Failed!",
            text: "Failed to delete ticket.",
            icon: "error",
          });
        }
      }
    });
  };

  if (isLoading) return <div className="flex justify-center items-center h-96"><Spinner /></div>;
  
  // Show message if no tickets found
  if (tickets.length === 0) {
    return (
        <div className="py-20 px-4 text-center">
          <title>My Added Tickets</title>
            <h2 className="text-3xl font-bold mb-4">No Tickets Added Yet</h2>
            <p className="text-lg">Looks like you haven't added any tickets. Use the 'Add Ticket' section to start listing!</p>
        </div>
    );
  }

  return (
    <div className="py-10 px-4  min-h-screen">
      <h2 className="text-3xl font-extrabold mb-10 text-center ">
        My Added Tickets (Vendor List)
      </h2>

      {/* Tickets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {tickets.map((item) => (
          <div
            key={item._id}
            // Card Design
            className=" rounded-xl shadow-xl border border-gray-100  overflow-hidden transition-all duration-300 transform hover:shadow-2xl hover:scale-[1.02]"
          >
            {/* Status Badge */}
            <span 
                className={`absolute top-50 right-0 px-4 py-1.5 rounded-bl-xl text-sm font-bold uppercase ${statusColor[item.status]}`}
                title={`Admin Status: ${item.status}`}
            >
              {item.status}
            </span>
            
            {/* Image */}
            <div className="h-48 overflow-hidden">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500" 
              />
            </div>

            <div className="p-5 relative pt-8">
              <h3 className="text-xl font-extrabold mb-2  truncate" title={item.title}>
                {item.title}
              </h3>
              
              {/* Route & Transport */}
              <p className="mb-1 capitalize">
                <span className="font-semibold ">{item.from}</span> → <span className="font-semibold ">{item.to}</span>
              </p>
              <p className="text-sm mb-2">
                Transport: <span className="font-medium ">{item.transport}</span>
              </p>
              
              {/* Details (Price, Quantity, Departure) */}
              <div className="space-y-1 text-sm  border-t pt-3 mt-3 ">
                <p className="flex items-center gap-1">
                    <FiDollarSign className="w-4 h-4" /> 
                    Price: <span className="font-bold text-lg ">${item.price}</span>
                </p>
                <p>Quantity: <span className="font-semibold">{item.quantity}</span></p>
                <p className="flex items-center gap-1">
                    <FiClock className="w-4 h-4 " /> 
                    Departure: <span className="font-medium">{new Date(item.departure).toLocaleString()}</span>
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between gap-3 mt-5 border-t pt-4 border-gray-100 dark:border-gray-700">
                <button
                  onClick={() => openUpdateModal(item)}
                  disabled={item.status === "rejected"}
                  className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium w-1/2 transition-colors duration-200 
                  ${item.status === "rejected" 
                    ? "cursor-not-allowed" 
                    : "bg-blue-600 text-white hover:bg-blue-700 shadow-md"
                  }`}
                >
                  <FiEdit /> Update
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium w-1/2 transition-colors duration-200 
                  ${item.status === "rejected" 
                    ? "  cursor-not-allowed" 
                    : "bg-red-600  hover:bg-red-700 shadow-md"
                  }`}
                  disabled={item.status === "rejected"}
                >
                  <FiTrash2 /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Update Modal */}
{selectedTicket && (
  <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/70 backdrop-blur-sm transition-opacity duration-300">
    
    {/* Modal Card */}
    <div
      ref={modalRef}
      className="relative w-full md:w-2/3 lg:w-1/2 max-h-[95vh] overflow-y-auto
                 rounded-2xl 
                 shadow-2xl p-6 md:p-8
                 transform transition-all duration-300 scale-100"
    >
      
      {/* Close Button */}
      <button
        onClick={() => {
          setSelectedTicket(null);
          setPreview(null);
        }}
        className="absolute top-4 right-4 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-500 transition-colors"
      >
        <FiX size={26} />
      </button>

      {/* Header */}
      <div className="mb-6 pb-3 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-3xl font-extrabold dark:text-white">
          Update Ticket
        </h3>
        <p className="mt-1 text-sm">
          Editing:{" "}
          <span className="font-semibold text-blue-600 dark:text-blue-400">
            {selectedTicket.title}
          </span>
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(handleUpdate)} className="space-y-5">
        
        {/* Text Fields */}
        {["title", "from", "to", "transport", "perks"].map((field) => (
          <div key={field}>
            <label className="block mb-1 text-sm font-semibold capitalize">
              {field} {field === "perks" && "(comma separated)"}
            </label>
            <input
              {...register(field, { required: true })}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600
                         px-4 py-2
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                         dark:text-white"
            />
          </div>
        ))}

        {/* Price & Quantity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm font-semibold">
              Price ($)
            </label>
            <input
              type="number"
              step="0.01"
              {...register("price", { required: true, valueAsNumber: true })}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600
                         px-4 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-semibold">
              Quantity
            </label>
            <input
              type="number"
              {...register("quantity", { required: true, valueAsNumber: true })}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600
                         px-4 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Departure */}
        <div>
          <label className="block mb-1 text-sm font-semibold">
            Departure Time
          </label>
          <input
            type="datetime-local"
            {...register("departure", { required: true })}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-600
                       px-4 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block mb-1 text-sm font-semibold">
            New Image (Optional)
          </label>
          <input
            type="file"
            accept="image/*"
            {...register("imageFile")}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-600
                       px-4 py-2 cursor-pointer"
          />

          {preview && (
            <div className="mt-4">
              <p className="text-sm mb-2">Current Image</p>
              <img
                src={preview}
                alt="Preview"
                className="w-full h-48 object-cover rounded-lg shadow-md"
              />
            </div>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full mt-6 bg-green-600 hover:bg-green-700
                     text-white font-bold text-lg
                     py-3 rounded-xl shadow-lg
                     transition-all focus:ring-4 focus:ring-green-300"
        >
          Save Changes
        </button>
      </form>
    </div>
  </div>
)}



    </div>
  );
};

export default MyAddedTickets;