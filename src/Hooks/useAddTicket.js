import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useAddTicket = () => {
  return useMutation({
    mutationFn: async (ticketInfo) => {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/tickets`,
        ticketInfo
      );
      return res.data;
    },
  });
};
