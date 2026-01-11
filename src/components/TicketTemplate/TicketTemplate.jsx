import React from "react";

const TicketTemplate = ({ bookingData }) => {
  if (!bookingData) return null;

  const date = bookingData.paymentDate?.$date 
    ? new Date(bookingData.paymentDate.$date).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }) 
    : new Date(bookingData.paymentDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });

  // টিকেটের জন্য একটি ইউনিক সিরিয়াল নম্বর জেনারেট করা
  const ticketSerial = bookingData.transactionId ? bookingData.transactionId.slice(-6).toUpperCase() : "TGL-001";

  return (
    <div style={{ backgroundColor: "#e2e8f0", padding: "50px", width: "850px", fontFamily: "'Inter', sans-serif" }}>
      {/* মেইন বডি */}
      <div style={{ backgroundColor: "#ffffff", borderRadius: "8px", overflow: "hidden", border: "1px solid #cbd5e1", position: "relative" }}>
        
        {/* টপ ব্র্যান্ডিং বার */}
        <div style={{ backgroundColor: "#0f172a", height: "8px", width: "100%" }}></div>

        {/* হেডার সেকশন */}
        <div style={{ padding: "30px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #f1f5f9" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            {/* লোগো আইকন স্টাইল */}
            <div style={{ backgroundColor: "#E56F61", padding: "10px", borderRadius: "12px", color: "white", fontWeight: "bold", fontSize: "24px" }}>TG</div>
            <div>
              <h1 style={{ margin: 0, fontSize: "28px", fontWeight: "800", color: "#0f172a", letterSpacing: "-1px" }}>TRAVEL GO</h1>
              <p style={{ margin: 0, fontSize: "11px", color: "#64748b", fontWeight: "600", textTransform: "uppercase" }}>Premium Ticketing Solutions</p>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ margin: 0, fontSize: "10px", color: "#94a3b8", fontWeight: "bold" }}>TICKET NUMBER</p>
            <p style={{ margin: 0, fontSize: "20px", fontWeight: "bold", color: "#E56F61" }}>#TG-{ticketSerial}</p>
          </div>
        </div>

        <div style={{ padding: "40px" }}>
          {/* পেমেন্ট সাকসেস ব্যানার */}
          <div style={{ backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "12px", padding: "20px", marginBottom: "30px", display: "flex", alignItems: "center", gap: "15px" }}>
             <div style={{ backgroundColor: "#22c55e", color: "white", width: "24px", height: "24px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px" }}>✓</div>
             <div>
               <p style={{ margin: 0, fontSize: "14px", fontWeight: "bold", color: "#166534" }}>Confirmed & Secured</p>
               <p style={{ margin: 0, fontSize: "12px", color: "#15803d" }}>Your payment of ${(bookingData.amount / 100).toLocaleString()} has been verified by Travel Go.</p>
             </div>
          </div>

          {/* মেইন ইনফরমেশন গ্রিড */}
          <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "40px" }}>
            
            {/* বাম সাইড: টিকেটের নাম ও বিবরণ */}
            <div>
              <div style={{ marginBottom: "25px" }}>
                <label style={{ fontSize: "10px", fontWeight: "800", color: "#94a3b8", textTransform: "uppercase" }}>Service Description</label>
                <h2 style={{ margin: "5px 0", fontSize: "22px", color: "#1e293b", fontWeight: "700" }}>{bookingData.ticketTitle}</h2>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                <div>
                  <label style={{ fontSize: "10px", fontWeight: "800", color: "#94a3b8", textTransform: "uppercase" }}>Passenger Email</label>
                  <p style={{ margin: "3px 0", fontSize: "14px", fontWeight: "600", color: "#334155" }}>{bookingData.buyerEmail}</p>
                </div>
                <div>
                  <label style={{ fontSize: "10px", fontWeight: "800", color: "#94a3b8", textTransform: "uppercase" }}>Transaction Date</label>
                  <p style={{ margin: "3px 0", fontSize: "14px", fontWeight: "600", color: "#334155" }}>{date}</p>
                </div>
              </div>

              <div style={{ marginTop: "30px", borderTop: "1px solid #f1f5f9", paddingTop: "20px" }}>
                <p style={{ fontSize: "11px", color: "#64748b", lineHeight: "1.6", margin: 0 }}>
                  <strong>Important Notice:</strong> Please present this e-ticket along with a valid photo ID at the counter. We recommend arriving at least 30 minutes prior to departure. 
                </p>
              </div>
            </div>

            {/* ডান সাইড: সিল এবং পেমেন্ট সামারি */}
            <div style={{ backgroundColor: "#f8fafc", padding: "25px", borderRadius: "16px", textAlign: "center", border: "1px solid #e2e8f0" }}>
              <div style={{ marginBottom: "20px" }}>
                 {/* অফিসিয়াল সিল ডিজাইন */}
                 <div style={{ width: "80px", height: "80px", border: "3px solid #E56F61", borderRadius: "50%", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", transform: "rotate(-10deg)" }}>
                    <div style={{ textAlign: "center", color: "#E56F61", fontWeight: "900", lineHeight: "1" }}>
                       <span style={{ fontSize: "8px" }}>TRAVEL GO</span><br/>
                       <span style={{ fontSize: "14px" }}>PAID</span><br/>
                       <span style={{ fontSize: "7px" }}>OFFICIAL</span>
                    </div>
                 </div>
              </div>
              
              <p style={{ margin: "10px 0 0 0", fontSize: "10px", color: "#64748b", fontWeight: "bold" }}>TOTAL FARE PAID</p>
              <h3 style={{ margin: 0, fontSize: "32px", fontWeight: "800", color: "#0f172a" }}>${(bookingData.amount / 100).toLocaleString()}</h3>
              <p style={{ margin: "5px 0 0 0", fontSize: "11px", color: "#22c55e", fontWeight: "bold" }}>✓ Verified Payment</p>
              
              <div style={{ marginTop: "20px", fontSize: "9px", color: "#94a3b8", textAlign: "left", borderTop: "1px solid #e2e8f0", paddingTop: "10px" }}>
                Transaction ID:<br/>
                <span style={{ color: "#475569", fontWeight: "bold" }}>{bookingData.transactionId}</span>
              </div>
            </div>
          </div>
        </div>

        {/* বারকোড ডিজাইন (সিমুলেটেড) */}
        <div style={{ padding: "10px 40px", backgroundColor: "#fdfdfd", borderTop: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ opacity: 0.6 }}>
             {/* বারকোড বারস */}
             <div style={{ display: "flex", gap: "2px", height: "30px", alignItems: "center" }}>
                {[2, 4, 1, 3, 2, 5, 2, 4, 1, 6, 2, 3, 2, 4, 2].map((w, i) => (
                  <div key={i} style={{ backgroundColor: "#000", width: `${w}px`, height: "30px" }}></div>
                ))}
             </div>
          </div>
          <p style={{ margin: 0, fontSize: "11px", color: "#64748b", fontWeight: "bold" }}>PLATFORM: WEB-APP SECURE GATEWAY</p>
        </div>

        {/* ফুটার */}
        <div style={{ backgroundColor: "#0f172a", color: "#94a3b8", padding: "15px 40px", fontSize: "9px", textAlign: "center" }}>
          Travel Go Online Ticketing Platform &copy; 2026. All rights reserved. For support, email support@travelgo.com or call 16247.
        </div>
      </div>
    </div>
  );
};

export default TicketTemplate;