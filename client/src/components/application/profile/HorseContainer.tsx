import { useNavigate } from "react-router-dom";
import { IHorseData } from "../../../models/IHorseData"
import { SvgHorse } from "../../svg/SvgHorse";

interface IHorseContainerProps {
    horses: IHorseData[];
}

export function HorseContainer({ horses }: IHorseContainerProps) {
    const navigate = useNavigate();

    function addNewHorse() {
        navigate('/app/profile/addHorse');
    }

    return(
        <>
            {horses.map((horse) => (
                <div key={horse.id}>
                    <div className="horseProfile">
                        <div className="wrapper">
                            <div className="horseProfileHolder">
                                <SvgHorse></SvgHorse>
                            </div>
                            <h3>{horse.name}</h3>
                        </div>
                        <button className="secondaryButton">Visa</button>
                    </div>
                    <div className="divider"></div>
                </div>
            ))}
            <button className="primaryButton" onClick={addNewHorse}>Lägg till häst</button>
        </>
    )
}