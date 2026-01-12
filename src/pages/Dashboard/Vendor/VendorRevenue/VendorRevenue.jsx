import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import UseAuth from "../../../../Hooks/UseAuth";
import Spinner from "../../../../components/common/Spinner/Spinner";
import { FaMoneyBillWave, FaTicketAlt, FaPlusCircle } from "react-icons/fa";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const VendorRevenue = () => {
  const { user } = UseAuth();
  const axiosSecure=useAxiosSecure()

  const { data = {}, isLoading } = useQuery({
    queryKey: ["vendor-overview", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/vendor-overview/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <Spinner />;

  const chartData = [
    { name: "Tickets Added", value: data.totalTicketsAdded || 0 },
    { name: "Tickets Sold", value: data.totalTicketsSold || 0 },
    { name: "Revenue", value: data.totalRevenue || 0 },
  ];

  return (
    <div className="p-4 md:p-6 space-y-8">
      <title>Vendor Revenue Overview</title>
      <h2 className="text-3xl md:text-4xl font-bold text-center">
        📊 Revenue Overview
      </h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* Revenue */}
        <div className="card bg-gradient-to-r from-green-400 to-green-600 text-white shadow-xl flex items-center p-4 md:p-6 gap-4">
          <FaMoneyBillWave size={40} />
          <div>
            <p className="text-sm md:text-base opacity-80">Total Revenue</p>
            <h3 className="text-2xl md:text-3xl font-bold">
              ৳ {data.totalRevenue || 0}
            </h3>
          </div>
        </div>

        {/* Sold */}
        <div className="card bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-xl flex items-center p-4 md:p-6 gap-4">
          <FaTicketAlt size={40} />
          <div>
            <p className="text-sm md:text-base opacity-80">Tickets Sold</p>
            <h3 className="text-2xl md:text-3xl font-bold">
              {data.totalTicketsSold || 0}
            </h3>
          </div>
        </div>

        {/* Added */}
        <div className="card bg-gradient-to-r from-purple-400 to-purple-600 text-white shadow-xl flex items-center p-4 md:p-6 gap-4">
          <FaPlusCircle size={40} />
          <div>
            <p className="text-sm md:text-base opacity-80">Tickets Added</p>
            <h3 className="text-2xl md:text-3xl font-bold">
              {data.totalTicketsAdded || 0}
            </h3>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-base-100 shadow-2xl rounded-xl p-4 md:p-6">
        <h3 className="text-lg md:text-xl font-semibold mb-4 text-center">
          Performance Chart
        </h3>

        <div className="w-full h-64 sm:h-72 md:h-80 lg:h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 20, left: 0, bottom: 10 }}>
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="value" radius={[8, 8, 0, 0]} fill="#4f46e5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default VendorRevenue;
