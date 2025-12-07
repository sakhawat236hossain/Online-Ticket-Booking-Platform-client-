
import { FcGoogle } from 'react-icons/fc';
import UseAuth from '../../../Hooks/UseAuth';

import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

const SocialLogin = () => {
  const { googleLogin } = UseAuth();
  const navigate = useNavigate();



  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        toast.success("Logged in successfully!");
        console.log(result);
        navigate("/");
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
