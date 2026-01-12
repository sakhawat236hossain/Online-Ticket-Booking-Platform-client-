import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Spinner from "../../components/common/Spinner/Spinner"; 
import { FaBus, FaTrain, FaPlane, FaShip, FaTags, FaArrowRight, FaClock } from 'react-icons/fa';
import useAxiosSecure from "../../Hooks/useAxiosSecure";


const AllTickets = () => {
    const axiosSecure=useAxiosSecure()
    // ================= DATA FETCHING (TanStack Query) =================
    const { data: tickets = [], isLoading, isError } = useQuery({
        queryKey: ["approvedTickets"],
        queryFn: async () => {
            const res = await axiosSecure.get("/approved-tickets");
            return res.data;
        },
    
    });

    // ================= STATE MANAGEMENT =================
    const [searchFrom, setSearchFrom] = useState("");
    const [searchTo, setSearchTo] = useState("");
    const [filterTransport, setFilterTransport] = useState("all");
    const [sortPrice, setSortPrice] = useState("none");
    const [currentPage, setCurrentPage] = useState(1);
    const ticketsPerPage = 6;

    // ================= HELPER FUNCTIONS =================

    const getTransportIcon = (transport) => {
        switch (transport?.toLowerCase()) {
            case 'bus':
                return <FaBus className="inline mr-1" />;
            case 'train':
                return <FaTrain className="inline mr-1" />;
            case 'plane':
                return <FaPlane className="inline mr-1" />;
            case 'ship':
                return <FaShip className="inline mr-1" />;
            default:
                return <FaTags className="inline mr-1" />;
        }
    };
    
    // ================= FILTERING & SORTING LOGIC (useMemo) =================
    const filteredTickets = useMemo(() => {
        if (!tickets || isError) return [];

        let temp = [...tickets];

        // 1. Search Filter (From Location)
        if (searchFrom) {
            temp = temp.filter((t) =>
                t.from && t.from.toLowerCase().includes(searchFrom.toLowerCase())
            );
        }

        // 2. Search Filter (To Location)
        if (searchTo) {
            temp = temp.filter((t) =>
                t.to && t.to.toLowerCase().includes(searchTo.toLowerCase())
            );
        }

        // 3. Transport Filter
        if (filterTransport !== "all") {
            temp = temp.filter(
                (t) => t.transport && t.transport.toLowerCase() === filterTransport.toLowerCase()
            );
        }

        // 4. Price Sorting
        if (sortPrice === "low") {
            temp.sort((a, b) => a.price - b.price);
        } else if (sortPrice === "high") {
            temp.sort((a, b) => b.price - a.price);
        }

        return temp;
    }, [tickets, isError, searchFrom, searchTo, filterTransport, sortPrice]);

    // ================= PAGINATION CALCULATION =================
    const indexOfLastTicket = currentPage * ticketsPerPage;
    const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
    const currentTickets = filteredTickets.slice(indexOfFirstTicket, indexOfLastTicket);
    const totalPages = Math.ceil(filteredTickets.length / ticketsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleFilterChange = (setter, value) => {
        setter(value);
        setCurrentPage(1); 
    };

    // ================= CONDITIONAL RENDERING =================
    if (isLoading) return <Spinner />;
    if (isError) return <div className="text-center py-20 text-red-500 text-xl">Error loading tickets. Please try again later.</div>;

    // ================= MAIN RENDER =================
    return (
        <div className="px-4 md:px-6 py-12  dark:text-white min-h-screen max-w-7xl mx-auto">
<title>All Approved Tickets</title>
            {/* SECTION TITLE */}
            <div className="text-center mb-10">
                <h1 className="text-4xl font-extrabold dark:text-white">All Approved Tickets</h1>
                <p className="dark:text-gray-300 mt-2 text-lg">Find your desired destination easily</p>
                <div className="w-20 h-1 bg-red-500 mx-auto mt-4 rounded-full"></div>
            </div>

            {/* SEARCH, FILTER & SORT CONTROLS */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-10 bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">

                {/* Search Inputs */}
                <div className="flex flex-col md:flex-row gap-4 w-full lg:w-auto">
                    <input
                        type="text"
                        placeholder="Search From..."
                        value={searchFrom}
                        onChange={(e) => handleFilterChange(setSearchFrom, e.target.value)}
                        className="input input-bordered w-full md:w-56 dark:bg-gray-700  transition-colors duration-200"
                    />
                    <input
                        type="text"
                        placeholder="Search To..."
                        value={searchTo}
                        onChange={(e) => handleFilterChange(setSearchTo, e.target.value)}
                        className="input input-bordered w-full md:w-56 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors duration-200"
                    />
                </div>

                {/* Filters & Sort */}
                <div className="flex flex-col md:flex-row gap-4 w-full lg:w-auto mt-4 lg:mt-0">
                    <select
                        value={filterTransport}
                        onChange={(e) => handleFilterChange(setFilterTransport, e.target.value)}
                        className="select select-bordered w-full md:w-40 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors duration-200"
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
                        className="select select-bordered w-full md:w-40 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors duration-200"
                    >
                        <option value="none">Sort by Price</option>
                        <option value="low">Price: Low to High</option>
                        <option value="high">Price: High to Low</option>
                    </select>
                </div>
            </div>
            
            {/* TICKET GRID */}
            {currentTickets.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
                    {currentTickets.map((ticket) => {
                        const departureDate = new Date(ticket.departure);
                        const formattedDate = departureDate.toLocaleDateString() + ' ' + departureDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                        return (
                            <div
                                key={ticket._id}
                                className="border border-gray-200  p-5 rounded-2xl shadow-lg dark:bg-gray-800 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between"
                            >

                                {/* Image and Transport Type */}
                                <figure className="relative mb-4">
                                    <img
                                        src={ticket.image}
                                        className="w-full h-52 object-cover rounded-xl"
                                        alt={ticket.title}
                                    />
                                    {/* Transport Type Badge */}
                                    <div className="absolute top-3 right-3 bg-red-600 text-white px-4 py-1.5 rounded-full text-sm font-bold uppercase shadow-xl flex items-center">
                                        {getTransportIcon(ticket.transport)} {ticket.transport}
                                    </div>
                                </figure>

                                <div>
                                    {/* Ticket Title */}
                                    <h2 className="text-2xl font-bold dark:text-white truncate mb-2" title={ticket.title}>
                                        {ticket.title}
                                    </h2>

                                    {/* From -> To */}
                                    <p className="flex items-center justify-between py-2 text-lg font-extrabold  border-b border-t border-gray-100 dark:border-gray-700">
                                        <span className="truncate flex-1 text-left">{ticket.from}</span>
                                        <FaArrowRight className="mx-2 text-red-500 text-xl" />
                                        <span className="truncate flex-1 text-right">{ticket.to}</span>
                                    </p>

                                    {/* Departure Date & Time */}
                                    <p className="text-sm mt-3 flex items-center">
                                        <FaClock className="mr-2 text-red-500" />
                                        <span className="font-semibold">Departure:</span> {formattedDate}
                                    </p>

                                    {/* Ticket Quantity */}
                                    <p className="text-sm mt-1">
                                        <span className="font-semibold">Available Seats:</span> <span className="text-red-500 font-bold">{ticket.quantity || 'N/A'}</span>
                                    </p>

                                    {/* Perks */}
                                    {ticket.perks && ticket.perks.length > 0 && (
                                        <div className="mt-4">
                                            <p className="font-semibold text-sm  dark:text-gray-300 mb-2">Included Perks:</p>
                                            <div className="flex flex-wrap gap-2">
                                                {ticket.perks.slice(0, 3).map((perk, index) => (
                                                    <span
                                                        key={index}
                                                        className="px-3 py-1  dark:bg-blue-800 text-blue-700 dark:text-blue-200 rounded-full text-xs font-medium shadow-sm"
                                                    >
                                                        {perk}
                                                    </span>
                                                ))}
                                                {ticket.perks.length > 3 && (
                                                    <span className="px-3 py-1  dark:text-gray-400 text-xs bg-gray-200 dark:bg-gray-700 rounded-full font-medium">
                                                        +{ticket.perks.length - 3} more
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Price and Button */}
                                <div className="mt-6 flex justify-between items-center border-t pt-4 dark:border-gray-700">
                                    {/* Price */}
                                    <p className="text-red-600 dark:text-red-400 font-extrabold text-3xl">
                                        ${ticket.price}
                                    </p>

                                    {/* See Details Button */}
                                    <Link to={`/ticket/${ticket._id}`}>
                                        <button className="btn btn-error text-white px-8 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-200 shadow-md">
                                            Book Now
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="text-center py-20 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                    <h2 className="text-3xl font-bold  dark:text-gray-300">No tickets found!</h2>
                    <p className=" dark:text-gray-400 mt-2">Try adjusting your search filters.</p>
                    <button 
                        onClick={() => {
                            setSearchFrom(""); 
                            setSearchTo(""); 
                            setFilterTransport("all");
                            setSortPrice("none");
                            setCurrentPage(1);
                        }} 
                        className="btn btn-link text-red-500 mt-4"
                    >
                        Reset All Filters
                    </button>
                </div>
            )}

            {/* PAGINATION CONTROLS */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-12">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                        className="btn btn-outline btn-sm dark:text-white dark:border-gray-600 dark:hover:bg-gray-700"
                    >
                        Previous
                    </button>

                    {[...Array(totalPages)].map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => handlePageChange(idx + 1)}
                            className={`btn btn-sm font-bold ${currentPage === idx + 1 ? "btn-error text-white" : "btn-outline dark:text-white dark:border-gray-600 dark:hover:bg-gray-700"}`}
                        >
                            {idx + 1}
                        </button>
                    ))}

                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => handlePageChange(currentPage + 1)}
                        className="btn btn-outline btn-sm dark:text-white dark:border-gray-600 dark:hover:bg-gray-700"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default AllTickets;