import React, { useEffect, useRef, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { FiDownload, FiCheckCircle, FiHome } from "react-icons/fi";
import TicketTemplate from "../../components/TicketTemplate/TicketTemplate";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get("session_id");
  const navigate = useNavigate();
  const calledRef = useRef(false);
  const axiosSecure = useAxiosSecure();
  const ticketRef = useRef(); 
  
  const [bookingData, setBookingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false); 

  useEffect(() => {
    if (!bookingId || calledRef.current) return;
    calledRef.current = true;

    const confirmPayment = async () => {
      try {
        const res = await axiosSecure.post("/payment-success", { bookingId });
        if (res.data.success) {
          setBookingData(res.data.data);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    };
    confirmPayment();
  }, [bookingId, axiosSecure]);

  const handleDownloadPDF = async () => {
    const element = ticketRef.current;
    if (!element || isDownloading) return; 

    setIsDownloading(true); 
    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: null, 
        onclone: (clonedDoc) => {
          const elementsWithOklch = clonedDoc.querySelectorAll('*');
          elementsWithOklch.forEach(el => {
            const styles = window.getComputedStyle(el);
            if (styles.color.includes('oklch')) el.style.color = '#000000';
            if (styles.backgroundColor.includes('oklch')) el.style.backgroundColor = 'transparent';
          });
        }
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("l", "mm", "a4"); 
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const imgProps = pdf.getImageProperties(imgData);
      const ratio = imgProps.width / imgProps.height;
      const finalWidth = pdfWidth - 20; 
      const finalHeight = finalWidth / ratio;

      pdf.addImage(imgData, "PNG", 10, (pdfHeight - finalHeight) / 2, finalWidth, finalHeight);
      pdf.save(`TravelGo_Ticket_${bookingData.transactionId.slice(-6)}.pdf`);
    } catch (error) {
      console.error("PDF generation failed:", error);
    } finally {
      setIsDownloading(false); 
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#E56F61]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-100">
      <div className="bg-white max-w-md w-full rounded-[2.5rem] shadow-2xl p-10 text-center border border-gray-100">
        
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="h-24 w-24 rounded-full bg-green-50 flex items-center justify-center animate-pulse">
            <FiCheckCircle size={60} className="text-green-500" />
          </div>
        </div>

        <h1 className="text-3xl font-black text-gray-900 mb-2">Payment Success!</h1>
        <p className="text-gray-500 mb-10 leading-relaxed">
          আপনার টিকিট বুকিং সম্পন্ন হয়েছে। নিচের বাটনে ক্লিক করে ই-টিকিট ডাউনলোড করুন।
        </p>

        <div className="flex flex-col gap-4">
          <button
            disabled={!bookingData || isDownloading}
            onClick={handleDownloadPDF}
            className={`cursor-pointer w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-bold transition-all shadow-lg text-white 
              ${isDownloading ? 'bg-gray-400' : 'bg-[#E56F61] hover:bg-[#cf5a4d] active:scale-95'}`}
          >
            <FiDownload size={22} className={isDownloading ? "animate-bounce" : ""} /> 
            {isDownloading ? "Preparing Ticket..." : "Download E-Ticket PDF"}
          </button>

          <button 
            className="cursor-pointer  w-full flex items-center justify-center gap-2 bg-gray-50 text-gray-600 py-4 rounded-2xl font-bold hover:bg-gray-100 transition-all active:scale-95" 
            onClick={() => navigate("/")}
          >
            <FiHome size={20} /> Back to Home
          </button>
        </div>

        {/* --- Hidden Ticket Template for PDF Generation --- */}
        <div style={{ position: "absolute", left: "-9999px", top: "0" }}>
           <div ref={ticketRef}>
              <TicketTemplate bookingData={bookingData} />
           </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;