import { createHashRouter } from "react-router-dom";
import { Startpage } from "./components/startpage/Startpage";
import { LoginLayout } from "./components/layout/LoginLayout";
import { Loginpage } from "./components/login/Loginpage";
import { RegisterUser } from "./components/login/RegisterUser";
import { LoginUser } from "./components/login/LoginUser";
import { HomePage } from "./components/application/home/Homepage";
import { AppLayout } from "./components/layout/AppLayout";
import { StartLayout } from "./components/layout/StartLayout";
import { RegisterHorse } from "./components/login/RegisterHorse";
import { UserVerification } from "./components/login/UserVerification";
import { CalendarPage } from "./components/application/calendar/CalendarPage";

import { ExplorePage } from "./components/application/explore/ExplorePage";
import { ProfilePage } from "./components/application/profile/Profilepage";
import { AddRidePage } from "./components/application/rides/AddRidepage";
import { EditorPage } from "./components/application/editor/EditorPage";
import { ViewRidepage } from "./components/application/rides/ViewRidepage";
import { VerifyDeletingRide } from "./components/application/rides/VerifyDeletingRide";
import { AddHorsePage } from "./components/application/profile/AddHorsePage";
import { ViewHorsePage } from "./components/application/profile/ViewHorsePage";
import { EditHorsePage } from "./components/application/profile/EditHorsePage";
import { EditUserPage } from "./components/application/profile/EditUserPage";
import { ViewAllRides } from "./components/application/rides/ViewAllRides";
import { ViewRideWithHorse } from "./components/application/rides/ViewRideWithHorse";

export const router = createHashRouter([
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
                element: <Loginpage />,
                index: true
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
        path: '/app',
        element: <AppLayout />,
        children: [
            {
                path: '/app/home',
                element: <HomePage />,
            },
            {
                path: '/app/calendar',
                element: <CalendarPage />
            },
            {
                path: '/app/addRide',
                element: <AddRidePage/>
            },
            {
                path: '/app/viewRide',
                element: <ViewRidepage />
            },
            {
                path: '/app/viewAllRides', 
                element: <ViewAllRides />
            },
            {
                path: '/app/viewRides/horse',
                element: <ViewRideWithHorse />
            },
            {
                path: '/app/editor',
                element: <EditorPage />
            },
            {
                path: '/app/explore',
                element: <ExplorePage />
            },
            {
                path: '/app/profile',
                element: <ProfilePage />
            },
            {
                path: '/app/profile/editUser',
                element: <EditUserPage />
            },
            {
                path: '/app/profile/viewHorse',
                element: <ViewHorsePage />
            },
            {
                path: '/app/profile/addHorse',
                element: <AddHorsePage />
            },
            {
                path: '/app/profile/editHorse',
                element: <EditHorsePage />
            },
            {
                path: '/app/verifyDeleting',
                element: <VerifyDeletingRide />
            }
        ]
    }
]);