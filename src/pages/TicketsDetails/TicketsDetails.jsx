import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FiClock, FiMap, FiCheck } from "react-icons/fi";
import { FaBus, FaPlane, FaShip, FaTrain } from "react-icons/fa";
import UseAuth from "../../Hooks/UseAuth";
import Swal from "sweetalert2";
import { useBookingTicket } from "../../Hooks/useBookingTicket";

// Existing Transport Icons
const transportIcons = {
  Bus: <FaBus className="text-blue-500" size={20} />,
  Train: <FaTrain className="text-purple-500" size={20} />,
  Air: <FaPlane className="text-red-500" size={20} />,
  Ship: <FaShip className="text-green-500" size={20} />,
};

const TicketsDetails = () => {
  const { id } = useParams();
  const { user } = UseAuth();
  const [ticket, setTicket] = useState({});
  const [countdown, setCountdown] = useState({});
  const [quantity, setQuantity] = useState(1); 
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { mutateAsync, isPending, reset } = useBookingTicket();

  // Fetch Ticket (Fnc remains same)
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/tickets/${id}`)
      .then((res) => res.json())
      .then((data) => setTicket(data));
  }, [id]);

  // Countdown Logic (Fnc remains same)
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
  const isInvalidQty = quantity > ticket?.quantity || quantity < 1 || !quantity;
  const isDisabled = isExpired || noStock;

  // Booking Handler (Fnc remains same)
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
    <div className="min-h-screen py-16 px-4 md:px-8 ">
      <div className="max-w-6xl mx-auto">
        <div className="rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 md:p-12">
          
          {/* IMAGE SECTION */}
          <div className="relative">
            <img
              src={ticket?.image}
              alt={ticket?.title}
              className="w-full h-80 md:h-full object-cover rounded-3xl shadow-xl transition-transform duration-500 hover:scale-[1.02]"
            />
            {/* Price Badge */}
            <div className="absolute top-4 right-4 bg-indigo-600 font-extrabold text-xl px-4 py-2 rounded-full shadow-lg">
              ${ticket?.price}
            </div>
          </div>

          {/* INFO SECTION */}
          <div className="flex flex-col justify-between space-y-6">
            <div>
              {/* TITLE */}
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4  leading-tight">
                {ticket?.title}
              </h2>

              {/* ROUTE */}
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 shadow-inner mb-4">
                <div className="flex items-center justify-between text-lg font-semibold text-gray-700">
                  <div className="flex items-center gap-2">
                    <FiMap className="text-green-500" />
                    <span className="text-gray-500 text-sm uppercase">From:</span>
                    <span className="text-gray-900">{ticket?.from}</span>
                  </div>
                  <div className="text-2xl font-light text-gray-300">|</div>
                  <div className="flex items-center gap-2">
                    <FiMap className="text-red-500" />
                    <span className="text-gray-500 text-sm uppercase">To:</span>
                    <span className="text-gray-900">{ticket?.to}</span>
                  </div>
                </div>
              </div>

              {/* DETAILS ROW */}
              <div className="grid grid-cols-2 gap-4 text-sm md:text-base">
                {/* Transport */}
                <p className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 text-blue-800 font-medium">
                  {transportIcons[ticket?.transport]} 
                  <span className="text-gray-500 font-normal">Mode:</span>
                  <span className="font-semibold">{ticket?.transport}</span>
                </p>

                {/* Available Quantity */}
                <p className="flex items-center gap-3 p-3 rounded-lg bg-indigo-50 text-indigo-800 font-medium">
                  <span className="text-xl">🎟</span> 
                  <span className="text-gray-500 font-normal">Available:</span>
                  <span className="font-semibold text-xl">{ticket?.quantity}</span>
                </p>
              </div>

              {/* DEPARTURE */}
              <div className="mt-4 p-4 rounded-xl bg-red-50 border border-red-200">
                <p className="flex items-center gap-3 text-lg font-bold text-red-700">
                  <FiClock size={24} /> 
                  Departure: 
                  <span className="font-extrabold ml-1">
                    {new Date(ticket?.departure).toLocaleString()}
                  </span>
                </p>
              </div>
            </div>

            {/* COUNTDOWN TIMER */}
            <div className="border-t border-gray-100 pt-6 mt-6">
              <p className="text-lg font-bold text-gray-700 mb-3">Time Until Departure:</p>
              <div className="grid grid-cols-4 gap-4 text-center">
                {["days", "hours", "minutes", "seconds"].map((t) => (
                  <div
                    key={t}
                    className="p-3 md:p-5 rounded-xl bg-gray-800 text-white shadow-xl transform hover:scale-105 transition-transform duration-300"
                  >
                    <p className="text-2xl md:text-4xl font-extrabold">{countdown[t]}</p>
                    <p className="uppercase text-xs font-medium mt-1 text-gray-300">{t}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* PERKS / FEATURES */}
            <div className="border-t border-gray-100 pt-6 mt-6">
              <p className="text-lg font-bold text-gray-700 mb-3">Ticket Perks:</p>
              <div className="flex flex-wrap gap-2">
                {ticket?.perks?.map((p) => (
                  <span
                    key={p}
                    className="px-4 py-1.5 rounded-full text-sm font-medium bg-green-100 text-green-700 flex items-center shadow-sm hover:bg-green-200 transition"
                  >
                    <FiCheck className="mr-2 text-green-500" /> {p}
                  </span>
                ))}
              </div>
            </div>

            {/* BOOK BUTTON */}
            <button
              disabled={isDisabled}
              onClick={() => setIsModalOpen(true)}
              className={`py-4 rounded-xl text-xl font-bold w-full transition duration-300 transform shadow-lg ${
                isDisabled
                  ? "bg-gray-400 text-gray-700 cursor-not-allowed shadow-none"
                  : "text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/40"
              }`}
            >
              {isExpired ? "Ticket Expired" : noStock ? "Sold Out" : "Book Your Ticket Now"}
            </button>
          </div>
        </div>
      </div>

      {/* MODAL (Enhanced Styling) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-2xl w-full max-w-md shadow-2xl space-y-6 transform transition-all duration-300 scale-100">
            <h3 className="text-2xl font-extrabold text-gray-900 border-b pb-3">
              Confirm Booking
            </h3>

            <p className="text-sm text-gray-600">
              Booking: **{ticket?.title}** | Price: **${ticket?.price}**
            </p>

            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Quantity (Max: {ticket?.quantity})
            </label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className={`w-full p-3 border-2 rounded-lg text-lg font-semibold focus:ring-indigo-500 focus:border-indigo-500 transition ${
                isInvalidQty ? "border-red-500" : "border-gray-300"
              }`}
              min={1}
              max={ticket?.quantity}
              placeholder="Enter quantity"
            />
            
            {isInvalidQty && quantity > 0 && (
                <p className="text-red-500 text-sm">Quantity must be between 1 and {ticket?.quantity}.</p>
            )}

            <div className="text-xl font-bold pt-2">
                Total Price: <span className="text-indigo-600">${(ticket.price * quantity).toFixed(2)}</span>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                onClick={handleBooking}
                disabled={isInvalidQty || isPending}
                className={`flex-1 py-3 rounded-lg text-white font-bold transition duration-300 ${
                  isInvalidQty || isPending
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600 shadow-md shadow-green-500/30"
                }`}
              >
                {isPending ? (
                  <span className="flex items-center justify-center gap-2">
                    <FaBus className="animate-spin" /> Confirming...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <FiCheck /> Confirm Booking
                  </span>
                )}
              </button>

              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-3 rounded-lg font-bold text-red-600 border border-red-300 bg-white hover:bg-red-50 transition duration-300"
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