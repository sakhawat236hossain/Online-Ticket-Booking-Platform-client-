import { Link, NavLink } from "react-router-dom";
import { IoLogIn } from "react-icons/io5";
import {
  FaBus,
  FaUser,
  FaHome,
  FaTicketAlt,
  FaInfoCircle,
  FaPhoneAlt,
  FaTachometerAlt,
} from "react-icons/fa";
import profile from "../../../assets/profile.png";
import { BiSolidLogOut } from "react-icons/bi";
import UseAuth from "../../../Hooks/UseAuth";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

const NavBar = () => {
  const { user, logOutUser } = UseAuth();


const [theme, setTheme] = useState(localStorage.getItem('theme') || "light")

  useEffect(() => {
    const html = document.querySelector('html')
     html.setAttribute("data-theme", theme)
     localStorage.setItem("theme", theme)
  }, [theme])


  const handleTheme = (checked) => {
    setTheme(checked ? "dark": "light")
  }

  // Helper function to define link classes
  const getActiveClass = (isActive) =>
    `flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300
    ${
      isActive
        ? "bg-[#E56F61] text-white shadow-lg shadow-[#E56F61]/40" // Enhanced active style
        : "text-gray-600 hover:bg-gray-50 hover:text-[#E56F61]"
    }`;

  const links = (
    <>
      {/* Public Links */}
      <li>
        <NavLink to="/" className={({ isActive }) => getActiveClass(isActive)}>
          <FaHome className="text-xl" /> Home
        </NavLink>
      </li>

      {/* Private Links */}
      {user && (
        <>
          <li>
            <NavLink
              to="/allTickets"
              className={({ isActive }) => getActiveClass(isActive)}
            >
              <FaTicketAlt className="text-xl" /> All Tickets
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) => getActiveClass(isActive)}
            >
              <FaTachometerAlt className="text-xl" /> Dashboard
            </NavLink>
          </li>
        </>
      )}

      {/* Public Links Continued */}
      <li>
        <NavLink
          to="/aboutUs"
          className={({ isActive }) => getActiveClass(isActive)}
        >
          <FaInfoCircle className="text-xl" /> About Us
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/ContactUs"
          className={({ isActive }) => getActiveClass(isActive)}
        >
          <FaPhoneAlt className="text-xl" /> Contact Us
        </NavLink>
      </li>
    </>
  );

  const handleLogOut = async () => {
    try {
      await logOutUser();
      toast.success("Logout successful!");
    } catch (error) {
      console.log(error);
      toast.error("Logout failed!");
    }
  };

  // Reusable button styles for the red theme
  const redButtonStyle = `w-full px-4 py-2 text-sm rounded-lg font-medium 
    bg-[#E56F61] text-white border border-[#E56F61] 
    transition-all duration-300 ease-in-out
    hover:bg-white hover:text-[#E56F61] 
    flex items-center justify-center gap-2`;

  return (
    <nav className="w-full sticky top-0 z-50 border-r-gray-400  dark:text-white  shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        
        {/* LEFT Section: Logo and Mobile Menu */}
        <div className="flex items-center gap-6">
          
          {/* MOBILE MENU (Dropdown) */}
          <div className="dropdown md:hidden">
            <div
              tabIndex={0}
              role="button"
              className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              {/* Hamburger Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </div>
            
            {/* Mobile Links Container */}
            <ul className="menu menu-lg dropdown-content  rounded-xl mt-3 w-60 p-4 shadow-xl border border-gray-100 space-y-1">
              {links}
            </ul>
          </div>

          {/* LOGO */}
          <Link to="/" className="flex items-center gap-1 cursor-pointer group">
            <div className="flex items-center bg-[#E56F61] text-white px-3 py-2 rounded-xl shadow-lg shadow-[#E56F61]/30 transition-all duration-300 group-hover:shadow-md">
              <span className="text-xl font-extrabold uppercase tracking-widest">
                TB
              </span>
              <span className="text-lg mx-1 font-light">:</span>
              <span className="text-xl font-bold tracking-wide">Tickets</span>
              <FaBus className="text-white w-5 h-5 ml-1 transform group-hover:rotate-12 transition-transform" />
            </div>
          </Link>
        </div>

        {/* CENTER Section: DESKTOP MENU */}
        <div className="hidden md:flex">
          <ul className="flex items-center gap-2">{links}</ul>
        </div>

        {/* RIGHT Section: Auth & Profile */}
        <div className="flex items-center gap-3">
          {/* Profile Dropdown */}
          {user ? (
            <div className="dropdown dropdown-end">
              {/* Profile Image with Active Indicator */}
              <div className="relative group cursor-pointer" tabIndex={0} role="button">
                <div
                  className="w-11 h-11 rounded-full border-2 border-[#E56F61] p-0.5 overflow-hidden shadow-lg
                             group-hover:ring-4 group-hover:ring-[#E56F61]/20 transition-all duration-300"
                >
                  <img
                    src={user?.photoURL ? user.photoURL : profile}
                    alt="User"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>

                {/* Active Green Dot */}
                <span
                  className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full
                             border-2 border-white shadow-md transform translate-x-0.5 translate-y-0.5"
                ></span>
                 {/* Tooltip  */}
                  <div
                className="absolute right-12 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs font-medium 
                           px-2 py-1 rounded-md shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100
                           pointer-events-none transition-all duration-300"
              >
                {user?.displayName || "User"}
              </div>
              </div>
              
             
            

              {/* DROPDOWN Content */}
              <ul className="dropdown-content menu bg-white rounded-xl mt-3 w-64 p-4 shadow-2xl border border-gray-100 space-y-3">
                
                {/* User Info Header */}
                <div className="pb-3 border-b border-gray-100 mb-2">
                  <p className="text-lg font-bold text-gray-800">
                    {user?.displayName || "Guest User"}
                  </p>
                  <p className="text-sm text-gray-500 truncate">{user?.email}</p>
                </div>

                {/* Profile Link */}
                <li>
                  <Link to="/profile" className={redButtonStyle}>
                    <FaUser className="text-lg" /> My Profile
                  </Link>
                </li>

                {/* Logout Button */}
                <li>
                  <button onClick={handleLogOut} className={redButtonStyle}>
                    <BiSolidLogOut className="text-lg" /> Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            /* DESKTOP LOGIN/REGISTER */
            <div className="hidden md:flex items-center gap-3">
              <Link to="/login" className={redButtonStyle}>
                <IoLogIn className="text-lg" /> Login
              </Link>

              <Link to="/register" className={redButtonStyle}>
                <FaUser className="text-lg" /> Register
              </Link>
            </div>
          )}
          
          {/* THEME CONTROLLER  */}
          <label className="swap swap-rotate ml-2">
            <input type="checkbox"
             onChange={(e)=> handleTheme(e.target.checked)}
                defaultChecked={localStorage.getItem('theme') === "dark"}
            className="theme-controller" value="synthwave" />
            <svg
              className="swap-off h-8 w-8 fill-current text-gray-600 hover:text-yellow-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24">
              <path
                d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>
            <svg
              className="swap-on h-8 w-8 fill-current text-gray-600 hover:text-indigo-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24">
              <path
                d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;