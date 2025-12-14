import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import axiosPublic from "../../../../Hooks/useAxios";
import { uploadImageToImgBB } from "../../../../Utils"; 
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Spinner from "../../../../components/common/Spinner/Spinner";
import UseAuth from "../../../../Hooks/UseAuth";
import { FiEdit, FiTrash2, FiX } from "react-icons/fi";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const MyAddedTickets = () => {
  const { user } = UseAuth();
  const queryClient = useQueryClient();
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [preview, setPreview] = useState(null);
  const modalRef = useRef();

// Fetch vendor Tickets
  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ["myTickets"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/vendor-tickets?email=${user.email}`);
      return res.data;
    },
  });

  const { register, handleSubmit, reset} = useForm();


 

  const statusColor = {
    approved: "bg-green-500 text-white",
    rejected: "bg-red-500 text-white",
    pending: "bg-yellow-400 text-white",
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
      departure: new Date(ticket.departure).toISOString().slice(0, 16),
      perks: ticket.perks.join(", "),
      imageFile: null,
    });
  };
//  handle Update
  const handleUpdate = async (data) => {
    try {
      let imageUrl = selectedTicket.image;
      if (data.imageFile && data.imageFile[0]) {
        imageUrl = await uploadImageToImgBB(data.imageFile[0]);
      }

      const payload = {
        ...data,
        perks: data.perks.split(",").map((p) => p.trim()),
        image: imageUrl,
      };

      await axiosPublic.patch(`/tickets/${selectedTicket._id}`, payload);
      queryClient.invalidateQueries(["myTickets"]);
    toast.success("Ticket updated successfully!");
      setSelectedTicket(null);
      setPreview(null);
    } catch (err) {
      console.error(err);
      alert("Failed to update ticket.");
    }
  };


  // Handle Delete

const handleDelete = (ticketId) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await axiosPublic.delete(`/tickets/${ticketId}`);
        queryClient.invalidateQueries(["myTickets"]);
        Swal.fire({
          title: "Deleted!",
          text: "Your ticket has been deleted.",
          icon: "success"
        });
        setSelectedTicket(null);
        setPreview(null);
      } catch (err) {
        console.error(err);
        Swal.fire({
          title: "Failed!",
          text: "Failed to delete ticket.",
          icon: "error"
        });
      }
    }
  });
};


  if (isLoading) return <div className="flex justify-center items-center h-96"><Spinner /></div>;

  return (
    <div className="py-10 px-4">
      <h2 className="text-3xl font-bold mb-8 text-center">My Added Tickets</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tickets.map((item) => (
          <div 
            key={item._id} 
            className="relative rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:scale-105 transition-transform duration-300 cursor-pointer"
          >
            <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-sm font-semibold ${statusColor[item.status]}`}>
              {item.status}
            </span>
            <div className="h-48 overflow-hidden">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="p-5">
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className=" mb-1 capitalize">From: <span className="font-medium">{item.from}</span> → To: <span className="font-medium">{item.to}</span></p>
              <p className=" mb-1">Transport: <span className="font-medium">{item.transport}</span></p>
              <p className=" mb-1">Price: <span className="font-medium">${item.price}</span></p>
              <p className=" mb-1">Quantity: <span className="font-medium">{item.quantity}</span></p>
              <p className=" mb-3">Departure: <span className="font-medium">{new Date(item.departure).toLocaleString()}</span></p>

              <div className="flex justify-center gap-4 mt-3">
                <button
                  onClick={() => openUpdateModal(item)}
                  disabled={item.status === "rejected"}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${item.status === "rejected" ? " cursor-not-allowed" : "bg-blue-600  hover:bg-blue-700 cursor-pointer"}`}
                >
                  <FiEdit /> Update
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  disabled={item.status === "rejected"}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${item.status === "rejected" ? " cursor-not-allowed" : "bg-red-600  hover:bg-red-700 cursor-pointer"}`}
                >
                  <FiTrash2 /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedTicket && (
        <div className="fixed inset-0 bg  bg-opacity-50 flex justify-center items-center z-50">
          <div ref={modalRef} className="rounded-2xl w-11/12 md:w-2/3 lg:w-1/2 p-6 relative shadow-2xl overflow-y-auto max-h-[90vh] bg-gray-500 text-white">
            <button 
              onClick={() => { setSelectedTicket(null); setPreview(null); }} 
              className="absolute top-4 right-4  hover: cursor-pointer"
            >
              <FiX size={24} />
            </button>
            <h3 className="text-2xl font-bold mb-4">Update Ticket</h3>

            <form onSubmit={handleSubmit(handleUpdate)} className="space-y-3">
              <div><label className="block mb-1 font-medium">Title</label><input {...register("title")} className="w-full border px-3 py-2 rounded-lg" /></div>
              <div><label className="block mb-1 font-medium">From</label><input {...register("from")} className="w-full border px-3 py-2 rounded-lg" /></div>
              <div><label className="block mb-1 font-medium">To</label><input {...register("to")} className="w-full border px-3 py-2 rounded-lg" /></div>
              <div><label className="block mb-1 font-medium">Transport</label><input {...register("transport")} className="w-full border px-3 py-2 rounded-lg" /></div>
              <div><label className="block mb-1 font-medium">Price</label><input type="number" {...register("price")} className="w-full border px-3 py-2 rounded-lg" /></div>
              <div><label className="block mb-1 font-medium">Quantity</label><input type="number" {...register("quantity")} className="w-full border px-3 py-2 rounded-lg" /></div>
              <div><label className="block mb-1 font-medium">Departure</label><input type="datetime-local" {...register("departure")} className="w-full border px-3 py-2 rounded-lg" /></div>
              <div><label className="block mb-1 font-medium">Perks (comma separated)</label><input {...register("perks")} className="w-full border px-3 py-2 rounded-lg" /></div>
              <div>
                <label className="block mb-1 font-medium">Upload Image</label>
                <input type="file" accept="image/*" {...register("imageFile")} className="w-full border px-3 py-2 rounded-lg cursor-pointer" />
                {preview && <img src={preview} alt="preview" className="w-full h-48 object-cover rounded-lg mt-2" />}
              </div>
              <button type="submit" className="w-full  px-4 py-2 rounded-lg hover: mt-2 cursor-pointer bg-green-600">Save Changes</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAddedTickets;
