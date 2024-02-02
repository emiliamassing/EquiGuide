import { IHorseData } from "../../../models/IHorseData"

interface IRideContainerProps {
    horses: IHorseData[];
}

export function RideContainer({ horses }: IRideContainerProps) {
    return(
        <>
            {horses.map((horse)  => (
                <p key={horse.name}>{horse.name}</p>
            ))}
        </>
    )
}