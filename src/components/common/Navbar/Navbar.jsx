import { Link, NavLink } from "react-router-dom";
import { IoLogIn } from "react-icons/io5";
import { FaBus, FaUser, FaHome, FaTicketAlt, FaInfoCircle, FaPhoneAlt, FaTachometerAlt } from "react-icons/fa";
import profile from "../../../assets/profile.png";
import { BiSolidLogOut } from "react-icons/bi";
import UseAuth from "../../../Hooks/UseAuth";
import toast from "react-hot-toast";

const NavBar = () => {
  const { user, logOutUser } = UseAuth();
const links = (
  <>
    {/* Home */}
    <li>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `flex items-center gap-2 px-3 py-2 rounded-md font-medium text-sm transition-all duration-200
          ${
            isActive
              ? "bg-[#E56F61] text-white shadow-sm"
              : "text-gray-700 hover:bg-gray-100 hover:text-[#E56F61]"
          }`
        }
      >
        <FaHome className="text-lg" />
        Home
      </NavLink>
    </li>

    {/* All Tickets */}
    <li>
      <NavLink
        to="/allTickets"
        className={({ isActive }) =>
          `flex items-center gap-2 px-3 py-2 rounded-md font-medium text-sm transition-all duration-200
          ${
            isActive
              ? "bg-[#E56F61] text-white shadow-sm"
              : "text-gray-700 hover:bg-gray-100 hover:text-[#E56F61]"
          }`
        }
      >
        <FaTicketAlt className="text-lg" />
        All Tickets
      </NavLink>
    </li>

    {/* About */}
    <li>
      <NavLink
        to="/aboutUs"
        className={({ isActive }) =>
          `flex items-center gap-2 px-3 py-2 rounded-md font-medium text-sm transition-all duration-200
          ${
            isActive
              ? "bg-[#E56F61] text-white shadow-sm"
              : "text-gray-700 hover:bg-gray-100 hover:text-[#E56F61]"
          }`
        }
      >
        <FaInfoCircle className="text-lg" />
        About
      </NavLink>
    </li>

    {/* Contact */}
    <li>
      <NavLink
        to="/ContactUs"
        className={({ isActive }) =>
          `flex items-center gap-2 px-3 py-2 rounded-md font-medium text-sm transition-all duration-200
          ${
            isActive
              ? "bg-[#E56F61] text-white shadow-sm"
              : "text-gray-700 hover:bg-gray-100 hover:text-[#E56F61]"
          }`
        }
      >
        <FaPhoneAlt className="text-lg" />
        Contact Us
      </NavLink>
    </li>

    {/* Dashboard */}
    <li>
      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          `flex items-center gap-2 px-3 py-2 rounded-md font-medium text-sm transition-all duration-200
          ${
            isActive
              ? "bg-[#E56F61] text-white shadow-sm"
              : "text-gray-700 hover:bg-gray-100 hover:text-[#E56F61]"
          }`
        }
      >
        <FaTachometerAlt className="text-lg" />
        Dashboard
      </NavLink>
    </li>
  </>
);




  // logOutUser
    const handleLogOut = async () => {
    try {
      await logOutUser();
      toast.success("Logout successful!");
    } catch (error) {
      console.log(error);
      toast.error("Logout failed!");
    }
  };

  return (
    <nav className="navbar sticky top-0 py-3 px-5 z-50 shadow-sm glass-card flex items-center justify-between bg-white">
      {/* LEFT */}
      <div className="flex items-center gap-4">
        {/* MOBILE MENU */}
        <div className="dropdown md:hidden">
          <div
            tabIndex={0}
            role="button"
            className="p-2 rounded-md hover:bg-gray-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
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

          <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow">
            {links}
          </ul>
        </div>

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2 cursor-pointer">
          <div className="flex items-center bg-red-600 text-white px-3 py-1 rounded-md gap-1">
            <span className="text-lg font-extrabold uppercase">tb</span>
            <span className="mx-0.5">:</span>
            <span className="text-lg font-semibold">tickets</span>
            <FaBus className="text-white w-5 h-5" />
          </div>
        </Link>
      </div>

      {/* DESKTOP MENU */}
      <div className="hidden md:flex">
        <ul className="flex gap-6">{links}</ul>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3">
        {/* PROFILE DROPDOWN + HOVER USERNAME TOOLTIP */}
        <div className="dropdown dropdown-end relative group cursor-pointer">
          {/* PROFILE IMAGE */}
          <div
            tabIndex={0}
            role="button"
            className="w-9 h-9 rounded-full border-2 border-gray-300 overflow-hidden cursor-pointer"
          >
            <img
              src={user?.photoURL ? user.photoURL : profile}
              alt="User"
              className="w-full h-full object-cover"
            />
          </div>

          {/* USERNAME TOOLTIP */}
          <div
            className="
              absolute right-12 top-1/2 -translate-y-1/2
              bg-gray-900 text-white text-xs font-medium
              px-2 py-1 rounded-md shadow-md whitespace-nowrap
              opacity-0 group-hover:opacity-100
              pointer-events-none
              transition-all duration-200
            "
          >
            {user?.displayName || "Guest User"}
          </div>

          {/* DROPDOWN MENU */}
          <ul className="dropdown-content absolute right-0 mt-3 w-52 p-2 bg-white rounded-md shadow-lg">
            <div className="pb-3 border-b border-gray-200">
              <li className="text-sm font-bold">{user?.displayName}</li>
              <li className="text-xs text-gray-500">{user?.email}</li>
            </div>

            {/* MOBILE → LOGIN + REGISTER */}

            {!user&&   <div className="md:hidden mt-2 flex flex-col gap-2">
              <Link
                to="/login"
                className="w-full cursor-pointer px-3 py-1 text-sm rounded-md bg-[#E56F61] text-white border border-[#E56F61] hover:bg-white hover:text-[#E56F61] flex items-center justify-center gap-1"
              >
                <IoLogIn /> Login
              </Link>

              <Link
                to="/register"
                className="w-full cursor-pointer px-3 py-1 text-sm rounded-md bg-[#E56F61] text-white border border-[#E56F61] hover:bg-white hover:text-[#E56F61] flex items-center justify-center gap-1"
              >
                <FaUser /> Register
              </Link>
            </div>}
           

            <li className="mt-2">
              <button 
              onClick={handleLogOut}
              className="w-full cursor-pointer px-3 py-1 text-sm rounded-md bg-[#E56F61] text-white border border-[#E56F61] hover:bg-white hover:text-[#E56F61] flex items-center justify-center gap-1">
                <BiSolidLogOut /> Logout
              </button>
            </li>
          </ul>
        </div>

        {/* DESKTOP ONLY LOGIN/REGISTER */}
        {!user&&     <div className="hidden md:flex items-center gap-2">
          <Link
            to="/login"
            className="px-3 py-1 cursor-pointer text-sm rounded-md bg-[#E56F61] text-white border border-[#E56F61] hover:bg-white hover:text-[#E56F61] flex items-center justify-center gap-1"
          >
            <IoLogIn /> Login
          </Link>

          <Link
            to="/register"
            className="px-3 cursor-pointer py-1 text-sm rounded-md bg-[#E56F61] text-white border border-[#E56F61] hover:bg-white hover:text-[#E56F61] flex items-center justify-center gap-1"
          >
            <FaUser /> Register
          </Link>
        </div>}
    
      </div>
    </nav>
  );
};

export default NavBar;
