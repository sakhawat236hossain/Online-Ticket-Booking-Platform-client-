import React from "react";
import { useQuery } from "@tanstack/react-query";
import UseAuth from "../../../Hooks/UseAuth";
import Spinner from "../../../components/common/Spinner/Spinner";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";


const TransactionHistory = () => {
  const { user } = UseAuth();
  const axiosSecure=useAxiosSecure()

  const { data: transactions = [], isLoading } = useQuery({
    queryKey: ["transactions", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/transactions?email=${user.email}`
      );
      return res.data;
    },
  });

  if (isLoading) return <Spinner />;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Transaction History
      </h2>

      {transactions.length === 0 ? (
        <p className="text-center">
          No transactions found
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border">
            <thead className="">
              <tr>
                <th>#</th>
                <th>Transaction ID</th>
                <th>Ticket Title</th>
                <th>Amount (💰)</th>
                <th>Payment Date</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((t, index) => (
                <tr key={t._id} className="hover">
                  <td>{index + 1}</td>
                  <td className="text-xs break-all">
                    {t.transactionId}
                  </td>
                  <td>{t.ticketTitle}</td>
                  <td className="font-semibold">${t.amount}</td>
                  <td>
                    {new Date(t.paymentDate).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;
