import React from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { FaUsers, FaStore, FaRoute, FaTicketAlt } from 'react-icons/fa';

const StatsCounter = () => {
    const { ref, inView } = useInView({
        threshold: 0.3,
        triggerOnce: true,
    });

    const stats = [
        {
            id: 1,
            label: "Happy Users",
            count: 5000,
            icon: <FaUsers />,
            suffix: "+"
        },
        {
            id: 2,
            label: "Verified Vendors",
            count: 200,
            icon: <FaStore />,
            suffix: "+"
        },
        {
            id: 3,
            label: "Active Routes",
            count: 50,
            icon: <FaRoute />,
            suffix: "+"
        },
        {
            id: 4,
            label: "Tickets Booked",
            count: 12000,
            icon: <FaTicketAlt />,
            suffix: "+"
        }
    ];

    return (
        <section ref={ref} className="py-20 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#E56F61] rounded-full blur-3xl"></div>
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#FF9A8B] rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
                    {stats.map((stat) => (
                        <div 
                            key={stat.id} 
                            className="group p-8 rounded-3xl bg-base-100 border border-base-200 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 ease-in-out"
                        >
                            <div className="flex flex-col items-center">
                                {/* Icon Container */}
                                <div className="mb-6 p-5 rounded-2xl bg-gradient-to-br from-[#E56F61] to-[#FF9A8B] text-white text-4xl shadow-lg group-hover:rotate-[360deg] transition-transform duration-700">
                                    {stat.icon}
                                </div>

                                {/* Number */}
                                <div className="text-3xl md:text-5xl font-extrabold text-base-content tracking-tight">
                                    {inView ? (
                                        <CountUp end={stat.count} duration={3} separator="," />
                                    ) : (
                                        "0"
                                    )}
                                    <span className="text-[#E56F61]">{stat.suffix}</span>
                                </div>

                                {/* Label */}
                                <p className="mt-3 text-sm md:text-base font-semibold text-base-content/60 uppercase tracking-widest">
                                    {stat.label}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsCounter;