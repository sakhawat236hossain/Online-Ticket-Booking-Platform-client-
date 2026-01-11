import React, { useEffect, useState } from "react";
import { FiShoppingBag, FiCreditCard, FiClock, FiStar, FiTrendingUp, FiCheckCircle } from "react-icons/fi";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import UseAuth from "../../../Hooks/UseAuth";

const UserOverview = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/user-overview/${user.email}`)
        .then(res => {
          setStats(res.data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [user, axiosSecure]);

  if (loading) return (
    <div className="flex justify-center items-center min-h-[400px]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#E56F61]"></div>
    </div>
  );

  const userCards = [
    { id: 1, title: "Total Bookings", value: stats?.totalBookings || 0, icon: <FiShoppingBag />, color: "from-blue-500 to-indigo-600", desc: "Your activity" },
    { id: 2, title: "Total Spent", value: `$${(stats?.totalSpent || 0).toFixed(2)}`, icon: <FiCreditCard />, color: "from-emerald-400 to-teal-600", desc: "Total investment" },
    { id: 3, title: "Paid Tickets", value: stats?.paidBookingsCount || 0, icon: <FiCheckCircle />, color: "from-violet-500 to-purple-600", desc: "Confirmed seats" },
    { id: 4, title: "Pending Orders", value: stats?.pendingBookingsCount || 0, icon: <FiClock />, color: "from-amber-400 to-orange-500", desc: "Awaiting approval" },
    { id: 5, title: "My Feedbacks", value: stats?.myFeedbacks || 0, icon: <FiStar />, color: "from-pink-500 to-rose-600", desc: "Shared reviews" },
  ];

  return (
    <div className="p-4 md:p-8 min-h-screen">
      {/* --- Header Section --- */}
      <div className="relative mb-12  p-8 rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-10 pointer-events-none">
            <FiTrendingUp size={120} className="text-[#E56F61]" />
        </div>
        <div className="relative z-10">
          <h2 className="text-3xl md:text-5xl font-black  tracking-tight">
            Hello, <span className="text-[#E56F61]">{user?.displayName?.split(' ')[0]}!</span> 👋
          </h2>
          <p className="mt-3 font-semibold flex items-center gap-2">
            Here you will see a summary of all your bookings and transactions.
          </p>
        </div>
      </div>

      {/* --- Stats Grid --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {userCards.map((card) => (
          <div 
            key={card.id} 
            className="group relative  rounded-[2.5rem] p-8 shadow-xl shadow-gray-200/40 border border-white hover:border-gray-100 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
          >
            {/* Background Accent */}
            <div className={`absolute -right-6 -bottom-6 w-24 h-24 bg-gradient-to-br ${card.color} opacity-[0.03] rounded-full group-hover:scale-150 transition-transform duration-700`}></div>

            <div className="flex items-center justify-between relative z-10">
              <div className={`bg-gradient-to-br ${card.color} p-4 rounded-2xl text-white text-3xl shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                {card.icon}
              </div>
              <div className="text-right">
                <p className="text-xs font-black uppercase tracking-widest mb-1">{card.title}</p>
                <h3 className="text-3xl font-black  tracking-tighter">{card.value}</h3>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between relative z-10 border-t border-gray-50 pt-4">
               <span className="text-[10px] font-black uppercase tracking-widest">{card.desc}</span>
               <div className={`h-2 w-2 rounded-full animate-pulse bg-gradient-to-r ${card.color}`}></div>
            </div>
          </div>
        ))}
      </div>

      {/* --- Footer Info --- */}
      <div className="mt-16 text-center border-t border-gray-200 pt-8">
        <p className="text-[10px] font-black uppercase tracking-[0.4em]">User Management Portal • Secure Access</p>
      </div>
    </div>
  );
};

export default UserOverview;