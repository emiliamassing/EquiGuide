import { IHorseData } from "../../../models/IHorseData"

interface IViewRidesFormProps{
    horses: IHorseData[];
}

export function ViewRidesForm({ horses }: IViewRidesFormProps) {
    return(
        <>
            <form>
                <div className="inputContainer">
                    <span>Se ridpass baserat på häst</span>
                    <select>
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