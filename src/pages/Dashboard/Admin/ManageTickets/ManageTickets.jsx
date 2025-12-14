import React from "react";
import { useQuery } from "@tanstack/react-query";
import axiosPublic from "../../../../Hooks/useAxios";
import Spinner from "../../../../components/common/Spinner/Spinner";
import Swal from "sweetalert2";
import { FaTrash } from "react-icons/fa";

const ManageTickets = () => {

  const { data: tickets = [], isLoading, refetch } = useQuery({
    queryKey: ["allTickets"],
    queryFn: async () => {
      const res = await axiosPublic.get("/ticketsAdmin");
      return res.data;
    },
  });

  if (isLoading) return <Spinner />;

  const handleApprove = async (id) => {
    const res = await axiosPublic.patch(`/approve/${id}`);
    if (res.data.modifiedCount > 0) {
      Swal.fire("Approved!", "Ticket approved successfully", "success");
      refetch();
    }
  };

  const handleReject = async (id) => {
    const res = await axiosPublic.patch(`/reject/${id}`);
    if (res.data.modifiedCount > 0) {
      Swal.fire("Rejected!", "Ticket rejected successfully", "error");
      refetch();
    }
  };

  // ✅ DELETE HANDLER
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This ticket will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      const res = await axiosPublic.delete(`/ticketsAdmin/${id}`);
      if (res.data.deletedCount > 0) {
        Swal.fire("Deleted!", "Ticket deleted successfully", "success");
        refetch();
      }
    }
  };

  return (
    <div className="overflow-x-auto p-6">
      <h2 className="text-3xl font-bold mb-5">
        Manage Tickets ({tickets.length})
      </h2>

      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Ticket</th>
            <th>Route</th>
            <th>Price</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {tickets.map((ticket, index) => (
            <tr key={ticket._id}>
              <td>{index + 1}</td>
              <td>{ticket.title}</td>
              <td>{ticket.from} ➝ {ticket.to}</td>
              <td>{ticket.price} ৳</td>

              {/* STATUS */}
              <td>
                {ticket.status === "approved" && (
                  <span className="badge badge-success text-white">Approved</span>
                )}
                {ticket.status === "pending" && (
                  <span className="badge badge-warning text-white">Pending</span>
                )}
                {ticket.status === "rejected" && (
                  <span className="badge badge-error text-white">Rejected</span>
                )}
              </td>

              {/* ACTIONS */}
              <td className="flex gap-2">
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

                <button
                  onClick={() => handleDelete(ticket._id)}
                  className="btn btn-ghost btn-xs text-red-600"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageTickets;
