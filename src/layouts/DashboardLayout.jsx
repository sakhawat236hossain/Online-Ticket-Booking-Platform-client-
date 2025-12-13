import React from "react";
import { Outlet } from "react-router";
import { NavLink } from "react-router-dom";

// Icons
import { FiHome, FiSettings, FiUser } from "react-icons/fi";
import { TbBrandBooking } from "react-icons/tb";
import { MdAdd, MdManageAccounts, MdPayments } from "react-icons/md";
import { FaInbox } from "react-icons/fa";
import { LucideTicketsPlane } from "lucide-react";
import { RiAdvertisementLine } from "react-icons/ri";

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
          w-16 hover:w-[12.5rem]
          flex flex-col justify-between
          shadow-md
        "
      >
        {/* TOP MENU */}
        <ul className="menu p-2 grow overflow-y-auto">
          {/* Home */}
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

          {/* Add Ticket */}
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

          {/* My Added Tickets */}
          <li className="mt-2">
            <NavLink
              to="/dashboard/myAddedTickets"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-300 ${
                  isActive ? activeClass : ""
                }`
              }
            >
              <LucideTicketsPlane className="w-5 h-5" />
              <span className="hidden group-hover:inline">My Added Tickets</span>
            </NavLink>
          </li>

          {/* My Booking Tickets */}
          <li className="mt-2">
            <NavLink
              to="/dashboard/myBookingTickets"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-300 ${
                  isActive ? activeClass : ""
                }`
              }
            >
              <TbBrandBooking className="w-5 h-5" />
              <span className="hidden group-hover:inline">My Booking Tickets</span>
            </NavLink>
          </li>

          {/* Requested Tickets */}
          <li className="mt-2">
            <NavLink
              to="/dashboard/requestedBookingsTickets"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-300 ${
                  isActive ? activeClass : ""
                }`
              }
            >
              <FaInbox className="w-5 h-5" />
              <span className="hidden group-hover:inline">Requested Tickets</span>
            </NavLink>
          </li>

          {/* Manage Users */}
          <li className="mt-2">
            <NavLink
              to="/dashboard/manageUsers"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-300 ${
                  isActive ? activeClass : ""
                }`
              }
            >
              <MdManageAccounts className="w-5 h-5" />
              <span className="hidden group-hover:inline">Manage Users</span>
            </NavLink>
          </li>

          {/* Manage Tickets */}
          <li className="mt-2">
            <NavLink
              to="/dashboard/manageTickets"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-300 ${
                  isActive ? activeClass : ""
                }`
              }
            >
              <MdManageAccounts className="w-5 h-5" />
              <span className="hidden group-hover:inline">Manage Tickets</span>
            </NavLink>
          </li>

          {/* Advertise Tickets */}
          <li className="mt-2">
            <NavLink
              to="/dashboard/advertiseTickets"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-300 ${
                  isActive ? activeClass : ""
                }`
              }
            >
              <RiAdvertisementLine className="w-5 h-5" />
              <span className="hidden group-hover:inline">Advertise Tickets</span>
            </NavLink>
          </li>
          {/* Transactions Pge*/}
          <li className="mt-2">
            <NavLink
              to="/dashboard/transactionsPge"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-300 ${
                  isActive ? activeClass : ""
                }`
              }
            >
              
              <MdPayments className="w-5 h-5" />
              <span className="hidden group-hover:inline">Transactions ID</span>
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
      <div className="flex-1 flex flex-col transition-all duration-300 group-hover:ml-[12.5rem] ml-16">
        {/* NAVBAR */}
        <nav className="navbar w-full bg-base-300 px-4 shadow-sm">
          <button className="btn btn-ghost btn-square">
         
          </button>
          <div className="ml-4 text-lg font-semibold">Dashboard</div>
        </nav>

        {/* CONTENT */}
        <div className="p-6 bg-base-100 flex-grow rounded-md shadow-sm mt-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
