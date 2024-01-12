import { createBrowserRouter } from "react-router-dom";
import { Startpage } from "./components/startpage/Startpage";
import { Layout } from "./components/layout/Layout";
import { Loginpage } from "./components/login/Loginpage";
import { RegisterUser } from "./components/login/RegisterUser";
import { LoginUser } from "./components/login/LoginUser";
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