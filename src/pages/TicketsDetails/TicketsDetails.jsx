import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FiClock, FiMap, FiCheck } from "react-icons/fi";
import { FaBus, FaPlane, FaShip, FaTrain } from "react-icons/fa";
import UseAuth from "../../Hooks/UseAuth";
import Swal from "sweetalert2";
import { useBookingTicket } from "../../Hooks/useBookingTicket";

const transportIcons = {
  Bus: <FaBus className="text-blue-500" />,
  Train: <FaTrain className="text-purple-500" />,
  Air: <FaPlane className="text-red-500" />,
  Ship: <FaShip className="text-green-500" />,
};

const TicketsDetails = () => {
  const { id } = useParams();
  const { user } = UseAuth();
  const [ticket, setTicket] = useState({});
  const [countdown, setCountdown] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { mutateAsync, isPending, reset } = useBookingTicket();

  // Fetch Ticket
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/tickets/${id}`)
      .then((res) => res.json())
      .then((data) => setTicket(data));
  }, [id]);

  // Countdown
  useEffect(() => {
    if (!ticket?.departure) return;

    const interval = setInterval(() => {
      const diff = new Date(ticket.departure) - new Date();

      if (diff <= 0) {
        setCountdown({ days: "00", hours: "00", minutes: "00", seconds: "00" });
        clearInterval(interval);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 60000) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      const pad = (n) => n.toString().padStart(2, "0");

      setCountdown({
        days: pad(days),
        hours: pad(hours),
        minutes: pad(minutes),
        seconds: pad(seconds),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [ticket?.departure]);

  const isExpired = new Date(ticket?.departure) < new Date();
  const noStock = ticket?.quantity === 0;
  const isInvalidQty = quantity > ticket?.quantity || quantity < 1;
  const isDisabled = isExpired || noStock;

  const handleBooking = async () => {
    const totalPrice = ticket.price * quantity;

    const bookingInfo = {
      ticketId: ticket._id,
      title: ticket.title,
      from: ticket.from,
      to: ticket.to,
      transport: ticket.transport,
      price: ticket.price,
      quantity,
      totalPrice,
      image: ticket.image,
      departure: ticket.departure,
      status: "pending",
      buyer: {
        buyerName: user?.displayName,
        buyerEmail: user?.email,
        buyerPhoto: user?.photoURL,
      },
      vendor: {
        VendorName: ticket.Vendor?.VendorName,
        VendorEmail: ticket.Vendor?.VendorEmail,
        VendorImage: ticket.Vendor?.VendorImage,
      },
    };

    try {
      const data = await mutateAsync(bookingInfo);

      if (data.success) {
        Swal.fire("Success!", "Ticket booked successfully", "success");
        setIsModalOpen(false);

        reset();
      }
    } catch (err) {
      console.log(err);
      Swal.fire("Error!", "Booking failed", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-black to-purple-900 py-12 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl grid grid-cols-1 md:grid-cols-2 gap-6 p-5 md:p-10">
          {/* IMAGE */}
          <img
            src={ticket?.image}
            alt={ticket?.title}
            className="w-full h-64 md:h-[450px] object-cover rounded-3xl hover:scale-105 transition-transform duration-700"
          />

          {/* INFO */}
          <div className="flex flex-col justify-between text-white space-y-4 md:space-y-6">
            <div>
              {/* TITLE */}
              <h2 className="text-2xl md:text-4xl font-extrabold mb-4 text-gradient bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-400 bg-clip-text text-transparent">
                {ticket?.title}
              </h2>

              {/* FROM & TO */}
              <p className="flex items-center gap-2 text-sm md:text-base">
                <FiMap /> From: <span className="font-semibold">{ticket?.from}</span>
              </p>
              <p className="flex items-center gap-2 text-sm md:text-base">
                <FiMap /> To: <span className="font-semibold">{ticket?.to}</span>
              </p>

              {/* TRANSPORT */}
              <p className="flex items-center gap-2 text-sm md:text-base mt-2">
                {transportIcons[ticket?.transport]} Transport:{" "}
                <span className="font-semibold">{ticket?.transport}</span>
              </p>

              {/* PRICE & QUANTITY */}
              <p className="mt-2 text-sm md:text-base">
                💰 Price: <span className="text-green-400 font-semibold">{ticket?.price}</span>
              </p>
              <p className="text-sm md:text-base">
                🎟 Available: <span className="text-indigo-400 font-semibold">{ticket?.quantity}</span>
              </p>

              {/* DEPARTURE */}
              <p className="flex items-center gap-2 text-sm md:text-base mt-2">
                <FiClock className="text-red-400" /> Departure:{" "}
                <span className="font-semibold">{new Date(ticket?.departure).toLocaleString()}</span>
              </p>
            </div>

            {/* COUNTDOWN */}
            <div className="grid grid-cols-4 gap-2 text-center mt-4">
              {["days", "hours", "minutes", "seconds"].map((t) => (
                <div
                  key={t}
                  className="bg-gradient-to-br from-purple-700 to-indigo-900 p-2 md:p-3 rounded-xl shadow-md hover:scale-105 transition-transform"
                >
                  <p className="text-lg md:text-xl font-bold">{countdown[t]}</p>
                  <p className="uppercase text-[9px] md:text-[10px]">{t}</p>
                </div>
              ))}
            </div>

            {/* PERKS */}
            <div className="flex flex-wrap gap-2 mt-3">
              {ticket?.perks?.map((p) => (
                <span
                  key={p}
                  className="bg-green-500/20 px-3 py-1 rounded-full text-sm flex items-center hover:bg-green-500/30 transition"
                >
                  <FiCheck className="mr-1" /> {p}
                </span>
              ))}
            </div>

            {/* BOOK BUTTON */}
            <button
              disabled={isDisabled}
              onClick={() => setIsModalOpen(true)}
              className={`py-3 rounded-xl text-lg font-bold w-full transition ${
                isDisabled
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 hover:scale-105"
              }`}
            >
              {isExpired ? "Expired" : noStock ? "Sold Out" : "Book Now"}
            </button>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl w-[90%] max-w-sm space-y-4">
            <h3 className="text-xl font-bold text-gray-800">Confirm Booking</h3>

            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="input input-bordered w-full"
              min={1}
              max={ticket?.quantity}
            />
            <p className="text-xs text-green-500">Max: {ticket?.quantity}</p>

            <div className="flex gap-3">
              <button
                onClick={handleBooking}
                disabled={isInvalidQty || isPending}
                className="btn btn-success flex-1"
              >
                {isPending ? "Booking..." : "Confirm"}
              </button>

              <button
                onClick={() => setIsModalOpen(false)}
                className="btn btn-error flex-1"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketsDetails;
