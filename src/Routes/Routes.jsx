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

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout></RootLayout>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: '/allTickets',
        element: (
          <PrivateRoute>
            <AllTickets></AllTickets>
          </PrivateRoute>
        ),
      },
      {
        path: '/ContactUs',
        element: <ContactUs></ContactUs>,
      },
      {
        path: '/aboutUs',
        element: <AboutUs></AboutUs>,
      },
      {
        path: '/profile',
        element: <Profile></Profile>,
      },
      {
        path: '/login',
        element: <Login></Login>,
      },
      {
        path: '/register',
        element: <Register></Register>,
      },

      //  Dashboard Route
      {
        path: '/dashboard',
        element:<PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children: [
          {
            index: true,
            element: <Profile></Profile>
          },
          {
            path: 'addTicket',
            element:<AddTicket></AddTicket>
          }
        ],
      },
    ],
  },
]);
