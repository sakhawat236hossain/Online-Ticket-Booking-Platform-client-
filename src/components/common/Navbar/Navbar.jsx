import { Link, NavLink } from "react-router-dom";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import profile from "../../../assets/profile.png";
import ticketLogo from "../../../assets/ticketLogo.png";

const NavBar = () => {
const links = (
  <>
    <li>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `px-3 py-1 rounded-md font-medium text-sm ${
            isActive ? "bg-[#E56F61] text-white" : "text-gray-700 hover:bg-gray-100"
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
            isActive ? "bg-[#E56F61] text-white" : "text-gray-700 hover:bg-gray-100"
          }`
        }
      >
        All Tickets
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          `px-3 py-1 rounded-md font-medium text-sm ${
            isActive ? "bg-[#E56F61] text-white" : "text-gray-700 hover:bg-gray-100"
          }`
        }
      >
        Dashboard
      </NavLink>
    </li>
  </>
);



  return (
    <nav className="navbar py-3 px-5 z-10 shadow-sm  glass-card flex items-center justify-between">
      {/* LEFT */}
      <div className="flex items-center gap-4">
        {/* Mobile menu */}
        <div className="dropdown md:hidden">
          <div tabIndex={0} role="button" className="p-2 rounded-md hover:bg-gray-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow">
            {links}
          </ul>
        </div>

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex items-center bg-red-600 text-white px-3 py-1 rounded-md">
            <span className="text-lg font-extrabold uppercase">tb</span>
            <span className="mx-1">:</span>
            <span className="text-lg font-semibold">tickets</span>
          </div>

        </Link>
      </div>

      {/* DESKTOP MENU */}
      <div className="hidden md:flex">
        <ul className="flex gap-6">{links}</ul>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-2">
        {/* Profile Dropdown */}
        <div className="dropdown dropdown-end relative">
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

          <ul className="absolute right-0 mt-3 w-52 p-2 bg-white rounded-md shadow-lg hidden dropdown-content">
            <div className="pb-3 border-b border-gray-200">
              <li className="text-sm font-bold">User Name</li>
              <li className="text-xs text-gray-500">user@mail.com</li>
            </div>

            <li className="mt-2">
              <button className="w-full px-3 py-1 text-sm rounded-md bg-[#E56F61] text-white border border-[#E56F61] hover:bg-white hover:text-[#E56F61] flex items-center justify-center gap-1">
                <IoLogOut /> Logout
              </button>
            </li>
          </ul>
        </div>

        {/* LOGIN BUTTON */}
        <Link
          to="/login"
          className="px-3 py-1 text-sm rounded-md bg-[#E56F61] text-white border border-[#E56F61] hover:bg-white hover:text-[#E56F61] flex items-center gap-1"
        >
          <IoLogIn /> Login
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
