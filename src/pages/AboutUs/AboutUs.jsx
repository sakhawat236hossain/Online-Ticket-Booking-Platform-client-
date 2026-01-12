import React from "react";
import { FaBus, FaTrain, FaPlane, FaShip, FaUsers, FaLaptopCode, FaMobileAlt, FaPalette } from "react-icons/fa";

const AboutUs = () => {
  return (
    <div className="min-h-screen p-6 flex flex-col items-center">
      <title>About Us - TicketBari</title>
      {/* Header Section */}
      <header className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-extrabold  mb-4">About TicketBari</h1>
        <p className=" text-lg md:text-xl max-w-3xl mx-auto">
          TicketBari is your all-in-one platform for booking Bus, Train, Launch & Flight tickets online. We ensure a seamless, secure, and reliable travel booking experience for everyone.
        </p>
      </header>

      {/* Project Overview */}
      <section className="w-full max-w-5xl rounded-3xl shadow-lg p-10 mb-16">
        <h2 className="text-3xl font-bold  mb-6">Project Overview</h2>
        <p className=" mb-4">
          TicketBari is designed to provide a complete online ticket booking solution with three main user roles:
        </p>
        <ul className="list-disc list-inside  space-y-2 mb-4">
          <li><span className="font-semibold">Users:</span> Browse tickets, book trips, track bookings, and pay securely.</li>
          <li><span className="font-semibold">Vendors:</span> Add tickets, manage bookings, and monitor revenue.</li>
          <li><span className="font-semibold">Admins:</span> Oversee platform operations, approve/reject tickets, manage users, and advertise tickets.</li>
        </ul>
        <p className="">
          The platform ensures usability, scalability, and a responsive experience for all types of users.
        </p>
      </section>

      {/* Services Section */}
      <section className="w-full max-w-6xl mb-16">
        <h2 className="text-4xl font-bold  mb-8 text-center">Our Core Services</h2>
        <div className="grid md:grid-cols-4 gap-8">
          <ServiceCard icon={<FaBus />} title="Bus Tickets" description="Book bus tickets for any route with seat selection, schedule, and real-time availability." />
          <ServiceCard icon={<FaTrain />} title="Train Tickets" description="Reserve train seats hassle-free and get updates about timings and availability." />
          <ServiceCard icon={<FaPlane />} title="Flight Tickets" description="Book domestic and international flights with safe online payment integration." />
          <ServiceCard icon={<FaShip />} title="Launch Tickets" description="Book river launch tickets easily and check seat availability and departure times." />
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="w-full max-w-5xl rounded-3xl shadow-lg p-10 mb-16">
        <h2 className="text-3xl font-bold  mb-6 text-center">Why Choose TicketBari?</h2>
        <ul className="list-decimal list-inside  space-y-3">
          <li>Fast, secure, and reliable booking experience.</li>
          <li>Easy search and filtering by transport type, departure, and destination.</li>
          <li>Detailed ticket info including price, quantity, perks, and departure times.</li>
          <li>User-friendly dashboards for Users, Vendors, and Admins.</li>
          <li>Real-time booking updates and email notifications.</li>
          <li>Integrated Stripe payments for secure online transactions.</li>
          <li>Responsive design for desktop, tablet, and mobile devices.</li>
          <li>Dark/Light mode for user comfort.</li>
        </ul>
      </section>

      {/* Technology & Workflow */}
      <section className="w-full max-w-5xl  rounded-3xl shadow-lg p-10 mb-16">
        <h2 className="text-3xl font-bold  mb-6 text-center">Technology & Workflow</h2>
        <ul className="list-disc list-inside space-y-3">
          <li>MERN Stack (MongoDB, Express, React, Node.js) for full-stack development.</li>
          <li>Firebase Authentication with Google login for secure and fast user authentication.</li>
          <li>Stripe integration for seamless online payments.</li>
          <li>JWT/Firebase token-based API protection for private routes.</li>
          <li>Pagination, sorting, and filtering for better usability in ticket listings.</li>
          <li>Vendor and Admin dashboards for complete platform management.</li>
        </ul>
      </section>

      {/* Team / Experience */}
      <section className="w-full max-w-6xl mb-16">
        <h2 className="text-4xl font-bold  mb-8 text-center">Our Expertise</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <ExperienceCard icon={<FaUsers />} title="Expert Team" description="Highly skilled developers ensuring scalable and efficient solutions." />
          <ExperienceCard icon={<FaLaptopCode />} title="Modern Technology" description="Leveraging latest web technologies for performance and reliability." />
          <ExperienceCard icon={<FaMobileAlt />} title="Responsive Design" description="All pages optimized for mobile, tablet, and desktop users." />
        </div>
      </section>

      {/* Commitment */}
      <section className="text-center max-w-4xl mb-16">
        <h2 className="text-3xl font-bold  mb-4">Our Commitment</h2>
        <p className="text-lg md:text-xl">
          We strive to provide the best online ticket booking experience with full transparency, security, and customer satisfaction. Our goal is to make travel planning simple, fast, and reliable for everyone.
        </p>
      </section>

    </div>
  );
};

// Reusable Service Card Component
const ServiceCard = ({ icon, title, description }) => (
  <div className="p-6 rounded-2xl shadow-lg flex flex-col items-center text-center hover:scale-105 transform transition duration-300">
    <div className="text-purple-500 mb-4 text-5xl">{icon}</div>
    <h3 className="font-bold text-xl mb-2">{title}</h3>
    <p className="">{description}</p>
  </div>
);

// Reusable Experience Card Component
const ExperienceCard = ({ icon, title, description }) => (
  <div className=" p-6 rounded-2xl shadow-lg flex flex-col items-center text-center hover:scale-105 transform transition duration-300">
    <div className="text-purple-500 mb-4 text-5xl">{icon}</div>
    <h3 className="font-bold text-xl mb-2">{title}</h3>
    <p className="">{description}</p>
  </div>
);

export default AboutUs;
