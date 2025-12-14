import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import axiosPublic from "../../Hooks/useAxios";
import { Link } from "react-router-dom";
import Spinner from "../../components/common/Spinner/Spinner";

const AllTickets = () => {
  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ["approvedTickets"],
    queryFn: async () => {
      const res = await axiosPublic.get("/approved-tickets");
      return res.data;
    },
  });

  // ================= STATE =================
  const [searchFrom, setSearchFrom] = useState("");
  const [searchTo, setSearchTo] = useState("");
  const [filterTransport, setFilterTransport] = useState("all");
  const [sortPrice, setSortPrice] = useState("none"); // "low" | "high"
  const [currentPage, setCurrentPage] = useState(1);
  const ticketsPerPage = 8;

  if (isLoading) return <Spinner />;

  // ================= FILTER + SEARCH + SORT =================
  const filteredTickets = useMemo(() => {
    let temp = [...tickets];

    // Search by From & To (safe & case-insensitive)
    if (searchFrom) {
      temp = temp.filter(
        (t) => t.from && t.from.toLowerCase().includes(searchFrom.toLowerCase())
      );
    }
    if (searchTo) {
      temp = temp.filter(
        (t) => t.to && t.to.toLowerCase().includes(searchTo.toLowerCase())
      );
    }

    // Filter by transport
    if (filterTransport !== "all") {
      temp = temp.filter(
        (t) => t.transport && t.transport.toLowerCase() === filterTransport.toLowerCase()
      );
    }

    // Sort by price
    if (sortPrice === "low") {
      temp.sort((a, b) => a.price - b.price);
    } else if (sortPrice === "high") {
      temp.sort((a, b) => b.price - a.price);
    }

    return temp;
  }, [tickets, searchFrom, searchTo, filterTransport, sortPrice]);

  // ================= PAGINATION =================
  const indexOfLastTicket = currentPage * ticketsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
  const currentTickets = filteredTickets.slice(indexOfFirstTicket, indexOfLastTicket);
  const totalPages = Math.ceil(filteredTickets.length / ticketsPerPage);

  return (
    <div className="px-6 py-12 dark:bg-gray-900 dark:text-white">
      {/* SECTION TITLE */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold dark:text-white">All Approved Tickets</h1>
        <p className="dark:text-gray-300 mt-2">Browse all admin-approved tickets</p>
        <div className="w-20 h-1 bg-red-500 mx-auto mt-4 rounded"></div>
      </div>

      {/* SEARCH + FILTER + SORT */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="From"
            value={searchFrom}
            onChange={(e) => setSearchFrom(e.target.value)}
            className="input input-bordered"
          />
          <input
            type="text"
            placeholder="To"
            value={searchTo}
            onChange={(e) => setSearchTo(e.target.value)}
            className="input input-bordered"
          />
        </div>

        <select
          value={filterTransport}
          onChange={(e) => setFilterTransport(e.target.value)}
          className="select select-bordered"
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
          className="select select-bordered"
        >
          <option value="none">Sort by Price</option>
          <option value="low">Low to High</option>
          <option value="high">High to Low</option>
        </select>
      </div>

      {/* TICKET GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentTickets.map((ticket) => {
          const departureDate = new Date(ticket.departure);
          const formattedDate = `${departureDate.getDate().toString().padStart(
            2,
            "0"
          )}/${(departureDate.getMonth() + 1)
            .toString()
            .padStart(2, "0")}/${departureDate.getFullYear()} ${departureDate
            .getHours()
            .toString()
            .padStart(2, "0")}:${departureDate.getMinutes().toString().padStart(2, "0")}`;

          return (
            <div
              key={ticket._id}
              className="border border-gray-200 dark:border-gray-700 p-5 rounded-xl shadow-lg dark:bg-gray-800 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
            >
              <img
                src={ticket.image}
                className="w-full h-44 object-cover rounded-lg"
                alt={ticket.title}
              />

              <h2 className="text-xl font-bold mt-3 dark:text-white">{ticket.title}</h2>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                {ticket.from} → {ticket.to}
              </p>
              <p className="text-blue-600 dark:text-blue-400 font-semibold mt-1">
                Transport: {ticket.transport}
              </p>
              <p className="text-gray-700 dark:text-gray-200 mt-1 font-medium">
                Departure: {formattedDate}
              </p>
              <div className="mt-3 flex justify-between items-center">
                <p className="text-red-600 dark:text-red-400 font-bold text-lg">
                  ${ticket.price}
                </p>
                <p className="text-gray-700 dark:text-gray-200 font-semibold">
                  Qty: {ticket.quantity}
                </p>
              </div>

              {ticket.perks?.length > 0 && (
                <div className="mt-3">
                  <p className="font-semibold text-gray-800 dark:text-white">Perks:</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {ticket.perks.map((perk) => (
                      <span
                        key={perk}
                        className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded text-xs"
                      >
                        {perk}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <Link to={`/ticket/${ticket._id}`}>
                <button className="btn btn-error w-full mt-4 text-white">See Details</button>
              </Link>
            </div>
          );
        })}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="btn btn-outline"
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx + 1)}
              className={`btn btn-outline ${currentPage === idx + 1 ? "btn-active" : ""}`}
            >
              {idx + 1}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="btn btn-outline"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AllTickets;
