import { useContext, useState } from "react"
import { RideContext } from "../../../contexts/RideContext"
import { isAuthenticated } from "../../../services/tokenService";
import { NotAuthenticated } from "../../error/NotAuthenticated";
import { AppHeading } from "../layouts/AppHeading";
import { useNavigate } from "react-router-dom";
import { deleteRide } from "../../../services/rideService";
import { AxiosError, isAxiosError } from "axios";
import { ShowVerification } from "../verification/ShowVerification";

export function VerifyDeletingRide() {
    const { rideData } = useContext(RideContext);
    const [dataDeleted, setDataDeleted] = useState(false);
    const navigate = useNavigate();

    function resetDataDeleted() {
        setDataDeleted(false);
    }

    function directToCalendar() {
        navigate('/app/calendar');
    }

    async function tryToRemoveRide() {
        const rideId = rideData[0].id;
    
        try {
            const rideData = await deleteRide(rideId);
            
            console.log('Ride deleted', rideData);
            setDataDeleted(true);
        } catch(error: unknown) {
            if(isAxiosError(error)) {
                const axiosError = error as AxiosError;
    
                if(axiosError && axiosError.response?.status === 500) {
                    console.log('Något gick fel');
                }
            }
        }
    }

    return(
        isAuthenticated() ? (
            <>
                {dataDeleted ?
                    <ShowVerification resetData={resetDataDeleted} verificationMessage="Ridpass borttaget" heading="Bekräftelse"></ShowVerification>
                    :
                    <div className="container">
                        <AppHeading title="Bekräfta"></AppHeading>
                        <div className="innerContainer">
                            <p>Är du säker på att du vill radera ridpasset?</p>
                            <div className="buttonContainer">
                                <button className="secondaryButton" onClick={directToCalendar}>Avbryt</button>
                                <button className="primaryButton" onClick={tryToRemoveRide}>Radera</button>
                            </div>
                        </div>
                    </div>
                }
            </>
        ) : (
            <NotAuthenticated></NotAuthenticated>
        )
    )
}