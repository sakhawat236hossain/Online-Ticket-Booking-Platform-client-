import React from "react";
import { useQuery } from "@tanstack/react-query";
import axiosPublic from "../../../Hooks/useAxios";
import { Link } from "react-router-dom";
import Spinner from "../../../components/common/Spinner/Spinner";

const LatestTickets = () => {
  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ["latestTickets"],
    queryFn: async () => {
      const res = await axiosPublic.get("/tickets");
      return res.data;
    },
  });

  if (isLoading) return <Spinner />;

  return (
    <div className="px-6 py-12 bg-gray-50">
      
      {/* ======= SECTION TITLE ======= */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800">
          Latest Tickets
        </h1>
        <p className="text-gray-500 mt-2">
          Newly added tickets available for booking
        </p>
        <div className="w-20 h-1 bg-red-500 mx-auto mt-4 rounded"></div>
      </div>

      {/* ======= TICKET GRID ======= */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {tickets.map((ticket) => (
          <div
            key={ticket._id}
            className="border p-5 rounded-xl shadow-lg bg-white hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
          >
            {/* IMAGE */}
            <img
              src={ticket.image}
              className="w-full h-44 object-cover rounded-lg"
            />

            {/* TITLE */}
            <h2 className="text-xl font-bold mt-3 text-gray-800">
              {ticket.title}
            </h2>

            {/* ROUTE */}
            <p className="text-gray-600 mt-1">
              {ticket.from} → {ticket.to}
            </p>

            {/* TRANSPORT */}
            <p className="text-blue-600 font-semibold mt-1">
              Transport: {ticket.transport}
            </p>

            {/* PRICE + QUANTITY */}
            <div className="mt-3 flex justify-between items-center">
              <p className="text-red-600 font-bold text-lg">
                ${ticket.price}
              </p>

              <p className="text-gray-700 font-semibold">
                Qty: {ticket.quantity}
              </p>
            </div>

            {/* PERKS */}
            <div className="mt-3">
              <p className="font-semibold text-gray-800">Perks:</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {ticket.perks?.map((perk) => (
                  <span
                    key={perk}
                    className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-xs"
                  >
                    {perk}
                  </span>
                ))}
              </div>
            </div>

            {/* DETAILS BUTTON */}
            <Link to={`/ticket/${ticket._id}`}>
              <button className="btn btn-error w-full mt-4 text-white">
                See Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestTickets;
