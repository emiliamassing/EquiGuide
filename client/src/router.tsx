import { createHashRouter } from "react-router-dom";
import { Startpage } from "./components/Startpage";

export const router = createHashRouter([
    {
        path: '/',
        children: [
            {
                path: '/',
                element: <Startpage />
            }
        ],
    },
]);