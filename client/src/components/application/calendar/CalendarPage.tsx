import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../../services/tokenService"
import { removeFromLocalStorage } from "../../../services/userService";
import { NotAuthenticated } from "../../error/NotAuthenticated";
import { AppHeading } from "../layouts/AppHeading";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

export function CalendarPage() {
    const navigate = useNavigate();

    function logout() {
        removeFromLocalStorage(); 
        navigate('/login');
    }

    return(
        isAuthenticated() ? (
            <>
                <div className="container">
                    <AppHeading title="Kalender"></AppHeading>
                    <FullCalendar plugins={[ dayGridPlugin ]} initialView="dayGridMonth"></FullCalendar>
                </div>
            </>
        ):(
            <NotAuthenticated></NotAuthenticated>
        )
    );
}