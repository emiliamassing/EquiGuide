import { createBrowserRouter } from "react-router-dom";
import { Startpage } from "./components/startpage/Startpage";
import { LoginLayout } from "./components/layout/LoginLayout";
import { Loginpage } from "./components/login/Loginpage";
import { RegisterUser } from "./components/login/RegisterUser";
import { LoginUser } from "./components/login/LoginUser";
import { Homepage } from "./components/Homepage";
import { AppLayout } from "./components/layout/AppLayout";
import { StartLayout } from "./components/layout/StartLayout";
import { RegisterHorse } from "./components/login/RegisterHorse";
import { UserVerification } from "./components/login/UserVerification";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <StartLayout />,
        children: [
            {
                path: '/',
                element: <Startpage />,
                index: true
            },
        ]
    },
    {
        path: '/login',
        element: <LoginLayout />,
        children: [   
            {
                path: '/login',
                element: <Loginpage />
            },
            {
                path: '/login/registerUser',
                element: <RegisterUser />
            },
            {
                path: '/login/loginUser',
                element: <LoginUser />
            },
            {
                path: '/login/userVerification',
                element: <UserVerification />
            },
            {
                path: '/login/registerHorse',
                element: <RegisterHorse />
            }
        ],
    },
    {
        path: '/home',
        element: <AppLayout />,
        children: [
            {
                path: '/home',
                element: <Homepage />,
                index: true
            }
        ]
    }
]);