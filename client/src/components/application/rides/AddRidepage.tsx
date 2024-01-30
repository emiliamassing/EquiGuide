import { isAuthenticated } from "../../../services/tokenService";
import { NotAuthenticated } from "../../error/NotAuthenticated";
import { useEffect, useState } from "react";
import { IHorseData } from "../../../models/IHorseData";
import { getHorses } from "../../../services/horseService";
import { AxiosError } from "axios";
import { AddRideForm } from "./AddRideForm";
import { isAxiosError } from "../../../services/serviceBase";

export function AddRidePage() {
    const [horses, setHorses] = useState<IHorseData[]>([]);
    const localUser = localStorage.getItem('user');
    const localHorses = localStorage.getItem('horses');

    useEffect(() => {
        async function fetchHorses() {
            if(localUser) {
                const parsedUser = JSON.parse(localUser);
                const id = parsedUser.id;

                try{
                    const horseData = await getHorses(id);

                    localStorage.setItem('horses', JSON.stringify(horseData));
                    setHorses(horseData);
                } catch(error: unknown) {
                    if(isAxiosError(error)) {
                        const axiosError = error as AxiosError;

                        if(axiosError.response && axiosError.response.status === 400) {
                            console.log('Något gick fel');
                        }
                    }
                }                
            }
        }

        if(localHorses) {
            setHorses(JSON.parse(localHorses));
        } else {
            fetchHorses();
        }
    }, []);

    return(
        isAuthenticated() ? (
            <>
                <AddRideForm horseList={horses}></AddRideForm>
            </>
        ):(
            <NotAuthenticated></NotAuthenticated>
        )
    );
}