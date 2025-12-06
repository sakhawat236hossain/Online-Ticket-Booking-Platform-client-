import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";

import bus1 from "../../../../assets/Bus1.jpg";
import train1 from "../../../../assets/train1.jpg";
import WaterShip1 from "../../../../assets/Water-ship1.jpg";
import aroplain1 from "../../../../assets/aroplain1.jpg";

const photos = [bus1, train1, WaterShip1, aroplain1];

const Banner = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % photos.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () =>
    setCurrent((current - 1 + photos.length) % photos.length);
  const nextSlide = () => setCurrent((current + 1) % photos.length);

  const handleSeeAll = () => navigate("/allTickets");

  return (
    <div className="relative w-full mt-6 mb-10">
      <div className="relative max-w-7xl mx-auto overflow-hidden rounded-2xl shadow-xl">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {photos.map((src, i) => (
            <div key={i} className="w-full flex-shrink-0 relative">
              <img
                src={src}
                alt={`Slide ${i + 1}`}
                className="w-full h-[70vh] md:h-[75vh] lg:h-[80vh] object-cover object-center brightness-75"
              />
              <div className="absolute inset-0 bg-black/30 flex flex-col justify-center items-center text-center p-6 md:p-16 text-white">
                <h1 className="text-2xl md:text-4xl font-bold mb-3 drop-shadow-lg">
                  <Typewriter
                    words={[
                      "Book Bus Tickets",
                      "Reserve Train Seats",
                      "Fly with Ease",
                      "Smooth Launch Bookings"
                    ]}
                    loop={0}
                    cursor
                    cursorStyle="|"
                    typeSpeed={70}
                    deleteSpeed={50}
                    delaySpeed={2000}
                  />
                </h1>
                <p className="text-base md:text-lg mb-5 max-w-xl drop-shadow-md">
                  Choose your transport, select your seat, and book instantly.
                </p>
                <button
                  onClick={handleSeeAll}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-5 rounded-full transition shadow-lg"
                >
                  See All Tickets
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-6 -translate-y-1/2 bg-white/30 hover:bg-white/60 text-black p-3 rounded-full transition shadow-lg"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-6 -translate-y-1/2 bg-white/30 hover:bg-white/60 text-black p-3 rounded-full transition shadow-lg"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {photos.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 w-2 rounded-full transition-all ${
                current === i ? "bg-white w-4" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
