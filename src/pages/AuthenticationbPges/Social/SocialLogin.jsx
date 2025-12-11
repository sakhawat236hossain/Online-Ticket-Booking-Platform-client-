import { FcGoogle } from "react-icons/fc";
import UseAuth from "../../../Hooks/UseAuth";

import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router";
import axiosPublic from "../../../Hooks/useAxios";

const SocialLogin = () => {
  const { googleLogin } = UseAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        toast.success("Logged in successfully!");
        console.log(result);
        navigate(location?.state || "/");

        // save user to database
        const user = result.user;
        const userInfo = {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL || "",
        };

        axiosPublic.post("/users", userInfo)
          .then((data) => {
            console.log("User saved to database", data.data);
          })
          .catch((error) => {
            console.error("Error saving user to database", error);
          });

      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div>
      {/* Google Login */}
      <button
        onClick={handleGoogleLogin}
        type="button"
        className="w-full flex items-center justify-center gap-2 px-3 py-2
                   bg-[#E56F61] text-white rounded-md border border-[#E56F61]
                   hover:bg-white hover:text-[#E56F61] transition-colors duration-200 cursor-pointer"
      >
        <FcGoogle className="w-5 h-5" /> Login with Google
      </button>
    </div>
  );
};

export default SocialLogin;
