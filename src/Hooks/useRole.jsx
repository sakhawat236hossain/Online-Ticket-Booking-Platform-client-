import { useQuery } from "@tanstack/react-query";
import UseAuth from "./UseAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const { user, loading } = UseAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: role,
    isLoading,

  } = useQuery({
    queryKey: ["role", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/role/${user?.email}`);
      return res.data.role;
    },
  });

  return { role, isLoading };
};

export default useRole;
