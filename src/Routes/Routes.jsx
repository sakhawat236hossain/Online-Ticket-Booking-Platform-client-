import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout/RootLayout";
import Home from "../pages/Home/Home";
import AllTickets from "../tickets/AllTickets/AllTickets";
import ContactUs from "../pages/ContactUs/ContactUs";
import AboutUs from "../pages/AboutUs/AboutUs";

export const router =createBrowserRouter([
    {
        path:'/',
        element:<RootLayout></RootLayout>,
        children:[
            {
                index:true,
                element:<Home></Home>
            },
            {
            path:"/allTickets",
            element:<AllTickets></AllTickets>
            },
            {
            path:"/ContactUs",
            element:<ContactUs></ContactUs>
            },
            {
            path:"/aboutUs",
            element:<AboutUs></AboutUs>
            },
        ]
    }
])