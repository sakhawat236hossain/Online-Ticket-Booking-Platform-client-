import { Link, NavLink } from "react-router-dom";
import { IoLogIn, IoLogOut, IoPersonAdd } from "react-icons/io5";
import { FaBus } from "react-icons/fa";
import profile from "../../../assets/profile.png";

const NavBar = () => {
  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-3 py-1 rounded-md font-medium text-sm ${
              isActive
                ? "bg-[#E56F61] text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          Home
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/allTickets"
          className={({ isActive }) =>
            `px-3 py-1 rounded-md font-medium text-sm ${
              isActive
                ? "bg-[#E56F61] text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          All Tickets
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/aboutUs"
          className={({ isActive }) =>
            `px-3 py-1 rounded-md font-medium text-sm ${
              isActive
                ? "bg-[#E56F61] text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          About
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/ContactUs"
          className={({ isActive }) =>
            `px-3 py-1 rounded-md font-medium text-sm ${
              isActive
                ? "bg-[#E56F61] text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          Contact Us
        </NavLink>
      </li>

      {/* <li>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `px-3 py-1 rounded-md font-medium text-sm ${
              isActive
                ? "bg-[#E56F61] text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          Dashboard
        </NavLink>
      </li> */}
    </>
  );

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
        <Link to="/" className="flex items-center gap-2">
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
        <div className="dropdown dropdown-end relative group">
          {/* PROFILE IMAGE */}
          <div
            tabIndex={0}
            role="button"
            className="w-9 h-9 rounded-full border-2 border-gray-300 overflow-hidden cursor-pointer"
          >
            <img
              src={profile}
              alt="User"
              className="w-full h-full object-cover"
            />
          </div>

          {/* USERNAME TOOLTIP */}
          <div
            className="
              absolute left-12 top-1/2 -translate-y-1/2
              bg-gray-900 text-white text-xs font-medium
              px-2 py-1 rounded-md shadow-md whitespace-nowrap
              opacity-0 group-hover:opacity-100
              pointer-events-none
              transition-all duration-200
            "
          >
            Sakhawat Hossain
          </div>

          {/* DROPDOWN MENU */}
          <ul className="dropdown-content absolute right-0 mt-3 w-52 p-2 bg-white rounded-md shadow-lg">
            <div className="pb-3 border-b border-gray-200">
              <li className="text-sm font-bold">Sakhawat Hossain</li>
              <li className="text-xs text-gray-500">user@mail.com</li>
            </div>

            {/* MOBILE → LOGIN + REGISTER */}
            <div className="md:hidden mt-2 flex flex-col gap-2">
              <Link
                to="/login"
                className="w-full px-3 py-1 text-sm rounded-md bg-[#E56F61] text-white border border-[#E56F61] hover:bg-white hover:text-[#E56F61] flex items-center justify-center gap-1"
              >
                <IoLogIn /> Login
              </Link>

              <Link
                to="/register"
                className="w-full px-3 py-1 text-sm rounded-md bg-[#E56F61] text-white border border-[#E56F61] hover:bg-white hover:text-[#E56F61] flex items-center justify-center gap-1"
              >
                <IoPersonAdd /> Register
              </Link>
            </div>

            <li className="mt-2">
              <button className="w-full px-3 py-1 text-sm rounded-md bg-[#E56F61] text-white border border-[#E56F61] hover:bg-white hover:text-[#E56F61] flex items-center justify-center gap-1">
                <IoLogOut /> Logout
              </button>
            </li>
          </ul>
        </div>

        {/* DESKTOP ONLY LOGIN/REGISTER */}
        <div className="hidden md:flex items-center gap-2">
          <Link
            to="/login"
            className="px-3 py-1 text-sm rounded-md bg-[#E56F61] text-white border border-[#E56F61] hover:bg-white hover:text-[#E56F61] flex items-center justify-center gap-1"
          >
            <IoLogIn /> Login
          </Link>

          <Link
            to="/register"
            className="px-3 py-1 text-sm rounded-md bg-[#E56F61] text-white border border-[#E56F61] hover:bg-white hover:text-[#E56F61] flex items-center justify-center gap-1"
          >
            <IoLogIn /> Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
