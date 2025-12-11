import React from "react";
import { useQuery } from "@tanstack/react-query";
import axiosPublic from "../../../../Hooks/useAxios";
import Spinner from "../../../../components/common/Spinner/Spinner";
import Swal from "sweetalert2";
import { FaRegTrashAlt } from "react-icons/fa";

const ManageTickets = () => {

    // Fetch all tickets
  const { data: tickets = [], isLoading, refetch } = useQuery({
    queryKey: ["allTickets"],
    queryFn: async () => {
      const res = await axiosPublic.get("/ticketsAdmin");
      return res.data;
    },
  });

  if (isLoading) return <Spinner />;
 
  // Approve Ticket
  const handleApprove = async (id) => {
    const res = await axiosPublic.patch(`approve/${id}`);
    if (res.data.modifiedCount > 0) {
      Swal.fire("Approved!", "Ticket approved successfully.", "success");
      refetch();
    }
  };

  // Reject Ticket
  const handleReject = async (id) => {
    const res = await axiosPublic.patch(`reject/${id}`);
    if (res.data.modifiedCount > 0) {
      Swal.fire("Rejected!", "Ticket rejected successfully.", "error");
      refetch();
    }
  };


// delete

const handleDelete = async(id)=>{
     const res = await axiosPublic.delete(`ticketsAdmin/${id}`);
     if (res.data.deletedCount > 0) {
      Swal.fire("Deleted!", "Ticket deleted successfully.", "success");
      refetch();
    }
}

  return (
    <div className="overflow-x-auto w-full p-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-5 text-gray-800">
        Manage Tickets {tickets.length}
      </h2>
      
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>#</th>
            <th>Ticket Info</th>
            <th>Route & Transport</th>
            <th>Price & Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        
        <tbody>
          {tickets.map((ticket, index) => (
            <tr key={ticket._id}>
              {/* Index Column (Replaced Checkbox with Index) */}
              <th>
                <label>
                  {index + 1}
                </label>
              </th>

              {/* Ticket Info (Image, Title, Vendor) */}
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src={ticket.image}
                        alt={ticket.title}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{ticket.title}</div>
                    <div className="text-sm opacity-50">
                      Vendor: {ticket.Vendor?.VendorName}
                    </div>
                  </div>
                </div>
              </td>

              {/* Route & Transport */}
              <td>
                {ticket.from} ➝ {ticket.to}
                <br />
                <span className="badge badge-ghost badge-sm">
                  {ticket.transport}
                </span>
              </td>

              {/* Price & Status */}
              <td>
                <div className="font-semibold mb-1">{ticket.price} 💰</div>
                
                {/* Status Badges */}
                {ticket.status === "approved" && (
                  <span className="badge badge-success text-white badge-sm">Approved</span>
                )}
                {ticket.status === "pending" && (
                  <span className="badge badge-warning text-white badge-sm">Pending</span>
                )}
                {ticket.status === "rejected" && (
                  <span className="badge badge-error text-white badge-sm">Rejected</span>
                )}
              </td>

             

// Inside your table row
<td className="text-center">
  <div className="flex items-center justify-center gap-2">
    {ticket.status === "pending" ? (
      <>
        <button
          onClick={() => handleApprove(ticket._id)}
          className="btn btn-success btn-xs text-white"
        >
          Approve
        </button>
        <button
          onClick={() => handleReject(ticket._id)}
          className="btn btn-error btn-xs text-white"
        >
          Reject
        </button>
      </>
    ) : (
      <span className="text-gray-400 text-xs italic">Completed</span>
    )}

    {/* Trash Icon */}
   <button onClick={()=>handleDelete(ticket._id)} className="bg-red-100 text-red-600 p-2 rounded-full transition cursor-pointer">
  <FaRegTrashAlt />
</button>

  </div>
</td>

            </tr>
          ))}
        </tbody>
        
        {/* foot */}
        <tfoot>
         
        </tfoot>
      </table>
    </div>
  );
};

export default ManageTickets;