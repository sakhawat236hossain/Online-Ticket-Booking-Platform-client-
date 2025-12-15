import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Spinner from "../../../components/common/Spinner/Spinner";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const LatestTickets = () => {
  const axiosSecure = useAxiosSecure();
  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ["latestTickets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/latest-tickets");
      return res.data;
    },
  });

  if (isLoading) return <Spinner />;

  if (tickets.length === 0) {
    return (
      <div className="px-6 py-12  text-center">
        <h2 className="text-2xl font-semibold ">
          No new tickets have been added recently.
        </h2>
      </div>
    );
  }

  return (
    <div className="px-6 py-16  dark:text-white">
      
      {/* SECTION TITLE */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold ">
          🚀 Recently Added Tickets
        </h1>
        <p className=" mt-3">
          Don't miss out on the newest routes and deals available for booking.
        </p>
        <div className="w-24 h-1 bg-red-500 mx-auto mt-4 rounded-full"></div>
      </div>

      {/* TICKET GRID - 4 columns for Latest Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {tickets.map((ticket) => {
          // Simple date format: DD/MM/YYYY HH:MM
          const departureDate = new Date(ticket.departure);
          const formattedDate = `${departureDate.getDate().toString().padStart(2, "0")}/${
            (departureDate.getMonth() + 1).toString().padStart(2, "0")
          }/${departureDate.getFullYear()} ${departureDate.getHours().toString().padStart(2, "0")}:${departureDate.getMinutes().toString().padStart(2, "0")}`;

          return (
            <div
              key={ticket._id}
              className="group relative r border-gray-200 dark:border-gray-700 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.01] flex flex-col justify-between"
            >
              
              {/* IMAGE & TRANSPORT BADGE */}
              <div className="relative overflow-hidden">
                <img
                  src={ticket.image}
                  className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-110"
                  alt={ticket.title}
                />
                <div className="absolute top-2 left-2  px-2 py-0.5 rounded text-xs font-bold uppercase shadow-md">
                  {ticket.transport}
                </div>
              </div>

              <div className="p-4 flex flex-col flex-grow">
                
                {/* TICKET TITLE */}
                <h2 className="text-lg font-bold  truncate mb-1" title={ticket.title}>
                  {ticket.title}
                </h2>
                
                {/* ROUTE / DEPARTURE */}
                <p className="text-sm ">
                  {ticket.from} → {ticket.to}
                </p>
                <p className="text-xs  mt-1">
                  🕒 Departs: <span className="font-medium  dark:text-gray-300">{formattedDate}</span>
                </p>

                {/* PERKS */}
                {ticket.perks?.length > 0 && (
                  <div className="mt-3">
                    <p className="font-semibold text-xs uppercase mb-1">
                      Perks:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {ticket.perks.slice(0, 2).map((perk, index) => ( 
                        <span
                          key={index}
                          className="px-2 py-0.5  dark:bg-indigo-700 text-indigo-700 dark:text-indigo-200 rounded-full text-xs font-medium"
                        >
                          {perk}
                        </span>
                      ))}
                      {ticket.perks.length > 2 && (
                          <span className="text-xs  self-center">
                              +{ticket.perks.length - 2}
                          </span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* PRICE + QUANTITY + BUTTON */}
              <div className="px-4 pb-4 pt-3 border-t  flex justify-between items-center">
                  
                  {/* PRICE & QUANTITY */}
                  <div>
                      <p className="text-2xl font-extrabold text-red-600 dark:text-red-400 leading-none">
                          ${ticket.price}
                      </p>
                      <p className="text-xs   mt-1">
                          Seats: {ticket.quantity || 0}
                      </p>
                  </div>
                  
                  {/* DETAILS BUTTON */}
                  <Link to={`/ticket/${ticket._id}`}>
                      <button className="btn btn-error btn-sm  font-semibold shadow-md hover:shadow-lg transition-shadow duration-300">
                        Details
                      </button>
                  </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LatestTickets;