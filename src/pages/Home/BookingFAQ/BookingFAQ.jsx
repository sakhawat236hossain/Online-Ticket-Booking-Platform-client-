import React, { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

const BookingFAQ = () => {
  const steps = [
    {
      question: "Step 1: Browse Tickets",
      answer:
        "Go to the 'All Tickets' page and explore available tickets for Bus, Train, Launch, or Plane. You can filter by location and transport type.",
    },
    {
      question: "Step 2: Select a Ticket",
      answer:
        "Click on 'See Details' of the ticket you want. Check price, available quantity, transport type, and perks.",
    },
    {
      question: "Step 3: Book Now",
      answer:
        "Click the 'Book Now' button. Enter the quantity of tickets you want. Ensure the quantity is less than or equal to available tickets.",
    },
    {
      question: "Step 4: Confirm Booking",
      answer:
        "Submit your booking. The ticket status will be set to 'Pending'. You can check your booked tickets in 'My Booked Tickets' section.",
    },
    {
      question: "Step 5: Make Payment",
      answer:
        "Once the vendor approves your booking, click 'Pay Now' to complete the payment securely using Stripe.",
    },
    {
      question: "Step 6: Get Confirmation",
      answer:
        "After successful payment, your ticket status will change to 'Paid'. You can download your ticket PDF (optional feature).",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleStep = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="px-6 py-16 dark:bg-gray-900">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 dark:text-white">
          How to Book a Ticket?
        </h2>
        <p className="mt-2 text-gray-500 dark:text-gray-300">
          Follow these simple steps to book your travel tickets
        </p>
        <div className="w-24 h-1 bg-red-500 mx-auto mt-4 rounded-full"></div>
      </div>

      {/* Accordion */}
      <div className="max-w-3xl mx-auto space-y-4">
        {steps.map((step, index) => (
          <div
            key={index}
            className=" dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-shadow "
          >
            <button
              onClick={() => toggleStep(index)}
              className="cursor-pointer w-full flex justify-between items-center px-6 py-4 focus:outline-none dark:hover:bg-gray-700 transition-colors"
            >
              <span className="text-lg font-semibold dark:text-white">
                {step.question}
              </span>
              <span className="text-red-500 dark:text-red-400 text-2xl">
                {activeIndex === index ? <FiMinus /> : <FiPlus />}
              </span>
            </button>
            <div
              className={`px-6 overflow-hidden transition-all duration-500 ${
                activeIndex === index ? "max-h-96 py-4" : "max-h-0"
              }`}
            >
              <p className=" dark:text-gray-200">{step.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BookingFAQ;
