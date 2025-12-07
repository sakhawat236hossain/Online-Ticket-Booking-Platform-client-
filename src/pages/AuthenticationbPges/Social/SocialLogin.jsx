import React from 'react';
import { FcGoogle } from 'react-icons/fc';

const SocialLogin = () => {
  return (
    <div>
      {/* Google Login */}
      <button
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
