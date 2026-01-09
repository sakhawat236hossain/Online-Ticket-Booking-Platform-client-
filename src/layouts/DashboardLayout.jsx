import React, { useState } from "react";
import { Outlet } from "react-router";
import { NavLink } from "react-router-dom";

// Icons
import { FiHome, FiSettings, FiUser, FiMenu, FiX } from "react-icons/fi";
import { TbBrandBooking } from "react-icons/tb";
import { MdAdd, MdManageAccounts, MdPayments } from "react-icons/md";
import { FaInbox, FaTicketAlt } from "react-icons/fa";
import { LucideTicketsPlane } from "lucide-react";
import { RiAdvertisementLine } from "react-icons/ri";
import { GrOverview } from "react-icons/gr";
import { VscFeedback } from "react-icons/vsc";

import useRole from "../Hooks/useRole";
import Spinner from "../components/common/Spinner/Spinner";

const DashboardLayout = () => {
  const { role, isLoading } = useRole();
  const [isOpen, setIsOpen] = useState(false); 

  const activeClass = "bg-base-300 font-semibold rounded-md shadow-sm";
  const normalClass = "hover:bg-base-300 transition-all duration-200 rounded-md";

  if (isLoading) {
    return <Spinner />;
  }

  const renderNavLink = (to, icon, label) => (
    <li className="list-none">
      <NavLink
        to={to}
        onClick={() => setIsOpen(false)}
        className={({ isActive }) =>
          `flex items-center gap-3 px-4 py-3 mb-1 ${
            isActive ? activeClass : normalClass
          }`
        }
      >
        <span className="text-xl">{icon}</span>
        <span className="text-sm">{label}</span>
      </NavLink>
    </li>
  );

  return (
    <div className="flex h-screen bg-base-100 overflow-hidden"> 

      {/* --- SIDEBAR (Sticky/Fixed) --- */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-base-200 transform transition-transform duration-300 ease-in-out border-r border-base-300
          lg:relative lg:translate-x-0 h-full
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-base-300 bg-base-200 shrink-0">
          <span className="text-lg font-bold">Dashboard</span>
          <button 
            className="lg:hidden p-2 text-base-content hover:bg-base-300 rounded-md" 
            onClick={() => setIsOpen(false)}
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Sidebar Navigation (Scrollable internally) */}
        <div className="flex flex-col justify-between h-[calc(100vh-64px)] p-3 overflow-y-auto custom-scrollbar">
          <nav>
            {renderNavLink("/", <FiHome />, "Homepage")}

            {/* VENDOR MENU */}
            {role === "vendor" && (
              <div className="mt-4 pt-4 border-t border-base-300">
                <p className="px-4 text-[10px] font-bold opacity-50 uppercase mb-2">Vendor Area</p>
                {renderNavLink("/dashboard/addTicket", <MdAdd />, "Add Ticket")}
                {renderNavLink("/dashboard/myAddedTickets", <LucideTicketsPlane />, "My Tickets")}
                {renderNavLink("/dashboard/requestedBookingsTickets", <FaInbox />, "Requests")}
                {renderNavLink("/dashboard/VendorRevenue", <GrOverview />, "Revenue")}
              </div>
            )}

            {/* USER MENU */}
            {role === "user" && (
              <div className="mt-4 pt-4 border-t border-base-300">
                <p className="px-4 text-[10px] font-bold opacity-50 uppercase mb-2">User Area</p>
                {renderNavLink("/dashboard/myBookingTickets", <TbBrandBooking />, "My Bookings")}
                {renderNavLink("/dashboard/transactionsPge", <MdPayments />, "Transactions")}
              </div>
            )}

            {/* ADMIN MENU */}
            {role === "admin" && (
              <div className="mt-4 pt-4 border-t border-base-300">
                <p className="px-4 text-[10px] font-bold opacity-50 uppercase mb-2">Admin Area</p>
                {renderNavLink("/dashboard/manageUsers", <MdManageAccounts />, "Manage Users")}
                {renderNavLink("/dashboard/manageTickets", <FaTicketAlt />, "Manage Tickets")}
                {renderNavLink("/dashboard/advertiseTickets", <RiAdvertisementLine />, "Advertise")}
                {renderNavLink("/dashboard/feedback", <VscFeedback />, "Feedback")}
              </div>
            )}
          </nav>

          {/* Bottom Links */}
          <div className="mt-auto pt-4 border-t border-base-300 shrink-0">
            {renderNavLink("/profile", <FiUser />, "Profile")}
            {renderNavLink("/settings", <FiSettings />, "Settings")}
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA (Scrollable) --- */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-y-auto bg-base-100">
        {/* Navbar (Sticky top inside content) */}
        <header className="h-16 bg-base-300 flex items-center justify-between px-4 sticky top-0 z-30 shadow-sm shrink-0">
          <div className="flex items-center">
            <button 
              onClick={() => setIsOpen(true)} 
              className="p-2 rounded-md hover:bg-base-200 lg:hidden"
            >
              <FiMenu size={24} />
            </button>
            <h2 className="ml-4 text-md font-semibold">Dashboard Overview</h2>
          </div>
        </header>

        {/* Dynamic Outlet Content */}
        <main className="p-4 md:p-6 lg:p-8 flex-grow">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default DashboardLayout;