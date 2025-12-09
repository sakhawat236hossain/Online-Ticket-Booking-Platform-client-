import React from "react";
import { FiMenu, FiHome, FiSettings, FiUser } from "react-icons/fi";
import { MdAdd } from "react-icons/md";
import { Outlet } from "react-router";
import { NavLink } from "react-router-dom";

const DashboardLayout = () => {
  const activeClass = "bg-base-300 font-semibold rounded-md";

  return (
    <div className="flex min-h-screen">
      {/* SIDEBAR */}
      <div
        className="
          group
          bg-base-200
          h-screen
          transition-all duration-300
          w-16 hover:w-50
          flex flex-col justify-between
          shadow-md
        "
      >
        {/* TOP MENU */}
        <ul className="menu p-2 grow overflow-y-auto">
          {/* home */}
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-300 ${
                  isActive ? activeClass : ""
                }`
              }
            >
              <FiHome className="w-5 h-5" />
              <span className="hidden group-hover:inline">Homepage</span>
            </NavLink>
          </li>
          {/* Add Tickets */}
          <li className="mt-2">
            <NavLink
              to="/dashboard/addTicket"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-300 ${
                  isActive ? activeClass : ""
                }`
              }
            >
              <MdAdd className="w-5 h-5" />
              <span className="hidden group-hover:inline">Add Ticket</span>
            </NavLink>
          </li>
        </ul>

        {/* BOTTOM MENU */}
        <ul className="menu p-2 border-t border-base-300">
          <li>
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-300 ${
                  isActive ? activeClass : ""
                }`
              }
            >
              <FiSettings className="w-5 h-5" />
              <span className="hidden group-hover:inline">Settings</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-300 ${
                  isActive ? activeClass : ""
                }`
              }
            >
              <FiUser className="w-5 h-5" />
              <span className="hidden group-hover:inline">Profile</span>
            </NavLink>
          </li>
        </ul>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col">
        {/* NAVBAR */}
        <nav className="navbar w-full bg-base-300 px-4 shadow-sm">
          <button className="btn btn-ghost btn-square">
           
          </button>
          <div className="ml-4 text-lg font-semibold">Dashboard</div>
        </nav>

        <div className="p-6 bg-base-100 flex-grow rounded-md shadow-sm">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
