import { IRideData } from "../../../models/IRideData";
import { compareDatesInNextWeek } from "../../../services/serviceBase";

interface IUpcomingRideContainerProps {
    rides: IRideData[]
}

export function UpcomingRideContainer({ rides }: IUpcomingRideContainerProps) {
    const todaysDate = new Date();
    let nextWeeksRides = rides.filter((ride) => compareDatesInNextWeek(new Date(ride.date), todaysDate));
    nextWeeksRides = nextWeeksRides.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    return (
        <div className="upcomingContainer">
            {
                nextWeeksRides.length > 0 ?
                nextWeeksRides.map((ride) => {
                    const rideDate = new Date(ride.date);

                    // Compare year, month, and day
                    const isToday = 
                    rideDate.getFullYear() === todaysDate.getFullYear() &&
                    rideDate.getMonth() === todaysDate.getMonth() &&
                    rideDate.getDate() === todaysDate.getDate();
                    
                    return (
                        <div key={ride.id} className="upcomingRideContainer">
                            <h3>
                                <span>{rideDate.toLocaleDateString()}</span>, {ride.title} - {ride.horse_name}
                            </h3>
                            {isToday ? (
                                <div className="upcomingRideBtnContainer">
                                    <button className="secondaryButton">Radera</button>
                                    <button className="primaryButton">Utvärdera</button>
                                </div>
                                ) : (
                                <div className="upcomingRideBtnContainer">
                                    <button className="secondaryButton">Radera</button>
                                </div>
                            )}
                        </div>
                    );
                })
                :
                <p>Inga pass planerade</p>
            }
        </div>
    );
}