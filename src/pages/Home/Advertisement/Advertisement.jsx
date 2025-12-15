import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Spinner from "../../../components/common/Spinner/Spinner";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const Advertisement = () => {
  const axiosSecure = useAxiosSecure();
  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ["advertisementTickets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/ticketsAdvertised");
      return res.data;
    },
  });

  if (isLoading) return <Spinner />;

  if (tickets.length === 0) {
    return (
      <div className="px-6 py-12  text-center">
        <h2 className="text-2xl font-semibold text-gray-500 dark:text-gray-400">
          No featured tickets are available right now.
        </h2>
      </div>
    );
  }

  return (
    <div className="px-6 py-16  dark:text-white">
      
      {/* SECTION TITLE */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold  dark:text-white">
          ✨ Featured Deals & Offers
        </h1>
        <p className=" dark:text-gray-300 mt-3">
          Grab your tickets now! Top 6 exclusive offers selected by our admins.
        </p>
        <div className="w-24 h-1 bg-red-500 mx-auto mt-4 rounded-full"></div>
      </div>

      {/* TICKET GRID - 3 columns for better look with 6 items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {tickets.slice(0, 6).map((ticket) => (
          <div
            key={ticket._id}
            className="group relative  dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] flex flex-col justify-between"
          >
            {/* IMAGE */}
            <div className="relative overflow-hidden">
              <img
                src={ticket.image}
                className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-110"
                alt={ticket.title}
              />
              {/* Transport Type Badge (Upper Right) */}
              <div className="absolute top-3 right-3 bg-red-600  px-3 py-1 rounded-full text-xs font-bold uppercase shadow-lg">
                {ticket.transport}
              </div>
            </div>

            <div className="p-5 flex flex-col flex-grow">
              
              {/* TICKET TITLE */}
              <h2 className="text-2xl font-bold  dark:text-white truncate mb-1" title={ticket.title}>
                {ticket.title}
              </h2>
              
              {/* ROUTE */}
              <p className="text-sm dark:text-gray-300 mb-3">
                <span className="font-medium  dark:text-gray-100">{ticket.from}</span> → <span className="font-medium  dark:text-gray-100">{ticket.to}</span>
              </p>

              {/* PERKS */}
              {ticket.perks?.length > 0 && (
                <div className="mb-3">
                  <p className="font-semibold text-xs uppercase  dark:text-gray-400 mb-1">
                    Amenities:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {ticket.perks.slice(0, 3).map((perk, index) => (
                      <span
                        key={index}
                        className="px-2 py-0.5 bg-green-100 dark:bg-green-700 text-green-700 dark:text-green-200 rounded text-xs font-medium"
                      >
                        {perk}
                      </span>
                    ))}
                    {ticket.perks.length > 3 && (
                        <span className="text-xs  dark:text-gray-400 self-center">
                            +{ticket.perks.length - 3}
                        </span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* PRICE + QUANTITY + BUTTON */}
            <div className="px-5 pb-5 pt-3 border-t dark:border-gray-700 flex justify-between items-center">
                
                {/* PRICE & QUANTITY */}
                <div>
                    <p className="text-3xl font-extrabold text-red-600 dark:text-red-400 leading-none">
                        ${ticket.price}
                    </p>
                    <p className="text-sm  dark:text-gray-400 mt-1">
                        Available Qty: {ticket.quantity || 0}
                    </p>
                </div>
                
                {/* DETAILS BUTTON */}
                <Link to={`/ticket/${ticket._id}`}>
                    <button className="btn btn-error  font-semibold px-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                      See Details
                    </button>
                </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Advertisement;