import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FiClock, FiMap, FiCheck } from "react-icons/fi";
import { FaBus, FaPlane, FaShip, FaTrain } from "react-icons/fa";
import UseAuth from "../../Hooks/UseAuth";

const transportIcons = {
  Bus: <FaBus className="inline-block text-blue-500 text-xl" />,
  Train: <FaTrain className="inline-block text-purple-500 text-xl" />,
  Air: <FaPlane className="inline-block text-red-500 text-xl" />,
  Ship: <FaShip className="inline-block text-green-500 text-xl" />,
};

const TicketsDetails = () => {
  const { id } = useParams();
  const [ticket, setTicket] = useState({});
  const [quantity, setQuantity] = useState(0);
  const { user } = UseAuth();
console.log(ticket);
  const [countdown, setCountdown] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  // Fetch Ticket
  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/tickets/${id}`);
        const data = await res.json();
        setTicket(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTicket();
  }, [id]);

  // Countdown
  useEffect(() => {
    if (!ticket?.departure) return;

    const interval = setInterval(() => {
      const diff = new Date(ticket.departure).getTime() - Date.now();

      if (diff <= 0) {
        setCountdown({ days: "00", hours: "00", minutes: "00", seconds: "00" });
        clearInterval(interval);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      const format = (num) => num.toString().padStart(2, "0");

      setCountdown({
        days: format(days),
        hours: format(hours),
        minutes: format(minutes),
        seconds: format(seconds),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [ticket?.departure]);

  const isExpired = new Date(ticket?.departure) < new Date();
  const noStock = ticket?.quantity === 0;
  const isBookDisabled = isExpired || noStock || quantity > ticket?.quantity;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-black to-purple-950 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <div className="bg-white/10 backdrop-blur-2xl shadow-[0_30px_80px_rgba(0,0,0,0.45)] rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">

            {/* IMAGE */}
            {ticket?.image && (
              <div className="overflow-hidden rounded-2xl shadow-xl">
                <img
                  src={ticket.image}
                  alt={ticket.title}
                  className="w-full h-[260px] sm:h-[340px] md:h-[420px] lg:h-[520px] object-cover hover:scale-110 transition duration-700"
                />
              </div>
            )}

            {/* CONTENT */}
            <div className="flex flex-col justify-between">

              {/* Title */}
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4 sm:mb-6">
                {ticket?.title}
              </h2>

              {/* INFO GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 text-sm sm:text-base md:text-lg text-white">

                <div className="info-box">
                  <FiMap className="icon text-indigo-400" />
                  <span className="ml-2">From:</span> {ticket?.from}
                </div>

                <div className="info-box">
                  <FiMap className="icon text-pink-400" />
                  <span className="ml-2">To:</span> {ticket?.to}
                </div>

                <div className="info-box">
                  {transportIcons[ticket?.transport]}
                  <span className="ml-2">Transport:</span> {ticket?.transport}
                </div>

                <div className="info-box">
                  <span>Price:</span>
                  <span className="ml-2 text-green-400 font-bold">
                    {ticket?.price} 💰
                  </span>
                </div>

                <div className="info-box">
                  <span>Available:</span>
                  <span className="ml-2 text-indigo-400 font-bold">
                    {ticket?.quantity}
                  </span>
                </div>

                <div className="info-box">
                  <FiClock className="icon text-red-400" />
                  <span className="ml-2">Departure:</span>
                  <span className="ml-1 text-red-400 font-bold">
                    {formatDate(ticket?.departure)}
                  </span>
                </div>

                {/* Countdown */}
                <div className="col-span-full mt-4">
                  <p className="font-semibold mb-2 text-indigo-300">
                    AI Departure Countdown
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-3 sm:p-4 rounded-2xl shadow-2xl">

                    {["Days", "Hours", "Minutes", "Seconds"].map((label, i) => {
                      const values = [
                        countdown.days,
                        countdown.hours,
                        countdown.minutes,
                        countdown.seconds,
                      ];

                      return (
                        <div
                          key={label}
                          className="flex flex-col items-center justify-center bg-gradient-to-b from-fuchsia-700 to-indigo-900 rounded-xl py-3 sm:py-4 shadow-xl animate-pulse"
                        >
                          <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
                            {values[i]}
                          </span>
                          <span className="text-[10px] sm:text-xs mt-1 uppercase tracking-widest text-indigo-200">
                            {label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Perks */}
                <div className="col-span-full">
                  <span className="block font-semibold text-indigo-300 mb-2">
                    Perks
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {ticket?.perks?.map((perk) => (
                      <span
                        key={perk}
                        className="inline-flex items-center bg-green-500/20 text-green-300 px-3 sm:px-4 py-1 rounded-full shadow text-xs sm:text-sm"
                      >
                        <FiCheck className="mr-1" /> {perk}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* USER INFO */}
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 sm:gap-4 mt-6 sm:mt-8 p-3 sm:p-4 bg-white/10 rounded-xl shadow">
                {user?.photoURL && (
                  <img
                    src={user.photoURL}
                    alt={user.displayName}
                    className="w-12 sm:w-14 h-12 sm:h-14 rounded-full border-2 border-indigo-400"
                  />
                )}
                <div className="text-white">
                  <p className="font-bold">{user?.displayName}</p>
                  <p className="text-xs sm:text-sm text-gray-300">{user?.email}</p>
                </div>
              </div>

              {/* BUTTON */}
              <button
                disabled={isBookDisabled}
                className={`mt-6 sm:mt-8 py-3 sm:py-4 rounded-2xl text-base sm:text-lg md:text-xl font-bold tracking-wide transition-all duration-300 w-full ${
                  isBookDisabled
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 hover:scale-105 hover:shadow-2xl text-white"
                }`}
              >
                {isExpired ? "Expired" : noStock ? "Sold Out" : "Book Ticket"}
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketsDetails;
