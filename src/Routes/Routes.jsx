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

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/allTickets",
        element: (
          <PrivateRoute>
            <AllTickets></AllTickets>
          </PrivateRoute>
        ),
      },
      {
        path: "/ContactUs",
        element: <ContactUs></ContactUs>,
      },
      {
        path: "/aboutUs",
        element: <AboutUs></AboutUs>,
      },
      {
        path: "/profile",
        element: <Profile></Profile>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/ticket/:id",
        element: <TicketsDetails></TicketsDetails>,
      },

      //  Dashboard Route
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <DashboardLayout></DashboardLayout>
          </PrivateRoute>
        ),
        children: [
          {
            index: true,
            element: <Profile></Profile>,
          },
          {
            path: "addTicket",
            element: <AddTicket></AddTicket>,
          },
          {
            path: "myAddedTickets",
            element: <MyAddedTickets></MyAddedTickets>,
          },
          {
            path: "myBookingTickets",
            element: <MyBookingTickets></MyBookingTickets>,
          },
          {
            path: "requestedBookingsTickets",
            element: <RequestedBookings></RequestedBookings>
          },
          {
            path: "manageUsers",
            element: <ManageUsers></ManageUsers>
          },
          {
            path: "manageTickets",
            element: <ManageTickets></ManageTickets>
          }
        ],
      },
    ],
  },
]);
