import { useEffect, useState } from "react";
import { IHorseData } from "../models/IHorseData";
import { getHorses } from "../services/horseService";
import { AxiosError, isAxiosError } from "axios";

export function useGetHorses() {
    const [horses, setHorses] = useState<IHorseData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
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
                } finally {
                    setIsLoading(false);
                }              
            }
        }

        if(localHorses) {
            setHorses(JSON.parse(localHorses));
        } else {
            fetchHorses();
        }
    }, [localHorses, localUser]);

    return { horses, isLoading } as const;
}