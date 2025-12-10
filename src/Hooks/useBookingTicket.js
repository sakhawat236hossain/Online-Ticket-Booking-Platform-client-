import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useBookingTicket = () => {
  return useMutation({
    mutationFn: async (bookingInfo) => {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/tickets-booking`,
        bookingInfo
      );
      return res.data;
    },
  });
};
