import React, { useState } from "react";
import { Outlet } from "react-router";
import { Link, NavLink } from "react-router-dom";
import toast from "react-hot-toast";

// Icons
import { FiHome, FiSettings, FiUser, FiMenu, FiX } from "react-icons/fi";
import { TbBrandBooking } from "react-icons/tb";
import { MdAdd, MdManageAccounts, MdPayments } from "react-icons/md";
import { FaInbox, FaTicketAlt, FaBus } from "react-icons/fa";
import { LucideTicketsPlane } from "lucide-react";
import { RiAdvertisementLine } from "react-icons/ri";
import { GrOverview } from "react-icons/gr";
import { VscFeedback } from "react-icons/vsc";
import { BiSolidLogOut } from "react-icons/bi";

import useRole from "../Hooks/useRole";
import UseAuth from "../Hooks/UseAuth"; // Auth Hook
import Spinner from "../components/common/Spinner/Spinner";
import profileImg from "../assets/profile.png"; // Profile Default Image

const DashboardLayout = () => {
  const { role, isLoading } = useRole();
  const { user, logOutUser } = UseAuth(); // ইউজার ডাটা এবং লগআউট ফাংশন
  const [isOpen, setIsOpen] = useState(false); 

  // থিম স্টেট (মেইন ন্যাভবারের মতো)
  const [theme, setTheme] = useState(localStorage.getItem('theme') || "light");

  const handleTheme = (checked) => {
    const newTheme = checked ? "dark" : "light";
    setTheme(newTheme);
    document.querySelector('html').setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const handleLogOut = async () => {
    try {
      await logOutUser();
      toast.success("Logout successful!");
    } catch (error) {
      toast.error("Logout failed!");
    }
  };

  const activeClass = "bg-[#E56F61] text-white font-semibold rounded-md shadow-md";
  const normalClass = "hover:bg-base-300 transition-all duration-200 rounded-md text-base-content";

  if (isLoading) {
    return <Spinner />;
  }

  const renderNavLink = (to, icon, label) => (
    <li className="list-none">
      <NavLink
        to={to}
        onClick={() => setIsOpen(false)}
        className={({ isActive }) =>
          `flex items-center gap-3 px-4 py-3 mb-1 transition-all duration-300 ${
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

      {/* --- SIDEBAR --- */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-base-200 transform transition-transform duration-300 ease-in-out border-r border-base-300
          lg:relative lg:translate-x-0 h-full flex flex-col
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Sidebar Logo Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-base-300 bg-base-200 shrink-0">
          <Link to="/" className="flex items-center gap-1 scale-90">
            <div className="flex items-center bg-[#E56F61] text-white px-3 py-1.5 rounded-xl shadow-lg shadow-[#E56F61]/20">
              <span className="text-lg font-extrabold uppercase tracking-tighter text-white">TB</span>
              <span className="text-lg mx-0.5 font-light text-white">:</span>
              <span className="text-lg font-bold tracking-tight text-white">Tickets</span>
              <FaBus className="text-white w-4 h-4 ml-1" />
            </div>
          </Link>
          <button className="lg:hidden p-2 text-base-content hover:bg-base-300 rounded-md" onClick={() => setIsOpen(false)}>
            <FiX size={24} />
          </button>
        </div>

        {/* Sidebar Navigation */}
        <div className="flex-grow p-3 overflow-y-auto custom-scrollbar">
          <nav>
            {renderNavLink("/", <FiHome />, "Homepage")}

            {role === "vendor" && (
              <div className="mt-4 pt-4 border-t border-base-300">
                <p className="px-4 text-[10px] font-bold opacity-50 uppercase mb-2">Vendor Area</p>
                {renderNavLink("/dashboard/addTicket", <MdAdd />, "Add Ticket")}
                {renderNavLink("/dashboard/myAddedTickets", <LucideTicketsPlane />, "My Tickets")}
                {renderNavLink("/dashboard/requestedBookingsTickets", <FaInbox />, "Requests")}
                {renderNavLink("/dashboard/VendorRevenue", <GrOverview />, "Revenue")}
              </div>
            )}

            {role === "user" && (
              <div className="mt-4 pt-4 border-t border-base-300">
                <p className="px-4 text-[10px] font-bold opacity-50 uppercase mb-2">User Area</p>
                {renderNavLink("/dashboard/myBookingTickets", <TbBrandBooking />, "My Bookings")}
                {renderNavLink("/dashboard/transactionsPge", <MdPayments />, "Transactions")}
              </div>
            )}

            {role === "admin" && (
              <div className="mt-4 pt-4 border-t border-base-300">
                <p className="px-4 text-[10px] font-bold opacity-50 uppercase mb-2">Admin Area</p>
                {renderNavLink("/dashboard/manageUsers", <MdManageAccounts />, "Manage Users")}
                {renderNavLink("/dashboard/manageTickets", <FaTicketAlt />, "Manage Tickets")}
                {renderNavLink("/dashboard/advertiseTickets", <RiAdvertisementLine />, "Advertise")}
                {renderNavLink("/dashboard/feedback", <VscFeedback />, "Feedback")}
                {renderNavLink("/dashboard/manageMessages", <FaInbox />, "User Messages")}
                {renderNavLink("/dashboard/adminOverview", <GrOverview />, "Admin Overview")}
              </div>
            )}
          </nav>
        </div>

        {/* Sidebar Bottom */}
        <div className="p-3 border-t border-base-300 shrink-0">
          {renderNavLink("/dashboard", <FiUser />, "Dashboard Home")}
          {renderNavLink("/profile", <FiSettings />, "Settings")}
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden bg-base-100">
        
        {/* --- DYNAMIC HEADER (Updated as per your Navbar) --- */}
        <header className="h-16 bg-base-200 border-b border-base-300 flex items-center justify-between px-4 sticky top-0 z-30 shadow-sm">
          <div className="flex items-center">
            <button onClick={() => setIsOpen(true)} className="p-2 rounded-md hover:bg-base-300 lg:hidden mr-2">
              <FiMenu size={24} />
            </button>
            <h2 className="text-md font-bold hidden sm:block">Dashboard Overview</h2>
          </div>

          <div className="flex items-center gap-3">
            {/* Theme Controller */}
            <label className="swap swap-rotate mr-2">
              <input type="checkbox" onChange={(e) => handleTheme(e.target.checked)} defaultChecked={localStorage.getItem('theme') === "dark"} className="theme-controller" />
              <svg className="swap-off h-7 w-7 fill-current text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>
              <svg className="swap-on h-7 w-7 fill-current text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>
            </label>

            {/* Profile Section (Custom Dropdown) */}
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="relative cursor-pointer">
                <div className="w-10 h-10 rounded-full border-2 border-[#E56F61] p-0.5 overflow-hidden shadow-sm">
                  <img src={user?.photoURL || profileImg} alt="User" className="w-full h-full object-cover rounded-full" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white shadow-md"></span>
              </div>
              <ul tabIndex={0} className="dropdown-content menu bg-base-200 rounded-xl mt-3 w-60 p-4 shadow-2xl border border-base-300 space-y-2 z-[99]">
                <div className="pb-2 border-b border-base-300 mb-1 text-center">
                  <p className="text-sm font-bold truncate">{user?.displayName || "User Name"}</p>
                  <p className="text-[11px] opacity-60 truncate">{user?.email}</p>
                  <span className="badge badge-sm bg-[#E56F61] text-white border-none mt-1 capitalize">{role}</span>
                </div>
                <li><Link to="/profile" className="flex items-center gap-2 text-sm hover:bg-[#E56F61] hover:text-white transition-all"><FiUser /> My Profile</Link></li>
                <li><button onClick={handleLogOut} className="flex items-center gap-2 text-sm text-red-500 hover:bg-red-500 hover:text-white transition-all"><BiSolidLogOut /> Logout</button></li>
              </ul>
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 backdrop-blur-[2px] z-40 lg:hidden" onClick={() => setIsOpen(false)}></div>}
    </div>
  );
};

export default DashboardLayout;