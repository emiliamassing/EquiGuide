import { useContext } from "react";
import { isAuthenticated } from "../../../services/tokenService";
import { NotAuthenticated } from "../../error/NotAuthenticated";
import { RideContext } from "../../../contexts/RideContext";
import { useNavigate } from "react-router-dom";
import { AppHeading } from "../layouts/AppHeading";
import { IRideData } from "../../../models/IRideData";
import { RideActionTypes } from "../../../types/ActionTypes";

export function ViewRidepage() {
    const { rideData, rideDispatch } = useContext(RideContext);
    const navigate = useNavigate();

    function directToHome() {
        navigate('/app/home');
    }

    function directToEditRide(ride: IRideData) {
        rideDispatch({ type: RideActionTypes.PASS_DATA, payload: JSON.stringify(ride) });
        navigate('/app/editor');
    }

    return (
        isAuthenticated() ? (
            <div className="container">
                <AppHeading title="Visa ridpass"></AppHeading>
                <div className="innerContainer">
                    <h2>{rideData[0].title}, {rideData[0].horse_name}</h2>
                    <p className="dateParagraph">{new Date(rideData[0].date).toLocaleDateString()}</p>
                    <p className="disciplineParagraph">{rideData[0].discipline}</p>
                    <div className="starRating">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span
                                key={star}
                                className={`material-symbols-outlined star ${rideData[0].rating >= star ? 'filled' : ''}`}
                            >
                                star
                            </span>
                        ))}
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: rideData[0].notes }}></div>

                    <div className="buttonContainer">
                        <button className="secondaryButton" onClick={directToHome}>Tillbaka</button>
                        <button className="primaryButton" onClick={() => directToEditRide(rideData[0])}>Redigera</button>
                    </div>
                </div>
            </div>
        ):(
            <NotAuthenticated></NotAuthenticated>
        )
    );
}