import { createBrowserRouter } from "react-router-dom";
import { Startpage } from "./components/Startpage";
import { Layout } from "./components/Layout";
import { Loginpage } from "./components/Loginpage";
import { RegisterUser } from "./components/RegisterUser";
import { LoginUser } from "./components/LoginUser";
import { Homepage } from "./components/Homepage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Startpage />,
                index: true
            },
            {
                path: '/login',
                element: <Loginpage />
            },
            {
                path: '/registerUser',
                element: <RegisterUser />
            },
            {
                path: '/loginUser',
                element: <LoginUser />
            },
            {
                path: '/home',
                element: <Homepage />
            }
        ],
    },
]);