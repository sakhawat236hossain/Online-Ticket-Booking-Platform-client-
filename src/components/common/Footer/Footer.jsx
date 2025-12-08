import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaEnvelope,
  FaPhone,
  FaCcStripe,
  FaBus,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-10 pb-5 px-5">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Logo & Description */}
        <div>
          <Link to="/" className="flex items-center gap-2 mb-3">
            <div className="flex items-center bg-red-600 text-white px-3 py-1 rounded-md gap-1">
              <span className="text-lg font-extrabold uppercase">tb</span>
              <span className="mx-0.5">:</span>
              <span className="text-lg font-semibold">tickets</span>
              <FaBus className="text-white w-5 h-5" />
            </div>
          </Link>

          <p className="text-gray-400 text-sm leading-6">
            Book bus, train, launch, and flight tickets easily from one trusted
            platform. Best prices, fast booking & reliable support for your
            travel.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="footer-title">Quick Links</h3>
          <ul className="footer-list">
            <li><Link to="/" className="footer-link">Home</Link></li>
            <li><Link to="/allTickets" className="footer-link">All Tickets</Link></li>
            <li><Link to="/ContactUs" className="footer-link">Contact Us</Link></li>
            <li><Link to="/aboutUs" className="footer-link">About</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="footer-title">Contact Info</h3>
          <ul className="footer-list space-y-3">
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-[#E56F61]" />
              <span>support@ticketbari.com</span>
            </li>
            <li className="flex items-center gap-2">
              <FaPhone className="text-[#E56F61]" />
              <span>+880 1700 000000</span>
            </li>
            <li className="flex items-center gap-2">
              <FaFacebook className="text-[#E56F61]" />
              <a
                href="https://www.facebook.com/groups/758794404948932/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Facebook Page
              </a>
            </li>
          </ul>
        </div>

        {/* Payment Methods */}
        <div>
          <h3 className="footer-title">Payment Methods</h3>
          <div className="flex items-center gap-4 mt-2">
            <div className="footer-pay-icon">
              <FaCcStripe className="text-white text-3xl md:text-4xl" />
            </div>
          </div>
          <p className="text-gray-400 text-xs mt-2">
            Secure & reliable online payments
          </p>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-gray-400 text-sm">
        © 2025 TicketBari. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
