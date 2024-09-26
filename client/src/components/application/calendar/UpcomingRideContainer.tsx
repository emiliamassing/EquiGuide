import { IRideData } from "../../../models/IRideData";
import { compareDatesInNextWeek } from "../../../services/serviceBase";

interface IUpcomingRideContainerProps {
    rides: IRideData[]
}

export function UpcomingRideContainer({ rides }: IUpcomingRideContainerProps) {
    const todaysDate = new Date();
    let nextWeeksRides = rides.filter((ride) => compareDatesInNextWeek(new Date(ride.date), todaysDate));
    nextWeeksRides = nextWeeksRides.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    return(
        <>
            <div className="upcomingContainer">
                {
                    nextWeeksRides.length > 0 ?                    
                    nextWeeksRides.map((ride) => (
                        <div className="upcomingRideContainer">
                            <h3>{new Date(ride.date).toLocaleDateString()}, <span>{ride.title} - {ride.horse_name}</span></h3>
                        </div>
                    ))
                    :
                    <p>Inga pass planerade</p>
                }
            </div>
        </>
    )
}