import { useContext, useEffect, useState } from "react";
import { IHorseData } from "../models/IHorseData";
import { getHorses } from "../services/horseService";
import { AxiosError, isAxiosError } from "axios";
import { UserContext } from "../contexts/userContext";

export function useGetHorses() {
    const [horses, setHorses] = useState<IHorseData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const userData = useContext(UserContext);
    const localHorses = localStorage.getItem('horses');

    useEffect(() => {
        async function fetchHorses() {

            const user = userData[0].user.id;
            const userId = user.toString();

            try{
                const horseData = await getHorses(userId);

                localStorage.setItem('horses', JSON.stringify(horseData));
                setHorses(horseData);
            } catch(error: unknown) {
                if(isAxiosError(error)) {
                    const axiosError = error as AxiosError;

                    if(axiosError.response && axiosError.response.status === 400) {
                        console.log('Något gick fel');
                    }
                }
            } finally {
                setIsLoading(false);
            }              

        }

        if(localHorses) {
            setHorses(JSON.parse(localHorses));
            setIsLoading(false);
        } else {
            fetchHorses();
        }
    }, [localHorses, userData]);

    return { horses, isLoading } as const;
}