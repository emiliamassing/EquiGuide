import { useContext } from "react";
import { isAuthenticated } from "../../../services/tokenService";
import { NotAuthenticated } from "../../error/NotAuthenticated";
import { AppHeading } from "../layouts/AppHeading";
import { HorseContext } from "../../../contexts/HorseContext";
import { useGetRidesByHorseId } from "../../../hooks/useGetRidesbyHorseId";
import { ShowLoader } from "../../loader/ShowLoader";
import { IRideData } from "../../../models/IRideData";
import { RideActionTypes } from "../../../types/ActionTypes";
import { useNavigate } from "react-router-dom";
import { RideContext } from "../../../contexts/RideContext";

export function ViewRideWithHorse() {
    const { rides, ridesIsLoading } = useGetRidesByHorseId();
    const { horseData } = useContext(HorseContext);
    const { rideDispatch } = useContext(RideContext);
    const navigate = useNavigate();

    function directToEditor(ride: IRideData) {
        rideDispatch({ type: RideActionTypes.PASS_DATA, payload: JSON.stringify(ride) });
        navigate('/app/editor');
    }

    function directToViewRide(ride: IRideData) {
        rideDispatch({ type: RideActionTypes.PASS_DATA, payload: JSON.stringify(ride) });
        navigate('/app/viewRide')
    }

    return(
        isAuthenticated() ? (
            ridesIsLoading ? 
                <ShowLoader></ShowLoader>
            :
            <div className="container">
                <AppHeading title={`Alla ridpass med ${horseData[0].name}`}></AppHeading>
                <div className="innerContainer">
                    <div className="allRidesWrapper">
                        {rides.map((ride) => (
                            <div className="viewAllRidesContainer" key={ride.ride_id}>
                                <h3>{ride.title}</h3>
                                <p>{ride.discipline}</p>
                                <p>{new Date(ride.date).toLocaleDateString()}</p>
                                <div className="ridesButtonContainer">
                                    <button className="secondaryButton" onClick={() => directToEditor(ride)}>Redigera</button>
                                    <button className="primaryButton" onClick={() => directToViewRide(ride)}>Visa</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        ) : (
            <NotAuthenticated></NotAuthenticated>
        )
    )
}
