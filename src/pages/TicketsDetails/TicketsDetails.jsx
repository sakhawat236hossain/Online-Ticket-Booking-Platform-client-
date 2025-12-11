import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FiClock, FiMap, FiCheck } from "react-icons/fi";
import { FaBus, FaPlane, FaShip, FaTrain } from "react-icons/fa";
import UseAuth from "../../Hooks/UseAuth";
import Swal from "sweetalert2";
import { useBookingTicket } from "../../Hooks/useBookingTicket";

const transportIcons = {
  Bus: <FaBus className="text-blue-400 inline" />,
  Train: <FaTrain className="text-purple-400 inline" />,
  Air: <FaPlane className="text-red-400 inline" />,
  Ship: <FaShip className="text-green-400 inline" />,
};

const TicketsDetails = () => {
  const { id } = useParams();
  const { user } = UseAuth();
  const [ticket, setTicket] = useState({});
  const [countdown, setCountdown] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { mutateAsync, isPending,reset } = useBookingTicket();

  // Fetch Ticket
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/tickets/${id}`)
      .then(res => res.json())
      .then(data => setTicket(data));
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

      const pad = n => n.toString().padStart(2, "0");

      setCountdown({
        days: pad(days),
        hours: pad(hours),
        minutes: pad(minutes),
        seconds: pad(seconds)
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
 };

 try {

 const data = await mutateAsync(bookingInfo);

      if(data.success){
     Swal.fire("Success!", "Ticket booked successfully", "success");
  setIsModalOpen(false);
    
          
    setTicket(prevTicket => ({
     ...prevTicket, 
   quantity: data.updatedQuantity 
  }));
          
reset();
      }

} catch (err) {
console.log(err);
 Swal.fire("Error!", "Booking failed", "error");
}
 };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-black to-purple-950 py-12">
      <div className="max-w-6xl mx-auto px-4">

        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-5 md:p-10 shadow-2xl grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* IMAGE */}
          <img
            src={ticket?.image}
            className="rounded-3xl w-full h-[280px] md:h-[450px] object-cover hover:scale-105 duration-700"
          />

          {/* INFO */}
          <div className="flex flex-col justify-between text-white space-y-5">

            <div>
              <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
                {ticket?.title}
              </h2>

              <p className="flex items-center gap-2"><FiMap /> From: {ticket?.from}</p>
              <p className="flex items-center gap-2"><FiMap /> To: {ticket?.to}</p>

              <p className="flex items-center gap-2">
                {transportIcons[ticket?.transport]} Transport: {ticket?.transport}
              </p>

              <p>💰 Price: <span className="text-green-400">{ticket?.price}</span></p>
              <p>🎟 Available: <span className="text-indigo-400">{ticket?.quantity}</span></p>

              <p className="flex items-center gap-2">
                <FiClock className="text-red-400" />
                Departure: {new Date(ticket?.departure).toLocaleString()}
              </p>
            </div>

            {/* COUNTDOWN */}
            <div className="grid grid-cols-4 gap-3 text-center mt-4">
              {["days", "hours", "minutes", "seconds"].map(t => (
                <div
                  key={t}
                  className="bg-gradient-to-b from-fuchsia-700 to-indigo-900 p-3 rounded-xl shadow-lg animate-pulse"
                >
                  <p className="text-xl md:text-2xl font-bold">{countdown[t]}</p>
                  <p className="uppercase text-[10px]">{t}</p>
                </div>
              ))}
            </div>

            {/* PERKS */}
            <div className="flex flex-wrap gap-2">
              {ticket?.perks?.map(p => (
                <span key={p} className="bg-green-500/20 px-3 py-1 rounded-full text-sm flex items-center">
                  <FiCheck className="mr-1" /> {p}
                </span>
              ))}
            </div>

            {/* BUTTON */}
            <button
              disabled={isDisabled}
              onClick={() => setIsModalOpen(true)}
              className={`py-3 rounded-xl text-lg font-bold transition ${
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

          <div className="bg-white p-6 rounded-2xl w-[320px] space-y-4">

            <h3 className="text-xl font-bold">Confirm Booking</h3>

            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="input input-bordered w-full"
              min={1}
              max={ticket?.quantity}
            />

            <p className="text-xs text-red-500">Max: {ticket?.quantity}</p>

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
