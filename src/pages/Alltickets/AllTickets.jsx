import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import axiosPublic from "../../Hooks/useAxios"; 
import Spinner from "../../components/common/Spinner/Spinner";

const AllTickets = () => {
  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ["approvedTickets"],
    queryFn: async () => {
      const res = await axiosPublic.get("/approved-tickets");
      return res.data;
    },
  });

  // ================= STATE MANAGEMENT  =================
  const [searchFrom, setSearchFrom] = useState("");
  const [searchTo, setSearchTo] = useState("");
  const [filterTransport, setFilterTransport] = useState("all");
  const [sortPrice, setSortPrice] = useState("none"); 
  const [currentPage, setCurrentPage] = useState(1);
  const ticketsPerPage = 6;

  // ================= LOGIC: FILTER + SEARCH + SORT (useMemo hook) =================
  const filteredTickets = useMemo(() => {
    if (!tickets) return [];

    let temp = [...tickets];

    if (searchFrom) {
      temp = temp.filter((t) => 
        t.from && t.from.toLowerCase().includes(searchFrom.toLowerCase())
      );
    }


    if (searchTo) {
      temp = temp.filter((t) => 
        t.to && t.to.toLowerCase().includes(searchTo.toLowerCase())
      );
    }


    if (filterTransport !== "all") {
      temp = temp.filter(
        (t) => t.transport && t.transport.toLowerCase() === filterTransport.toLowerCase()
      );
    }

    if (sortPrice === "low") {
      temp.sort((a, b) => a.price - b.price);
    } else if (sortPrice === "high") {
      temp.sort((a, b) => b.price - a.price);
    }

    return temp;
  }, [tickets, searchFrom, searchTo, filterTransport, sortPrice]);

  // ================= PAGINATION CALCULATION =================
  const indexOfLastTicket = currentPage * ticketsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
  const currentTickets = filteredTickets.slice(indexOfFirstTicket, indexOfLastTicket);
  const totalPages = Math.ceil(filteredTickets.length / ticketsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ================= LOADING CHECK  =================
  if (isLoading) return <Spinner />;

  // ================= MAIN RETURN =================
  return (
    <div className="px-6 py-12 dark:bg-gray-900 dark:text-white min-h-screen">
      
      {/* SECTION TITLE */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold dark:text-white">All Approved Tickets</h1>
        <p className="dark:text-gray-300 mt-2">Find your desired destination easily</p>
        <div className="w-20 h-1 bg-red-500 mx-auto mt-4 rounded"></div>
      </div>

      <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-8 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-sm">
        
        {/* Search Inputs */}
        <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
          <input
            type="text"
            placeholder="Search From..."
            value={searchFrom}
            onChange={(e) => { setSearchFrom(e.target.value); setCurrentPage(1); }}
            className="input input-bordered w-full sm:w-48"
          />
          <input
            type="text"
            placeholder="Search To..."
            value={searchTo}
            onChange={(e) => { setSearchTo(e.target.value); setCurrentPage(1); }}
            className="input input-bordered w-full sm:w-48"
          />
        </div>

        {/* Filters & Sort */}
        <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
          <select
            value={filterTransport}
            onChange={(e) => { setFilterTransport(e.target.value); setCurrentPage(1); }}
            className="select select-bordered w-full sm:w-auto"
          >
            <option value="all">All Transport</option>
            <option value="bus">Bus</option>
            <option value="train">Train</option>
            <option value="plane">Air</option>
            <option value="ship">Ship</option>
          </select>

          <select
            value={sortPrice}
            onChange={(e) => setSortPrice(e.target.value)}
            className="select select-bordered w-full sm:w-auto"
          >
            <option value="none">Sort by Price</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* TICKET GRID */}
      {currentTickets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentTickets.map((ticket) => {
            const departureDate = new Date(ticket.departure);
            const formattedDate = departureDate.toLocaleDateString() + ' ' + departureDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            return (
              <div
                key={ticket._id}
                className="border border-gray-200 dark:border-gray-700 p-5 rounded-xl shadow-md dark:bg-gray-800 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                
                {/* Image and Transport Type */}
                <figure className="relative mb-3">
                  <img
                    src={ticket.image}
                    className="w-full h-48 object-cover rounded-lg"
                    alt={ticket.title}
                  />
                  {/* Transport Type */}
                  <div className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase shadow-md">
                    {ticket.transport}
                  </div>
                </figure>

                <div>
                    {/* Ticket Title */}
                    <h2 className="text-xl font-bold dark:text-white truncate" title={ticket.title}>
                        {ticket.title}
                    </h2>
                    
                    {/* From -> To */}
                    <p className="flex items-center justify-between mt-2 text-base font-semibold text-gray-800 dark:text-gray-200">
                        <span className="truncate">{ticket.from}</span>
                        <span className="mx-2 text-red-500">→</span>
                        <span className="truncate">{ticket.to}</span>
                    </p>

                    {/* Departure Date & Time */}
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                        <span className="font-semibold">Departure:</span> 🕒 {formattedDate}
                    </p>

                    {/* Ticket Quantity */}
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                        <span className="font-semibold">Available Seats:</span> {ticket.quantity || 'N/A'}
                    </p>

                    {/* Perks */}
                    {ticket.perks && ticket.perks.length > 0 && (
                        <div className="mt-2">
                            <p className="font-semibold text-sm text-gray-700 dark:text-gray-300 mb-1">Perks:</p>
                            <div className="flex flex-wrap gap-1">
                                {ticket.perks.slice(0, 3).map((perk, index) => ( 
                                    <span
                                        key={index}
                                        className="px-2 py-0.5 bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-200 rounded-full text-xs font-medium"
                                    >
                                        {perk}
                                    </span>
                                ))}
                                {ticket.perks.length > 3 && (
                                    <span className="px-2 py-0.5 text-gray-500 dark:text-gray-400 text-xs">
                                        +{ticket.perks.length - 3} more
                                    </span>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Price and Button */}
                <div className="mt-4 flex justify-between items-center border-t pt-3 dark:border-gray-600">
                  {/* Price */}
                  <p className="text-red-600 dark:text-red-400 font-bold text-2xl">
                    ${ticket.price}
                  </p>
                  
                  {/* See Details Button */}
                  <Link to={`/ticket/${ticket._id}`}>
                    <button className="btn btn-error text-white px-6">
                      See Details
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20">
            <h2 className="text-2xl font-semibold text-gray-500">No tickets found!</h2>
            <button onClick={() => {setSearchFrom(""); setSearchTo(""); setFilterTransport("all")}} className="btn btn-link text-red-500">Reset Filters</button>
        </div>
      )}

      {/* PAGINATION CONTROLS */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-12">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="btn btn-outline btn-sm"
          >
            Prev
          </button>
          
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              onClick={() => handlePageChange(idx + 1)}
              className={`btn btn-sm ${currentPage === idx + 1 ? "btn-error text-white" : "btn-outline"}`}
            >
              {idx + 1}
            </button>
          ))}
          
          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className="btn btn-outline btn-sm"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AllTickets;