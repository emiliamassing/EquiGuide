import { useNavigate } from "react-router-dom";
import { useGetRidesByUserId } from "../../../hooks/useGetRidesbyUserId";
import { isAuthenticated } from "../../../services/tokenService";
import { NotAuthenticated } from "../../error/NotAuthenticated";
import { ShowLoader } from "../../loader/ShowLoader";
import { AppHeading } from "../layouts/AppHeading";
import { IRideData } from "../../../models/IRideData";
import { useContext } from "react";
import { RideContext } from "../../../contexts/RideContext";
import { RideActionTypes } from "../../../types/ActionTypes";

export function ViewAllRides() {
    const { rides, ridesIsLoading } = useGetRidesByUserId();
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

    console.log(rides);
    

    return(
        isAuthenticated() ? (
            ridesIsLoading ?
                <ShowLoader></ShowLoader>
            :
            <div className="container">
                <AppHeading title="Alla ridpass"></AppHeading>
                <div className="innerContainer">
                    <div className="allRidesWrapper">
                        {rides.map((ride) => (
                            <div className="viewAllRidesContainer" key={ride.id}>
                                <h3>{ride.title}, {ride.horse_name}</h3>
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