import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { FaBolt, FaMapMarkerAlt, FaChevronRight, FaStar } from "react-icons/fa";
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
  if (tickets.length === 0) return null;

  return (
    <section className="py-24 bg-gradient-to-b from-base-200/50 to-base-100">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Title Section */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-4">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-[#E56F61] font-bold uppercase tracking-widest text-sm mb-3">
              <FaBolt className="animate-pulse" /> Trending Now
            </div>
            <h2 className="text-4xl md:text-5xl font-black italic">
              TOP <span className="text-[#E56F61]">FEATURED</span> JOURNEYS
            </h2>
          </div>
          <div className="h-1 flex-1 mx-10 bg-base-300 hidden lg:block rounded-full overflow-hidden">
             <div className="h-full bg-[#E56F61] w-24 animate-slide"></div>
          </div>
          <Link 
  to="/allTickets" 
  className="relative inline-flex items-center justify-center px-8 py-3.5 overflow-hidden font-bold text-white transition-all duration-300 bg-gradient-to-r from-[#E56F61] to-[#FF9A8B] rounded-full group hover:scale-105 active:scale-95 shadow-lg shadow-[#E56F61]/30"
>
  <span className="absolute inset-0 w-full h-full -mt-1 transition-all duration-500 ease-out w-full bg-gradient-to-br from-white/20 to-transparent group-hover:bg-none"></span>
  <span className="relative flex items-center gap-2">
    Explore All Offers 
    <FaChevronRight className="text-xs group-hover:translate-x-1 transition-transform" />
  </span>
</Link>
        </div>

        {/* Dynamic Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {tickets.slice(0, 4).map((ticket, idx) => (
            <div 
              key={ticket._id}
              className="group flex flex-col md:flex-row bg-base-100 rounded-[2rem] overflow-hidden border border-base-300 hover:border-[#E56F61]/50 shadow-xl transition-all duration-500"
            >
              {/* Image Area */}
              <div className="md:w-2/5 relative overflow-hidden">
                <img 
                  src={ticket.image} 
                  alt={ticket.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-[#E56F61] text-white text-[10px] font-bold px-3 py-1 rounded-lg shadow-lg uppercase">
                    {ticket.transport}
                  </span>
                </div>
              </div>

              {/* Content Area */}
              <div className="md:w-3/5 p-8 flex flex-col justify-between relative">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-black group-hover:text-[#E56F61] transition-colors line-clamp-1">
                      {ticket.title}
                    </h3>
                    <div className="flex items-center text-yellow-500 text-xs">
                       <FaStar /> <span className="ml-1 font-bold text-base-content">4.9</span>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-4">
                      <div className="text-[#E56F61] bg-[#E56F61]/10 p-2 rounded-full">
                        <FaMapMarkerAlt />
                      </div>
                      <div className="text-sm">
                        <p className="text-base-content/50 font-medium leading-none">Route</p>
                        <p className="font-bold">{ticket.from} <span className="text-[#E56F61]">to</span> {ticket.to}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-base-200">
                  <div>
                    <p className="text-xs font-bold text-base-content/40 uppercase">Price per seat</p>
                    <p className="text-2xl font-black text-[#E56F61]">${ticket.price}</p>
                  </div>
                  <Link 
                    to={`/ticket/${ticket._id}`}
                    className="h-12 w-12 rounded-2xl bg-base-200 flex items-center justify-center text-xl group-hover:bg-[#E56F61] group-hover:text-white transition-all duration-300"
                  >
                    <FaChevronRight />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx="true">{`
        @keyframes slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(500%); }
        }
        .animate-slide {
          animation: slide 3s infinite linear;
        }
      `}</style>
    </section>
  );
};

export default Advertisement;