import { FormEvent, useContext, useState } from "react";
import { IHorseData } from "../../../models/IHorseData"
import { HorseContext } from "../../../contexts/HorseContext";
import { useNavigate } from "react-router-dom";
import { HorseActionTypes } from "../../../types/ActionTypes";

interface IViewRidesFormProps{
    horses: IHorseData[];
}

export function ViewRidesForm({ horses }: IViewRidesFormProps) {
    const [selectedHorseName, setSelectedHorseName] = useState<string>('');
    const { horseDispatch } = useContext(HorseContext);
    const navigate = useNavigate();

    function handleHorseSelect(e: React.ChangeEvent<HTMLSelectElement>) {
        const horsename = e.target.value;
        setSelectedHorseName(horsename);
    }

    function directToViewRideWithHorse(e: FormEvent) {
        e.preventDefault();
        const selectedHorse = horses.find((horse) => horse.name === selectedHorseName);

        if(selectedHorse) {
            horseDispatch({ type: HorseActionTypes.PASS_DATA, payload: JSON.stringify(selectedHorse) });
            navigate('/app/viewRides/horse');
        } else {
            console.log('Ingen häst vald');
        }
    }

    return(
        <>
            <form onSubmit={directToViewRideWithHorse}>
                <div className="inputContainer">
                    <span>Se ridpass baserat på häst</span>
                    <select className="homeSelect" value={selectedHorseName} onChange={handleHorseSelect}>
                        <option value={""} hidden>Välj häst</option>
                        {horses.map((horse) => (
                            <option value={horse.name} key={horse.name}>{horse.name}</option>
                        ))}
                    </select>
                </div>
                <div className="inputContainer">
                    <button className="primaryButton">Visa ridpass</button>  
                </div> 
            </form>
        </>
    )
}