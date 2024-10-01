import { useNavigate } from "react-router-dom";
import { AppHeading } from "../layouts/AppHeading";

interface IShowVerificationProps {
    resetData: () => void;
    verificationMessage: string;
    heading: string;
}

export function ShowVerification({ resetData, verificationMessage, heading }: IShowVerificationProps) {
    const navigate = useNavigate();

    function navigateToStart() {
        resetData();
        navigate('/app/home');
    }

    return(
        <>
            <div className="container">
                <AppHeading title={heading}></AppHeading>
                <div className="infoContainer">
                    <p>{verificationMessage}</p>
                    <button className="primaryButton" onClick={navigateToStart}>Tillbaka</button>
                </div>
            </div>
        </>
    )
}