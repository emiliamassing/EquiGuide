import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../../services/tokenService"
import { NotAuthenticated } from "../../error/NotAuthenticated";
import { AppHeading } from "../layouts/AppHeading";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useGetRides } from "../../../hooks/useGetRides";
import { ShowLoader } from "../../loader/ShowLoader";
import { UpcomingRideContainer } from "./UpcomingRideContainer";

export function CalendarPage() {
    const { rides, ridesIsLoading } = useGetRides();
    const navigate = useNavigate();
    const todaysDate = new Date();

    const calendarEvents = rides.map((ride) => {
        const rideDate = new Date(ride.date);
        const isUpcoming = rideDate >= todaysDate;
        const isToday = rideDate.toDateString() === todaysDate.toDateString();

        return {
            title: `${ride.title}, ${ride.horse_name}`,
            date: new Date(ride.date).toLocaleDateString(),
            classNames: isUpcoming || isToday ? 'upcomingEvent' : 'passedEvent'
        }
    }); 

    return(
        isAuthenticated() ? (
            ridesIsLoading ? 
                <ShowLoader></ShowLoader>
            :
            <>
                <div className="container">
                    <AppHeading title="Kalender"></AppHeading>
                    <FullCalendar 
                        plugins={[ dayGridPlugin ]} 
                        initialView="dayGridMonth" 
                        events={calendarEvents} 
                        weekNumberCalculation={"ISO"}>
                     </FullCalendar>
                </div>
                <UpcomingRideContainer rides={rides}></UpcomingRideContainer>
            </>
        ):(
            <NotAuthenticated></NotAuthenticated>
        )
    );
}