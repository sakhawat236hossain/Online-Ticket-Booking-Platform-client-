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
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = (checked) => {
    setTheme(checked ? "dark" : "light");
  };

  const handleLogOut = async () => {
    try {
      await logOutUser();
      toast.success("Logout successful!");
    } catch (error) {
      toast.error("Logout failed!");
    }
  };

  const getActiveClass = (isActive) =>
    `flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300
    ${
      isActive
        ? "bg-[#E56F61] text-white shadow-md"
        : "text-base-content hover:bg-base-200 hover:text-[#E56F61]"
    }`;

  const redButtonStyle = `w-full px-4 py-2 text-sm rounded-lg font-medium 
    bg-[#E56F61] text-white border border-[#E56F61] 
    transition-all duration-300 ease-in-out
    hover:bg-transparent hover:text-[#E56F61] 
    flex items-center justify-center gap-2`;

  const links = (
    <>
      <li>
        <NavLink to="/" className={({ isActive }) => getActiveClass(isActive)}>
          <FaHome /> Home
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink
              to="/allTickets"
              className={({ isActive }) => getActiveClass(isActive)}
            >
              <FaTicketAlt /> All Tickets
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) => getActiveClass(isActive)}
            >
              <FaTachometerAlt /> Dashboard
            </NavLink>
          </li>
        </>
      )}
      <li>
        <NavLink
          to="/aboutUs"
          className={({ isActive }) => getActiveClass(isActive)}
        >
          <FaInfoCircle /> About Us
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/ContactUs"
          className={({ isActive }) => getActiveClass(isActive)}
        >
          <FaPhoneAlt /> Contact Us
        </NavLink>
      </li>
    </>
  );

  return (
    // bg-base-100 এবং text-base-content
    <nav className="w-full sticky top-0 z-50 bg-base-100/80 backdrop-blur-md text-base-content border-b border-base-300 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* LEFT: Logo & Mobile Menu */}
        <div className="flex items-center gap-4">
          <div className="dropdown lg:hidden">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
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
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52 border border-base-300"
            >
              {links}
            </ul>
          </div>

          <Link to="/" className="flex items-center group">
            <div className="flex items-center bg-[#E56F61] text-white px-3 py-1.5 rounded-xl shadow-lg transition-transform group-hover:scale-105">
              <span className="text-xl font-black uppercase">TB</span>
              <span className="text-xl font-bold ml-1">Tickets</span>
              <FaBus className="ml-1 text-white" />
            </div>
          </Link>
        </div>

        {/* CENTER: Desktop Menu */}
        <div className="hidden lg:flex">
          <ul className="flex items-center gap-1">{links}</ul>
        </div>

        {/* RIGHT: Theme & Profile */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <label className="swap swap-rotate btn btn-ghost btn-circle btn-sm">
            <input
              type="checkbox"
              onChange={(e) => handleTheme(e.target.checked)}
              checked={theme === "dark"}
            />
            <svg
              className="swap-off fill-current w-6 h-6 text-orange-500"
              viewBox="0 0 24 24"
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>
            <svg
              className="swap-on fill-current w-6 h-6 text-blue-400"
              viewBox="0 0 24 24"
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>

          {user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full ring ring-[#E56F61] ring-offset-base-100 ring-offset-2">
                  <img src={user?.photoURL || profile} alt="User" />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-3 shadow-xl menu menu-sm dropdown-content bg-base-200 rounded-xl w-64 border border-base-300"
              >
                <div className="px-4 py-3 border-b border-base-300 mb-2">
                  <p className="font-bold text-base">{user?.displayName}</p>
                  <p className="text-xs opacity-70 truncate">{user?.email}</p>
                </div>
                <li>
                  <Link to="/profile" className="py-2">
                    <FaUser /> My Profile
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogOut} className="py-2 text-error">
                    <BiSolidLogOut /> Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link
                to="/login"
                className="btn btn-lg bg-[#E56F61] text-white border-none hover:bg-[#c95a4d] px-8 rounded-2xl shadow-lg hover:shadow-[#E56F61]/20 transition-all duration-300 transform hover:-translate-y-1 active:scale-95 font-bold tracking-wide"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
