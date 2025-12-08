import React from "react";
import { FiMenu, FiHome, FiSettings, FiUser } from "react-icons/fi";

const DashboardLayout = () => {
  return (
    <div className="drawer lg:drawer-open min-h-screen">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      {/* ================= MAIN CONTENT ================= */}
      <div className="drawer-content flex flex-col min-h-screen">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300 px-4">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            <FiMenu className="w-6 h-6" />
          </label>
          <div className="ml-4 text-lg font-semibold">Dashboard</div>
        </nav>

        {/* Page content */}
        <div className="p-6 bg-base-100 flex-grow rounded-md shadow-sm">
          Page Content
        </div>
      </div>

      {/* ================= SIDEBAR ================= */}
      <div className="drawer-side h-screen">
        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>

        <div className="flex flex-col justify-between bg-base-200 transition-all duration-300 h-full is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Top menu items */}
          <ul className="menu w-full grow overflow-y-auto">
            <li>
              <button
                className="flex items-center gap-3 px-4 py-2 hover:bg-base-300 rounded-md transition-all duration-200 is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Homepage"
              >
                <FiHome className="w-5 h-5" />
                <span className="is-drawer-close:hidden">Homepage</span>
              </button>
            </li>
            {/* Add more top menu items here */}
          </ul>

          {/* Bottom section: Settings / Profile */}
          <ul className="menu w-full flex-none border-t border-base-300">
            <li>
              <button
                className="flex items-center gap-3 px-4 py-2 hover:bg-base-300 transition-all duration-200 is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Settings"
              >
                <FiSettings className="w-5 h-5" />
                <span className="is-drawer-close:hidden">Settings</span>
              </button>
            </li>
            <li>
              <button
                className="flex items-center gap-3 px-4 py-2 hover:bg-base-300 transition-all duration-200 is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Profile"
              >
                <FiUser className="w-5 h-5" />
                <span className="is-drawer-close:hidden">Profile</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
