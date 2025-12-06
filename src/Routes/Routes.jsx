import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout/RootLayout";
import Home from "../pages/Home/Home";
import AllTickets from "../tickets/AllTickets/AllTickets";

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
            path:"allTickets",
            element:<AllTickets></AllTickets>
            },
        ]
    }
])