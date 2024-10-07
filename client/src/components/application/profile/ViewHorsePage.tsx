import { useContext } from "react";
import { isAuthenticated } from "../../../services/tokenService";
import { NotAuthenticated } from "../../error/NotAuthenticated";
import { HorseContext } from "../../../contexts/HorseContext";
import { AppHeading } from "../layouts/AppHeading";
import { SvgHorse } from "../../svg/SvgHorse";
import { useNavigate } from "react-router-dom";

export function ViewHorsePage() {
    const { horseData } = useContext(HorseContext);
    const navigate = useNavigate();

    function directToProfile() {
        navigate('/app/profile');
    }

    function directToEditHorse() {
        navigate('/app/profile/editHorse');
    }

    return(
        isAuthenticated() ? (
            <div className="container">
                <AppHeading title={horseData[0].name}></AppHeading>
                <div className="innerContainer">
                    <div className="viewHorseContainer">
                        <div className="horseProfileImgHolder">
                            <SvgHorse height={75} width={75}></SvgHorse>
                        </div>
                        <div className="horseInfoWrapper">
                            <div className="horseInfoContainer">
                                <p>
                                    <span>Namn: </span>
                                    {horseData[0].name}
                                </p>
                            </div>
                            <div className="horseInfoContainer">
                                <p>
                                    <span>Ras: </span>
                                    {horseData[0].breed}
                                </p>
                            </div>
                            <div className="horseInfoContainer">
                                <p>
                                    <span>Ålder: </span>
                                    {horseData[0].age}
                                </p>
                            </div>
                            <div className="horseInfoContainer">
                                <p>
                                    <span>Kön: </span>
                                    {horseData[0].gender}
                                </p>
                            </div>
                            <div className="horseInfoContainer">
                                <p>
                                    <span>Inriktning: </span>
                                    {horseData[0].discipline}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="buttonContainer viewHorseButtonContainer">
                        <button className="secondaryButton" onClick={directToProfile}>Tillbaka</button>
                        <button className="primaryButton" onClick={directToEditHorse}>Redigera</button>
                    </div>
                </div>
            </div>
        ) : (
            <NotAuthenticated></NotAuthenticated>
        )
    )
}