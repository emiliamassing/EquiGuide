import { useNavigate } from "react-router-dom";
import { SvgLogo } from "../svg/SvgLogo";

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
                <div className="headingContainer">
                    <SvgLogo height={50} width={50} outline="5A9378" fill="161414"></SvgLogo>
                    <h1>Planera ridpass</h1>
                </div>
                <div className="divider"></div>
                <div className="infoContainer">
                    <p>{verificationMessage}</p>
                    <button className="primaryButton" onClick={navigateToStart}>Tillbaka</button>
                </div>
            </div>
        </>
    )
}