import React from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import axiosPublic from "../../../../Hooks/useAxios";
import Spinner from "../../../../components/common/Spinner/Spinner";
import UseAuth from "../../../../Hooks/UseAuth";

// Icons
import { FiCheckCircle, FiXCircle, FiClock } from "react-icons/fi";

const RequestedBookings = () => {
  const { user } = UseAuth();

  const { data: bookings = [], isLoading, refetch } = useQuery({
    queryKey: ["requestedBookings", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/requested-tickets?email=${user?.email}`);
      return res.data;
    },
  });

  // Accept Booking
  const handleAccept = async (id) => {
    const res = await axiosPublic.patch(`/accept-booking/${id}`);
    if (res.data.modifiedCount > 0) {
      Swal.fire("Accepted!", "Booking request accepted.", "success");
      refetch();
    }
  };

  // Reject Booking
  const handleReject = async (id) => {
    const res = await axiosPublic.patch(`/reject-booking/${id}`);
    if (res.data.modifiedCount > 0) {
      Swal.fire("Rejected!", "Booking request rejected.", "error");
      refetch();
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="p-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-5 text-gray-800">
        Requested Ticket Bookings
      </h2>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="p-3 border">User Name</th>
              <th className="p-3 border">User Email</th>
              <th className="p-3 border">Ticket Title</th>
              <th className="p-3 border">Quantity</th>
              <th className="p-3 border">Total Price</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((b) => (
              <tr key={b._id} className="border hover:bg-gray-50 transition">

                {/* User Name */}
                <td className="p-3 border font-medium">{b.buyer.buyerName}</td>

                {/* User Email */}
                <td className="p-3 border text-gray-600">{b.buyer.buyerEmail}</td>

                {/* Ticket Title */}
                <td className="p-3 border">{b.title}</td>

                {/* Quantity */}
                <td className="p-3 border">{b.quantity}</td>

                {/* Total Price */}
                <td className="p-3 border font-semibold">{b.totalPrice} 💰</td>

                {/* Status */}
                <td className="p-3 border">
                  {b.status === "pending" && (
                    <span className="flex items-center gap-1 px-2 py-1 rounded bg-yellow-200 text-yellow-800 text-xs font-semibold">
                      <FiClock /> Pending
                    </span>
                  )}
                  {b.status === "accepted" && (
                    <span className="flex items-center gap-1 px-2 py-1 rounded bg-blue-200 text-blue-800 text-xs font-semibold">
                      <FiCheckCircle /> Accepted
                    </span>
                  )}
                  {b.status === "rejected" && (
                    <span className="flex items-center gap-1 px-2 py-1 rounded bg-red-200 text-red-800 text-xs font-semibold">
                      <FiXCircle /> Rejected
                    </span>
                  )}
                </td>

                {/* Action Buttons */}
                <td className="p-3 border text-center">
                  {b.status === "pending" && (
                    <div className="flex justify-center gap-2">

                      {/* Accept Button */}
                      <button
                        onClick={() => handleAccept(b._id)}
                        className="flex items-center gap-1 px-3 py-1 cursor-pointer bg-green-600 hover:bg-green-700 text-white rounded transition"
                      >
                        <FiCheckCircle /> Accept
                      </button>

                      {/* Reject Button */}
                      <button
                        onClick={() => handleReject(b._id)}
                        className="flex items-center gap-1 px-3 py-1 cursor-pointer bg-red-600 hover:bg-red-700 text-white rounded transition"
                      >
                        <FiXCircle /> Reject
                      </button>
                    </div>
                  )}

                  {(b.status === "accepted" || b.status === "rejected") && (
                    <p className="text-gray-600 text-sm italic">
                      Action Completed
                    </p>
                  )}
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default RequestedBookings;
