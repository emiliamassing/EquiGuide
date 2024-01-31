import { useNavigate } from "react-router-dom";
import { SvgLogo } from "../../svg/SvgLogo";
import { AppHeading } from "../layouts/AppHeading";

interface IShowVerificationProps {
    resetData: () => void;
    verificationMessage: string
}

export function ShowVerification({ resetData, verificationMessage }: IShowVerificationProps) {
    const navigate = useNavigate();

    function navigateToStart() {
        resetData();
        navigate('/app/home');
    }

    return(
        <>
            <div className="container">
                <AppHeading title="Planera ridpass"></AppHeading>
                <div className="infoContainer">
                    <p>{verificationMessage}</p>
                    <button className="primaryButton" onClick={navigateToStart}>Tillbaka</button>
                </div>
            </div>
        </>
    )
}