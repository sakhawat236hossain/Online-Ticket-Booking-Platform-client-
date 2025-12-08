import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout/RootLayout";
import Home from "../pages/Home/Home";
import AllTickets from "../tickets/AllTickets/AllTickets";
import ContactUs from "../pages/ContactUs/ContactUs";
import AboutUs from "../pages/AboutUs/AboutUs";
import Login from "../pages/AuthenticationbPges/Login/Login";
import Register from "../pages/AuthenticationbPges/Register/Register";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";

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
        element: <DashboardLayout></DashboardLayout>,
        children: [
          // এখানে Dashboard pages গুলো add করবে
          // { path: "profile", element: <Profile /> }
          // { path: "bookings", element: <Bookings /> }
        ],
      },
    ],
  },
]);
