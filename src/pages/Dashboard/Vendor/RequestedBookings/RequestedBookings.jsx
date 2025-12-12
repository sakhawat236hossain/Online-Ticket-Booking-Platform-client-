import React from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import axiosPublic from "../../../../Hooks/useAxios";
import Spinner from "../../../../components/common/Spinner/Spinner";
import UseAuth from "../../../../Hooks/UseAuth";

// Icons
import { FiCheckCircle, FiXCircle } from "react-icons/fi";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const RequestedBookings = () => {
  const { user } = UseAuth();
  const axiosSecure =useAxiosSecure()

const { data: bookings = [], isLoading, refetch } = useQuery({
  queryKey: ["requestedBookings", user?.email],
  queryFn: async () => {
    const res = await axiosSecure.get(`/requested-tickets?email=${user?.email}`);
    return res?.data
  },
});

  // Accept Booking
  const handleAccept = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You are going to ACCEPT this booking request.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Accept",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      const res = await axiosPublic.patch(`/accept-booking/${id}`);
      if (res.data.modifiedCount > 0) {
        Swal.fire("Accepted!", "Booking request accepted.", "success");
        refetch();
      }
    }
  };

  // Reject Booking
  const handleReject = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You are going to REJECT this booking request.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Reject",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      const res = await axiosPublic.patch(`/reject-booking/${id}`);
      if (res.data.modifiedCount > 0) {
        Swal.fire("Rejected!", "Booking request rejected.", "error");
        refetch();
      }
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="overflow-x-auto w-full p-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-5 text-gray-800">
        Requested Ticket Bookings
      </h2>

      <table className="table">
        {/* Head */}
        <thead>
          <tr>
            <th>#</th>
            <th>User Info</th>
            <th>Ticket Details</th>
            <th>Price & Status</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {bookings.map((b, index) => (
            <tr key={b._id}>
              {/* Index */}
              <th>{index + 1}</th>

              {/* User Info (Merged Name & Email) */}
              <td>
                <div className="font-bold">{b.buyer.buyerName}</div>
                <div className="text-sm opacity-50">{b.buyer.buyerEmail}</div>
              </td>

              {/* Ticket Details (Merged Title & Quantity) */}
              <td>
                <div className="font-semibold">{b.title}</div>
                <span className="badge badge-ghost badge-sm mt-1">
                  Qty: {b.quantity}
                </span>
              </td>

              {/* Price & Status */}
              <td>
                <div className="font-bold mb-1">{b.totalPrice} 💰</div>
                
                {b.status === "pending" && (
                  <span className="badge badge-warning text-white badge-sm">Pending</span>
                )}
                {b.status === "accepted" && (
                  <span className="badge badge-success text-white badge-sm">Accepted</span>
                )}
                {b.status === "rejected" && (
                  <span className="badge badge-error text-white badge-sm">Rejected</span>
                )}
              </td>

              {/* Actions */}
              <th className="text-center">
                {b.status === "pending" ? (
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => handleAccept(b._id)}
                      className="btn btn-success btn-xs text-white tooltip"
                      data-tip="Accept"
                    >
                      <FiCheckCircle size={14} /> Accept
                    </button>
                    <button
                      onClick={() => handleReject(b._id)}
                      className="btn btn-error btn-xs text-white tooltip"
                      data-tip="Reject"
                    >
                      <FiXCircle size={14} /> Reject
                    </button>
                  </div>
                ) : (
                  <span className="text-gray-400 text-xs italic font-normal">
                    Action Completed
                  </span>
                )}
              </th>
            </tr>
          ))}
        </tbody>

       
      </table>
    </div>
  );
};

export default RequestedBookings;