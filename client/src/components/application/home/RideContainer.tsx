import { useContext } from "react";
import { IRideData } from "../../../models/IRideData"
import { compareDates, comparePassedDates } from "../../../services/serviceBase";
import { RideContext } from "../../../contexts/RideContext";
import { RideActionTypes } from "../../../types/ActionTypes";
import { useNavigate } from "react-router-dom";

interface IRideContainerProps {
    rides: IRideData[]
}

export function RideContainer({ rides }: IRideContainerProps) {
    const { rideDispatch } = useContext(RideContext);
    const navigate = useNavigate();
    const todaysDate = new Date();
    const todaysRide = rides.find((ride) => compareDates(todaysDate, new Date(ride.date)));
    const earlierRides = rides.filter((ride) => comparePassedDates(todaysDate, new Date(ride.date)));
    const latestFiveEarlierRides = earlierRides.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);
    
    function directToEditor(ride: IRideData) {
        rideDispatch({ type: RideActionTypes.PASS_DATA, payload: JSON.stringify(ride) });
        navigate('/app/editor');
    }

    return(
        <>
            <div className="ridesContainer">
                <h3>Idag</h3>
                {
                    todaysRide ? 
                    <div className="todaysRideContainer">
                        <p>{todaysRide.title}, {todaysRide.horse_name}</p>
                        <div className="ridesButtonContainer">
                            <button className="primaryButton" onClick={() => directToEditor(todaysRide)}>Utvärdera</button>
                        </div>
                    </div>
                    :
                    <p>Inget planerat ridpass idag</p>
                }
            </div>
            <div className="ridesContainer"></div>
                <h3>Tidigare</h3>
            {   
                earlierRides.length < 1 ?
                <p>Inga tidigare ridpass hittade</p>
                :
                latestFiveEarlierRides.map((ride) => (
                    <div className="earlierRidesContainer">
                        <p key={ride.id}>{ride.title}, {ride.horse_name}</p>
                        <div className="ridesButtonContainer">
                            <button className="secondaryButton">Redigera</button>
                            <button className="primaryButton">Visa</button>
                        </div>
                    </div>
                ))
            }
        </>
    )
}