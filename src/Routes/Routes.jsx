import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout/RootLayout";
import Home from "../pages/Home/Home";
import ContactUs from "../pages/ContactUs/ContactUs";
import AboutUs from "../pages/AboutUs/AboutUs";
import Login from "../pages/AuthenticationbPges/Login/Login";
import Register from "../pages/AuthenticationbPges/Register/Register";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import Profile from "../pages/Dashboard/Profile/Profile";
import AddTicket from "../pages/Dashboard/Vendor/AddTicket/AddTicket";
import AllTickets from "../pages/Alltickets/AllTickets";
import TicketsDetails from "../pages/TicketsDetails/TicketsDetails";
import MyAddedTickets from "../pages/Dashboard/Vendor/MyAddedTickets/MyAddedTickets";
import MyBookingTickets from "../pages/Dashboard/User/MyBookingTickets";
import RequestedBookings from "../pages/Dashboard/Vendor/RequestedBookings/RequestedBookings";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers/ManageUsers";
import ManageTickets from "../pages/Dashboard/Admin/ManageTickets/ManageTickets";
import AdvertiseTickets from "../pages/Dashboard/Admin/AdvertiseTickets/AdvertiseTickets";
import PaymentSuccess from "../pages/Payment/PaymentSuccess";
import TransactionHistory from "../pages/Dashboard/User/TransactionHistory";
import Error from "../components/common/Error/Error";
import VendorRevenue from "../pages/Dashboard/Vendor/VendorRevenue/VendorRevenue";
import Feedback from "../pages/Dashboard/Admin/Feedback/Feedback";
import ManageMessages from "../pages/Dashboard/Admin/ManageMessages/ManageMessages";
import AdminOverview from "../pages/Dashboard/Admin/AdminOverview/AdminOverview";
import UserOverview from "../pages/Dashboard/User/UserOverview";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    errorElement: <Error></Error>,
    children: [
      { index: true, element: <Home></Home> },
      { path: "/allTickets", element: <PrivateRoute><AllTickets /></PrivateRoute> },
      { path: "/ContactUs", element: <ContactUs /> },
      { path: "/aboutUs", element: <AboutUs /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/ticket/:id", element: <TicketsDetails /> },
      { path: 'paymentSuccess', element: <PaymentSuccess /> },
      { path: "/profile", element: <Profile /> }, 
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <Profile /> },
      { path: "addTicket", element: <AddTicket /> },
      { path: "myAddedTickets", element: <MyAddedTickets /> },
      { path: "myBookingTickets", element: <MyBookingTickets /> },
      { path: "requestedBookingsTickets", element: <RequestedBookings /> },
      { path: "manageUsers", element: <ManageUsers /> },
      { path: "manageTickets", element: <ManageTickets /> },
      { path: "advertiseTickets", element: <AdvertiseTickets /> },
      { path: "transactionsPge", element: <TransactionHistory /> },
      { path: "VendorRevenue", element: <VendorRevenue /> },
      { path: "feedback", element: <Feedback /> },
      {path: "manageMessages", element: <ManageMessages /> },
      {path: "adminOverview", element: <AdminOverview /> },
      {path:"userOverview", element: <UserOverview /> }
    ],
  },
]);