import { useContext, useEffect, useState } from "react";
import { IHorseData } from "../models/IHorseData";
import { getHorses } from "../services/horseService";
import { AxiosError, isAxiosError } from "axios";
import { UserContext } from "../contexts/UserContext";

export function useGetHorses() {
    const [horses, setHorses] = useState<IHorseData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [hasFetchedData, setHasFetchedData] = useState<boolean>(false);
    const userData = useContext(UserContext);

    useEffect(() => {
        async function fetchHorses() {
            const user = userData.userData[0].user.id;
            const userId = user.toString();

            try{
                const horseData = await getHorses(userId);

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
                setHasFetchedData(true);
            }              

        }

        if(!hasFetchedData) {
            fetchHorses();
        }

    }, [ hasFetchedData, userData]);

    return { horses, isLoading, hasFetchedData } as const;
}