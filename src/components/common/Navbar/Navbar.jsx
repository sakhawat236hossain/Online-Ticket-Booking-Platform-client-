import { Link, NavLink, useNavigate } from "react-router-dom";
import { IoLogIn } from "react-icons/io5";
import { FaBus, FaUser } from "react-icons/fa";
import { BiSolidLogOut } from "react-icons/bi";
import profile from "../../../assets/profile.png";
import UseAuth from "../../../Hooks/UseAuth";
import { toast } from "react-hot-toast";

const NavBar = () => {
  const { user, logOutUser } = UseAuth();
  const navigate = useNavigate();

  const links = [
    { name: "Home", path: "/" },
    { name: "All Tickets", path: "/allTickets" },
    { name: "About", path: "/aboutUs" },
    { name: "Contact Us", path: "/ContactUs" },
  ];

  const handleLogOut = async () => {
    try {
      await logOutUser();
      toast.success("Logout successful!");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Logout failed!");
    }
  };

  return (
    <nav className="navbar sticky top-0 py-3 px-5 z-50 shadow-sm glass-card flex items-center justify-between bg-white">
      {/* LEFT: Logo */}
      <Link to="/" className="flex items-center gap-2 cursor-pointer">
        <div className="flex items-center bg-red-600 text-white px-3 py-1 rounded-md gap-1">
          <span className="text-lg font-extrabold uppercase">tb</span>
          <span className="mx-0.5">:</span>
          <span className="text-lg font-semibold">tickets</span>
          <FaBus className="text-white w-5 h-5" />
        </div>
      </Link>

      {/* CENTER: Menu Links */}
      <ul className="hidden md:flex gap-6">
        {links.map((link) => (
          <li key={link.name}>
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                `px-3 py-1 rounded-md font-medium text-sm ${
                  isActive
                    ? "bg-[#E56F61] text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* RIGHT: User/Profile */}
      <div className="flex items-center gap-3">
        {user ? (
          <div className="dropdown dropdown-end relative group cursor-pointer">
            {/* PROFILE IMAGE */}
            <div
              tabIndex={0}
              role="button"
              className="w-9 h-9 rounded-full border-2 border-gray-300 overflow-hidden cursor-pointer"
            >
              <img
                src={user.photoURL || profile}
                alt="User"
                className="w-full h-full object-cover"
              />
            </div>

            {/* TOOLTIP */}
            <div className="absolute left-12 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs font-medium px-2 py-1 rounded-md shadow-md opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200">
              {user.displayName || "Guest User"}
            </div>

            {/* DROPDOWN MENU */}
            <ul className="dropdown-content absolute right-0 mt-3 w-52 p-2 bg-white rounded-md shadow-lg">
              <div className="pb-3 border-b border-gray-200">
                <li className="text-sm font-bold">{user.displayName}</li>
                <li className="text-xs text-gray-500">{user.email}</li>
              </div>

              <li className="mt-2">
                <button
                  onClick={handleLogOut}
                  className="w-full cursor-pointer px-3 py-1 text-sm rounded-md bg-[#E56F61] text-white border border-[#E56F61] hover:bg-white hover:text-[#E56F61] flex items-center justify-center gap-1"
                >
                  <BiSolidLogOut /> Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="hidden md:flex items-center gap-2">
            <Link
              to="/login"
              className="px-3 py-1 cursor-pointer text-sm rounded-md bg-[#E56F61] text-white border border-[#E56F61] hover:bg-white hover:text-[#E56F61] flex items-center justify-center gap-1"
            >
              <IoLogIn /> Login
            </Link>

            <Link
              to="/register"
              className="px-3 py-1 cursor-pointer text-sm rounded-md bg-[#E56F61] text-white border border-[#E56F61] hover:bg-white hover:text-[#E56F61] flex items-center justify-center gap-1"
            >
              <FaUser /> Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
