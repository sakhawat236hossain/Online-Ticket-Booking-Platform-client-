import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { 
  FiUsers, 
  FiDollarSign, 
  FiMessageSquare, 
  FiActivity, 
  FiTag, 
  FiShoppingBag,
  FiTrendingUp
} from "react-icons/fi";

const AdminOverview = () => {
  const axiosSecure = useAxiosSecure();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure.get("/admin-overview")
      .then(res => {
        setStats(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [axiosSecure]);

  if (loading) return (
    <div className="flex justify-center items-center min-h-[400px]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#E56F61]"></div>
    </div>
  );

  const statCards = [
    { id: 1, title: "Total Users", value: stats?.totalUsers || 0, icon: <FiUsers />, color: "from-blue-500 to-blue-600", shadow: "shadow-blue-200" },
    { id: 2, title: "Total Revenue", value: `$${(stats?.totalRevenue || 0).toFixed(2)}`, icon: <FiDollarSign />, color: "from-emerald-500 to-teal-600", shadow: "shadow-emerald-200" },
    { id: 3, title: "Total Tickets", value: stats?.totalTickets || 0, icon: <FiTag />, color: "from-orange-400 to-red-500", shadow: "shadow-orange-200" },
    { id: 4, title: "Total Bookings", value: stats?.totalBookings || 0, icon: <FiShoppingBag />, color: "from-purple-500 to-indigo-600", shadow: "shadow-purple-200" },
    { id: 5, title: "User Feedback", value: stats?.totalFeedback || 0, icon: <FiMessageSquare />, color: "from-pink-500 to-rose-600", shadow: "shadow-pink-200" },
    { id: 6, title: "Pending Tickets", value: stats?.pendingTickets || 0, icon: <FiActivity />, color: "from-amber-400 to-yellow-600", shadow: "shadow-amber-200" },
  ];

  return (
    <div className="p-8  min-h-screen">
      <title>Admin Dashboard Overview</title>
      {/* --- Header Section --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4">
        <div>
          <h2 className="text-4xl font-black tracking-tight">
            Dashboard <span className="text-[#E56F61]">Overview</span>
          </h2>
          <p className="mt-2 font-medium flex items-center gap-2">
            <FiTrendingUp className="text-green-500" /> Welcome back! Here's what's happening today.
          </p>
        </div>
        <div className=" px-6 py-3 rounded-2xl shadow-sm border border-gray-100 hidden sm:block">
          <span className="text-xs font-bold uppercase tracking-widest block">Last Updated</span>
          <span className="text-sm font-bold ">{new Date().toLocaleDateString()}</span>
        </div>
      </div>

      {/* --- Stats Grid --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {statCards.map((card) => (
          <div 
            key={card.id} 
            className="group relative rounded-[2.5rem] p-8 shadow-xl shadow-gray-200/50 border border-white hover:border-gray-100 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
          >
            {/* Background Decorative Circle */}
            <div className={`absolute -right-10 -top-10 w-32 h-32 bg-gradient-to-br ${card.color} opacity-[0.03] rounded-full group-hover:scale-150 transition-transform duration-700`}></div>

            <div className="flex items-start justify-between relative z-10">
              <div>
                <p className="text-sm font-black uppercase tracking-tighter mb-1">{card.title}</p>
                <h3 className="text-3xl font-black tracking-tight">{card.value}</h3>
              </div>
              <div className={`bg-gradient-to-br ${card.color} p-4 rounded-2xl  text-2xl shadow-lg ${card.shadow} transform group-hover:rotate-12 transition-transform duration-300`}>
                {card.icon}
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2 relative z-10">
               <div className="h-1.5 w-12 rounded-full overflow-hidden">
                  <div className={`h-full bg-gradient-to-r ${card.color} w-2/3`}></div>
               </div>
               <span className="text-[10px] font-bold uppercase">Live Update</span>
            </div>
          </div>
        ))}
      </div>

      {/* --- Footer Note --- */}
      <div className="mt-12 text-center">
        <p className="text-xs font-bold  uppercase tracking-[0.2em]">Online Ticket Booking Platform System v2.0</p>
      </div>
    </div>
  );
};

export default AdminOverview;