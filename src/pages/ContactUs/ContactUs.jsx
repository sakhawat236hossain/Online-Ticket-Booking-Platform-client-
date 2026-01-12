import React from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { FaFacebook, FaInstagram, FaLinkedin, FaGithub, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { RiSendPlane2Fill } from "react-icons/ri";
import Swal from "sweetalert2";
import axiosPublic from "../../Hooks/useAxios";

const ContactUs = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await axiosPublic.post("/contact", data);
            if (response.data.insertedId) {
                Swal.fire({
                    title: "Message Received!",
                    text: "We will get back to you shortly.",
                    icon: "success",
                    confirmButtonColor: "#E56F61",
                    showClass: { popup: 'animate__animated animate__fadeInDown' }
                });
                reset();
            }
        } catch (error) {
            Swal.fire("Error", "Server is not responding. Try again later!", "error");
        }
    };

    return (
        <div className="min-h-screen py-20 px-4 bg-gradient-to-b from-base-200/50 to-base-100 overflow-hidden">
            <title>Contact Us - TravelEase</title>
            {/* Header Section */}
            <div className="max-w-7xl mx-auto text-center mb-20 relative">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute -top-10 left-1/2 -translate-x-1/2 w-40 h-40 bg-[#E56F61]/10 blur-3xl rounded-full -z-10"
                ></motion.div>
                <h1 className="text-5xl md:text-7xl font-black text-base-content tracking-tight">
                    Let's <span className="text-[#E56F61]">Connect</span>
                </h1>
                <p className="text-base-content/60 mt-6 max-w-xl mx-auto text-lg leading-relaxed">
                    Have a specific inquiry or just want to say hi? Fill out the form and our team will get in touch within 24 hours.
                </p>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-0 shadow-2xl rounded-[3rem] overflow-hidden bg-base-100 border border-base-300">
                
                {/* Left Side: Contact Info (Dark Theme) */}
                <div className="lg:col-span-5 bg-neutral p-10 md:p-16 text-neutral-content relative overflow-hidden">
                    <div className="relative z-10 h-full flex flex-col justify-between">
                        <div>
                            <h2 className="text-4xl font-bold mb-4">Contact Info</h2>
                            <p className="text-neutral-content/60 mb-12">Reach out to us through any of these channels.</p>
                            
                            <div className="space-y-10">
                                <motion.div whileHover={{ x: 10 }} className="flex items-start gap-6">
                                    <div className="bg-[#E56F61] p-4 rounded-2xl shadow-lg shadow-[#E56F61]/20 text-white">
                                        <FaMapMarkerAlt size={24}/>
                                    </div>
                                    <div>
                                        <p className="font-bold text-lg">Location</p>
                                        <p className="text-neutral-content/60">123 Main Street, Dhaka, Bangladesh</p>
                                    </div>
                                </motion.div>

                                <motion.div whileHover={{ x: 10 }} className="flex items-start gap-6">
                                    <div className="bg-[#E56F61] p-4 rounded-2xl shadow-lg shadow-[#E56F61]/20 text-white">
                                        <FaPhoneAlt size={24}/>
                                    </div>
                                    <div>
                                        <p className="font-bold text-lg">Phone</p>
                                        <p className="text-neutral-content/60">+880 1851121472</p>
                                    </div>
                                </motion.div>

                                <motion.div whileHover={{ x: 10 }} className="flex items-start gap-6">
                                    <div className="bg-[#E56F61] p-4 rounded-2xl shadow-lg shadow-[#E56F61]/20 text-white">
                                        <FaEnvelope size={24}/>
                                    </div>
                                    <div>
                                        <p className="font-bold text-lg">Email</p>
                                        <p className="text-neutral-content/60 break-all">hmdsakhawat236@gmail.com</p>
                                    </div>
                                </motion.div>
                            </div>
                        </div>

                        <div className="mt-16">
                            <p className="font-bold mb-6 text-xl tracking-widest uppercase">Follow Us</p>
                            <div className="flex gap-4">
                                {[
                                    {icon: <FaGithub />, link: "https://github.com/sakhawat236hossain"},
                                    {icon: <FaFacebook />, link: "https://www.facebook.com/md.sakhawth.hosain"},
                                    {icon: <FaLinkedin />, link: "https://www.linkedin.com/in/md-sakhawat-hossain-web-developer/"},
                                    {icon: <FaXTwitter />, link: "https://x.com/MdSakhawat21005"}
                                ].map((social, i) => (
                                    <a key={i} href={social.link} target="_blank" className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 hover:bg-[#E56F61] hover:text-white transition-all duration-300 border border-white/10">
                                        {social.icon}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* Background Abstract Shapes */}
                    <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#E56F61]/10 rounded-full blur-[100px]"></div>
                    <div className="absolute top-10 right-10 w-20 h-20 bg-white/5 rounded-full blur-xl"></div>
                </div>

                {/* Right Side: Form (Light/Base Theme) */}
                <div className="lg:col-span-7 p-10 md:p-16">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="relative group">
                                <input 
                                    type="text" 
                                    {...register("name", { required: true })} 
                                    className="peer w-full bg-transparent border-b-2 border-base-300 py-3 outline-none focus:border-[#E56F61] transition-colors placeholder-transparent"
                                    placeholder="Name"
                                />
                                <label className="absolute left-0 -top-3.5 text-sm font-bold text-base-content/40 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-[#E56F61] peer-focus:text-sm uppercase tracking-tighter">Full Name</label>
                            </div>

                            <div className="relative group">
                                <input 
                                    type="email" 
                                    {...register("email", { required: true })} 
                                    className="peer w-full bg-transparent border-b-2 border-base-300 py-3 outline-none focus:border-[#E56F61] transition-colors placeholder-transparent"
                                    placeholder="Email"
                                />
                                <label className="absolute left-0 -top-3.5 text-sm font-bold text-base-content/40 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-[#E56F61] peer-focus:text-sm uppercase tracking-tighter">Email Address</label>
                            </div>
                        </div>

                        <div className="relative group">
                            <input 
                                type="text" 
                                {...register("phone")} 
                                className="peer w-full bg-transparent border-b-2 border-base-300 py-3 outline-none focus:border-[#E56F61] transition-colors placeholder-transparent"
                                placeholder="Phone"
                            />
                            <label className="absolute left-0 -top-3.5 text-sm font-bold text-base-content/40 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-[#E56F61] peer-focus:text-sm uppercase tracking-tighter">Phone Number</label>
                        </div>

                        <div className="relative group">
                            <textarea 
                                rows="4" 
                                {...register("message", { required: true })} 
                                className="peer w-full bg-transparent border-b-2 border-base-300 py-3 outline-none focus:border-[#E56F61] transition-colors placeholder-transparent resize-none"
                                placeholder="Message"
                            ></textarea>
                            <label className="absolute left-0 -top-3.5 text-sm font-bold text-base-content/40 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-[#E56F61] peer-focus:text-sm uppercase tracking-tighter">Tell us more</label>
                        </div>

                        <motion.button 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit" 
                            className="w-full bg-[#E56F61] text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-[#E56F61]/30 flex items-center justify-center gap-3 hover:bg-[#d15b4e] transition-all"
                        >
                            SEND MESSAGE <RiSendPlane2Fill className="text-2xl" />
                        </motion.button>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default ContactUs;