import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white px-4">
      
      {/* Error Code */}
      <h1 className="text-[8rem] font-extrabold text-red-500 mb-4">404</h1>
      
      {/* Message */}
      <h2 className="text-3xl md:text-4xl font-bold mb-2">Page Not Found</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6 text-center max-w-md">
        Oops! The page you are looking for does not exist or has been moved.
      </p>
      
      {/* Back Home Button */}
      <Link
        to="/"
        className="px-6 py-3 bg-red-500 text-white rounded-lg font-semibold shadow-lg hover:bg-red-600 transition-all duration-300"
      >
        Go Back Home
      </Link>
      
      {/* Optional image */}
      <img
        src="https://i.ibb.co/7QpKsCX/404-error.png"
        alt="404 illustration"
        className="mt-10 w-full max-w-md"
      />
    </div>
  );
};

export default Error;
