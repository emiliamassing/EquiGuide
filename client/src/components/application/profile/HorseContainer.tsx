import { IHorseData } from "../../../models/IHorseData"

interface IHorseContainerProps {
    horses: IHorseData[];
}

export function HorseContainer({ horses }: IHorseContainerProps) {
    console.log(horses);
    

    return(
        <>
            {horses.map((horse) => (
                <div>
                    <div className="horseProfile">
                        
                    </div>
                    <h3>{horse.name}</h3>
                </div>
            ))}
        </>
    )
}