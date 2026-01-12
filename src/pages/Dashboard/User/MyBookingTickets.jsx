import React, { useEffect, useState } from "react";
import { FiClock, FiMapPin } from "react-icons/fi";
import { FaBus, FaPlane, FaShip, FaTrain } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../../components/common/Spinner/Spinner";
import UseAuth from "../../../Hooks/UseAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const transportIcons = {
  Bus: <FaBus className="text-lg text-blue-600" />,
  Plane: <FaPlane className="text-lg text-blue-600" />,
  Ship: <FaShip className="text-lg text-blue-600" />,
  Train: <FaTrain className="text-lg text-blue-600" />,
};

const MyBookingTickets = () => {
  const { user } = UseAuth();
  const [countdowns, setCountdowns] = useState({});

  const axiosSecure=useAxiosSecure()

  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ["myBookingTickets"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user-tickets?email=${user?.email}`);
      return res.data;
    },
  });

  useEffect(() => {
    if (!tickets.length) return;

    const interval = setInterval(() => {
      const updates = {};

      tickets.forEach((ticket) => {
        const diff = new Date(ticket.departure) - new Date();
        const pad = (n) => n.toString().padStart(2, "0");

        if (diff <= 0) {
          updates[ticket._id] = {
            days: "00",
            hours: "00",
            minutes: "00",
            seconds: "00",
            expired: true,
          };
        } else {
          const d = Math.floor(diff / (1000 * 60 * 60 * 24));
          const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
          const m = Math.floor((diff / 60000) % 60);
          const s = Math.floor((diff / 1000) % 60);

          updates[ticket._id] = {
            days: pad(d),
            hours: pad(h),
            minutes: pad(m),
            seconds: pad(s),
            expired: false,
          };
        }
      });

      setCountdowns(updates);
    }, 1000);

    return () => clearInterval(interval);
  }, [tickets]);

  const handlePayment = async (ticket) => {
    const bookingInfo = {
      ticketId: ticket.ticketId,
      bookingId:ticket._id,
      title: ticket.title,
      from: ticket.from,
      to: ticket.to,
      transport: ticket.transport,
      price: Number(ticket.price),
      quantity: Number(ticket.quantity),
      image: ticket.image,
      departure: ticket.departure,

      buyer: {
        buyerName: user?.displayName,
        buyerEmail: user?.email,
        buyerPhoto: user?.photoURL,
      },
      Vendor: {
        VendorName: ticket.vendor?.VendorName,
        VendorEmail: ticket.vendor?.VendorEmail,
        VendorImage: ticket.vendor?.VendorImage,
      },
    };

    try {
      const res = await axiosSecure.post(
        "/create-checkout-session",
        bookingInfo
      );
      window.location.href=res.data.url
      // console.log("Payment Response:", res.data.url);
    } catch (error) {
      console.error("Payment Error:", error);
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="px-3 py-4 md:px-5 lg:px-8">
      <title>My Booked Tickets - TravelEase</title>
      {/* Page Title */}
      <h2
        className="text-2xl sm:text-3xl font-bold mb-4 text-center 
                     bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500
                     bg-clip-text text-transparent animate-bounce"
      >
        My Booked Tickets
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tickets.map((ticket) => {
          const cd = countdowns[ticket._id] || {};

          return (
            <div
              key={ticket._id}
              className=" backdrop-blur-sm shadow-md rounded-lg overflow-hidden border border-gray-200
                         hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
            >
              {/* Image */}
              <img
                src={ticket.image}
                alt={ticket.title}
                className="h-36 sm:h-40 w-full object-cover rounded-t-lg"
              />

              <div className="p-3 space-y-1.5">
                {/* Ticket Title */}
                <h3 className="text-base sm:text-lg font-semibold  truncate">
                  {ticket.title}
                </h3>

                {/* Transport */}
                <div className="flex items-center gap-1.5">
                  <div className="p-1 bg-blue-50 rounded-full shadow">
                    {transportIcons[ticket.transport]}
                  </div>
                  <p className="text-gray-700 text-xs sm:text-sm font-medium">
                    {ticket.transport}
                  </p>
                </div>

                {/* From - To */}
                <div className="flex items-center gap-1  text-xs sm:text-sm font-medium">
                  <FiMapPin className="text-blue-600" />
                  {ticket.from} → {ticket.to}
                </div>

                {/* Departure */}
                <div className="flex items-center gap-1  text-xs sm:text-sm">
                  <FiClock className="text-indigo-600" />
                  {new Date(ticket.departure).toLocaleString()}
                </div>

                {/* Quantity + Price */}
                <div className=" text-xs sm:text-sm space-y-0.5">
                  <p>
                    <span className="font-semibold">Qty:</span>{" "}
                    {ticket.quantity}
                  </p>
                  <p>
                    <span className="font-semibold">Total:</span>{" "}
                    {ticket.totalPrice} 💰
                  </p>
                </div>

                {/* Status badge */}
                <div>
                  {ticket.status === "pending" && (
                    <span className="px-2 py-0.5 bg-yellow-200 text-yellow-800 rounded-full text-xs font-semibold">
                      Pending
                    </span>
                  )}
                  {ticket.status === "accepted" && (
                    <span className="px-2 py-0.5 bg-blue-200 text-blue-800 rounded-full text-xs font-semibold">
                      Accepted
                    </span>
                  )}
                  {ticket.status === "rejected" && (
                    <span className="px-2 py-0.5 bg-red-200 text-red-700 rounded-full text-xs font-semibold">
                      Rejected
                    </span>
                  )}
                  {ticket.status === "paid" && (
                    <span className="px-2 py-0.5 bg-green-200 text-green-700 rounded-full text-xs font-semibold">
                      Paid
                    </span>
                  )}
                </div>

                {/* Countdown */}
                {ticket.status !== "rejected" && ticket.status !== "paid" && (
                  <div className="grid grid-cols-4 gap-1 text-center mt-1.5">
                    {["days", "hours", "minutes", "seconds"].map((t) => (
                      <div
                        key={t}
                        className="bg-gradient-to-br from-indigo-500 via-purple-600 to-fuchsia-700
                                   p-1.5 rounded-md shadow text-white flex flex-col items-center
                                   transform hover:scale-105 transition-all"
                      >
                        <p className="text-xs sm:text-sm font-bold">{cd[t]}</p>
                        <p className="text-[7px] sm:text-[8px] uppercase opacity-90">
                          {t}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Pay Button */}
                {ticket.status === "accepted" && !cd?.expired && (
                  <button
                    onClick={() => handlePayment(ticket)}
                    className="w-full mt-1.5 bg-gradient-to-r from-blue-600 to-indigo-700
                                     hover:from-blue-700 hover:to-indigo-800 text-white py-1.5
                                     rounded-md font-semibold transition-all shadow-sm hover:shadow-md text-xs sm:text-sm cursor-pointer"
                  >
                    Pay Now
                  </button>
                )}

                {/* Expired Notice */}
                {cd?.expired && ticket.status === "accepted" && (
                  <p className="text-red-600 font-semibold mt-1 text-center text-xs sm:text-sm">
                    Cannot pay — Departure time passed
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyBookingTickets;
