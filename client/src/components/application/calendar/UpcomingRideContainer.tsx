import { IRideData } from "../../../models/IRideData";
import { compareDatesInNextWeek, isAxiosError } from "../../../services/serviceBase";
import { deleteRide } from "../../../services/rideService";
import { AxiosError } from "axios";

interface IUpcomingRideContainerProps {
    rides: IRideData[]
}

async function tryToDeleteRide(rideId: number) {
    try {
        const rideData = await deleteRide(rideId);
        
        console.log('Ride deleted', rideData);
    } catch(error: unknown) {
        if(isAxiosError(error)) {
            const axiosError = error as AxiosError;

            if(axiosError && axiosError.response?.status === 500) {
                console.log('Något gick fel');
            }
        }
    }
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
                                    <button className="secondaryButton" onClick={() => tryToDeleteRide(ride.id)}>Radera</button>
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