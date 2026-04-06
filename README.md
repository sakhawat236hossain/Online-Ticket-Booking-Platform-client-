# 🎫 TicketBari – Online Ticket Booking Platform

A **fully responsive online ticket booking platform** built with the **MERN Stack (MongoDB, Express.js, React, Node.js)**. Users can easily discover, book, and manage tickets for various transportation services such as **Bus, Train, Launch, and Plane**.

The platform is designed with **three distinct roles** — **User**, **Vendor**, and **Admin** — each with dedicated dashboards and role-based features.

---

## 🔗 Project Links

* **Live Website:** *[[Insert Your Deployed Live Link Here](https://online-ticket-booking-platform.netlify.app/)]*
* **Client Repository:** [https://github.com/sakhawat236hossain/Online-Ticket-Booking-Platform-client-](https://github.com/sakhawat236hossain/Online-Ticket-Booking-Platform-client-)
* **Server Repository:** [https://github.com/sakhawat236hossain/Online-Ticket-Booking-Platform-server](https://github.com/sakhawat236hossain/Online-Ticket-Booking-Platform-server)

---

## ✨ General Features

* 🔐 **Multi‑Role Authentication** – Secure login system for **User, Vendor, and Admin**
* 📱 **Fully Responsive Design** – Optimized for mobile, tablet, and desktop devices
* 🌙 **Dark / Light Mode Toggle** *(Challenge Requirement)*
* 🔒 **JWT Secured APIs** *(Challenge Requirement)*
* 📊 **Role‑Based Dashboard Layout** – Separate sidebar and access control for each role

---

## 👤 User Features

### 🎟️ Ticket Discovery & Booking

* Browse available tickets from the **Homepage** and **All Tickets** page
* View detailed ticket information before booking

### 🔍 Filter, Search & Sort

* Search tickets by **From / To location**
* Filter by **Transport Type** (Bus, Train, Launch, Plane)
* Sort by **Price (Low → High / High → Low)**

### ⏳ Ticket Details

* Full ticket information
* Live **Countdown Timer** for departure date & time
* **Book Now** functionality

### 💳 Secure Payment

* Stripe payment integration after booking confirmation

### 📋 User Dashboard

* **User Profile** – View personal information
* **My Booked Tickets** – Track ticket status: *Pending, Accepted, Rejected, Paid*
* **Transaction History** – View completed Stripe payment details

---

## 🧑‍💼 Vendor Features

### 🎫 Ticket Management

* Add new tickets via a dedicated form
* View, update, and delete added tickets

### 📥 Booking Requests

* Accept or reject booking requests from users

### 📊 Vendor Dashboard

* **Vendor Profile** – Personal information overview
* **Revenue Overview** – Interactive charts displaying:

  * Total Revenue
  * Total Tickets Sold
  * Total Tickets Added

---

## 🛡️ Admin Features

### ✅ Ticket Moderation

* Approve or reject tickets submitted by vendors

### 👥 User Management

* View all registered users
* Change user roles (Make Admin / Make Vendor)
* **Mark as Fraud** feature for suspicious vendors (automatically hides all their tickets)

### 📢 Ticket Advertisement

* Select up to **6 approved tickets** using a toggle system
* Display selected tickets in the **Homepage Advertisement Section**

---

## 🛠️ Tech Stack & Key Packages

### 💻 Front‑End (Client Side)

* **React** – UI development
* **React Router DOM v7** – Fast & dynamic routing
* **Tailwind CSS & DaisyUI** – Modern and responsive UI design
* **Firebase Authentication** – Email/Password & Google login
* **@tanstack/react-query** – Server state management
* **Axios** – HTTP client
* **React Hook Form** – Efficient form handling
* **React Hot Toast** – Notifications & alerts
* **Recharts** – Dashboard data visualization
* **React Countdown** – Ticket departure countdown timer
* **Framer Motion** – Smooth animations & transitions

---

### ⚙️ Back‑End (Server Side)

* **Node.js & Express.js** – REST API development
* **MongoDB & Mongoose** – Database & ORM
* **Firebase Admin SDK** – Server-side authentication & verification
* **Stripe** – Secure payment processing
* **JWT** – API protection & authorization
* **dotenv** – Environment variable management
* **CORS** – Cross-Origin Resource Sharing handling

---

## 🚀 Local Setup & Installation

### ✅ Prerequisites

* Node.js (v18+)
* MongoDB (Local or Atlas)
* Firebase Project
* Stripe Account

---

## 🖥️ Server Setup

```bash
git clone [Your Server Repository Link]
cd server
npm install
```

### 🔐 Environment Variables (.env)

```env
PORT=5000
MONGODB_URI=YOUR_MONGODB_URI
JWT_SECRET=YOUR_JWT_SECRET
STRIPE_SECRET_KEY=YOUR_STRIPE_SECRET_KEY

FIREBASE_PRIVATE_KEY_ID=
FIREBASE_PRIVATE_KEY="YOUR_PRIVATE_KEY_WITH_\\n"
FIREBASE_CLIENT_EMAIL=
FIREBASE_PROJECT_ID=
```

### ▶️ Run Server

```bash
# or
nodemon
```

---

## 💻 Client Setup

```bash
git clone [Your Client Repository Link]
cd client
npm install
```

### 🔐 Environment Variables (.env)

```env
VITE_FIREBASE_API_KEY=YOUR_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=YOUR_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID=YOUR_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET=YOUR_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID=YOUR_FIREBASE_APP_ID
VITE_STRIPE_PUBLISHABLE_KEY=YOUR_STRIPE_PUBLISHABLE_KEY
VITE_SERVER_URL=http://localhost:5000
```

### ▶️ Run Client

```bash
npm run dev
```

---

## 📝 Commit History

* ✅ **Client Side:** 50+ meaningful commits
* ✅ **Server Side:** 30+ meaningful commits

Each commit message clearly describes the changes made, ensuring maintainability and transparency throughout the development process.

---

## 📌 Summary

**TicketBari** is a complete, real‑world online ticket booking solution showcasing role-based authentication, secure payment integration, modern UI/UX, and scalable backend architecture — ideal for production‑ready applications and professional portfolio presentation.
