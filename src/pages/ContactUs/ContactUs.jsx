import React from "react";
import { useForm } from "react-hook-form";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { RiSendPlane2Fill } from "react-icons/ri";

const ContactUs = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Submitted:", data);
    alert("Thank you for contacting us!");
    reset();
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 via-pink-100 to-yellow-100 p-6 flex flex-col items-center">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
        Contact Us
      </h1>

      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg p-6 md:p-10 flex flex-col md:flex-row gap-8">
        {/* Contact Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex-1 space-y-5">
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">Name</label>
            <input
              type="text"
              placeholder="Your Name"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none transition"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Your Email"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none transition"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">Phone</label>
            <input
              type="text"
              placeholder="Your Phone"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none transition"
              {...register("phone", { required: "Phone is required" })}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">Message</label>
            <textarea
              rows="4"
              placeholder="Your Message"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none transition"
              {...register("message", { required: "Message is required" })}
            ></textarea>
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">
                {errors.message.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#E56F61] text-white rounded-lg hover:bg-white hover:text-[#E56F61] border border-[#E56F61] font-semibold transition-colors"
          >
            Send Message <RiSendPlane2Fill />
          </button>
        </form>

        {/* Contact Info + Social Links */}
        <div className="flex-1 flex flex-col gap-6 bg-purple-50 p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Contact Info
          </h2>
          <p>
            <span className="font-semibold">Address:</span> 123 Main Street,
            Dhaka, Bangladesh
          </p>
          <p>
            <span className="font-semibold">Phone:</span> +880 1851121472
          </p>
          <p>
            <span className="font-semibold">Email:</span>{" "}
            hmdsakhawat236@gmail.com
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mt-4">Follow Us</h2>
          <div className="flex gap-4 mt-2">
            <a
              href="https://www.facebook.com/md.sakhawth.hosain"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              <FaFacebook size={24} />
            </a>
            <a
              href="https://x.com/MdSakhawat21005"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-600 transition-colors"
            >
              <FaXTwitter size={24} />
            </a>
            <a
              href="https://www.instagram.com/mhmdshwthsyn/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-600 hover:text-pink-800 transition-colors"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/md-sakhawat-hossain-web-developer/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:text-blue-900 transition-colors"
            >
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
