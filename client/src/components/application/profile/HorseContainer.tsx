import { useNavigate } from "react-router-dom";
import { IHorseData } from "../../../models/IHorseData"
import { SvgHorse } from "../../svg/SvgHorse";
import { useContext } from "react";
import { HorseContext } from "../../../contexts/HorseContext";
import { HorseActionTypes } from "../../../types/ActionTypes";

interface IHorseContainerProps {
    horses: IHorseData[];
}

export function HorseContainer({ horses }: IHorseContainerProps) {
    const { horseDispatch } = useContext(HorseContext);
    const navigate = useNavigate();

    function showHorseInfo(horse: IHorseData) {
        horseDispatch({ type: HorseActionTypes.PASS_DATA, payload: JSON.stringify(horse) });
        navigate('/app/profile/viewHorse');
    }

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
                                <SvgHorse height={55} width={55}></SvgHorse>
                            </div>
                            <h3>{horse.name}</h3>
                        </div>
                        <button className="secondaryButton" onClick={() => showHorseInfo(horse)}>Visa</button>
                    </div>
                    <div className="divider"></div>
                </div>
            ))}
            <button className="primaryButton" onClick={addNewHorse}>Lägg till häst</button>
        </>
    )
}