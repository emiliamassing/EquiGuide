import { IRideData } from "../../../models/IRideData";
import { compareDatesInNextWeek } from "../../../services/serviceBase";
import { RideActionTypes } from "../../../types/ActionTypes";
import { useContext } from "react";
import { RideContext } from "../../../contexts/RideContext";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../../services/tokenService";
import { NotAuthenticated } from "../../error/NotAuthenticated";

interface IUpcomingRideContainerProps {
    rides: IRideData[]
}

export function UpcomingRideContainer({ rides }: IUpcomingRideContainerProps) {
    const { rideDispatch } = useContext(RideContext);
    const navigate = useNavigate();
    const todaysDate = new Date();
    let nextWeeksRides = rides.filter((ride) => compareDatesInNextWeek(new Date(ride.date), todaysDate));
    nextWeeksRides = nextWeeksRides.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    function directToEditor(ride: IRideData) {
        rideDispatch({ type: RideActionTypes.PASS_DATA, payload: JSON.stringify(ride) });
        navigate('/app/editor');
    }

    async function directToVerifyer(ride: IRideData) {
        rideDispatch({ type: RideActionTypes.PASS_DATA, payload: JSON.stringify(ride) });
        navigate('/app/verifyDeleting');
    }

    return (
        isAuthenticated() ? (
            <>
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
                                        <button className="secondaryButton" onClick={() => directToVerifyer(ride)}>Radera</button>
                                        <button className="primaryButton" onClick={() => directToEditor(ride)}>Utvärdera</button>
                                    </div>
                                    ) : (
                                    <div className="upcomingRideBtnContainer">
                                        <button className="secondaryButton" onClick={() => directToVerifyer(ride)}>Radera</button>
                                    </div>
                                )}
                            </div>
                        );
                    })
                    :
                    <div className="upcomingRideContainer">
                        <p>Inga pass planerade kommande veckan</p>
                    </div>
                }
                </div>        
                
            </>
        ) : (
            <NotAuthenticated></NotAuthenticated>
        )
    );
}