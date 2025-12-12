import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Spinner from "../../../../components/common/Spinner/Spinner";
import Swal from "sweetalert2";

const AdvertiseTickets = () => {
  const axiosSecure = useAxiosSecure();

  const { data: tickets = [], isLoading, refetch } = useQuery({
    queryKey: ["approvedTickets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/approved-tickets");
      return res.data;
    },
  });

  if (isLoading) return <Spinner />;

  // Toggle advertise
  const handleAdvertiseToggle = async (ticket) => {
    try {
      await axiosSecure.patch(`/ticketsAdvertise/${ticket._id}`, {
        advertised: !ticket.advertised,
      });

      Swal.fire({
        title: ticket.advertised ? "Unadvertised!" : "Advertised!",
        icon: "success",
        timer: 1200,
        showConfirmButton: false,
      });

      refetch();
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Error!",
        text: "Something went wrong",
        icon: "error",
        timer: 1200,
        showConfirmButton: false,
      });
    }
  };

  return (
    <div className="overflow-x-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Approved Tickets</h2>

      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Ticket</th>
            <th>From → To</th>
            <th>Price</th>
            <th>Vendor</th>
            <th>Advertise</th>
          </tr>
        </thead>

        <tbody>
          {tickets.map((ticket, idx) => (
            <tr key={ticket._id}>
              <th>{idx + 1}</th>

              {/* Ticket Image + Title */}
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img src={ticket.image} alt={ticket.title} />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{ticket.title}</div>
                    <div className="text-sm opacity-50">{ticket.transport}</div>
                  </div>
                </div>
              </td>

              {/* From → To */}
              <td>
                {ticket.from} → {ticket.to}
              </td>

              {/* Price */}
              <td>{ticket.price} ৳</td>

              {/* Vendor */}
              <td>
                <div className="flex items-center gap-2">
                  <img
                    src={ticket.Vendor.VendorImage}
                    alt={ticket.Vendor.VendorName}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-sm">{ticket.Vendor.VendorName}</span>
                </div>
              </td>

              {/* Advertise Toggle */}
              <td>
                <input
                  type="checkbox"
                  className="toggle toggle-success"
                  checked={ticket.advertised || false}
                  onChange={() => handleAdvertiseToggle(ticket)}
                />
              </td>
            </tr>
          ))}
        </tbody>

        <tfoot>
          <tr>
            <th>#</th>
            <th>Ticket</th>
            <th>From → To</th>
            <th>Price</th>
            <th>Vendor</th>
            <th>Advertise</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default AdvertiseTickets;
