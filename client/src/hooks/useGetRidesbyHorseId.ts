import { useContext, useEffect, useState } from "react";
import { IRideData } from "../models/IRideData";
import { getRidesByHorseId } from "../services/rideService";
import { AxiosError, isAxiosError } from "axios";
import { HorseContext } from "../contexts/HorseContext";

export function useGetRidesByHorseId() {
    const [rides, setRides] = useState<IRideData[]>([]);
    const [ridesIsLoading, setRidesIsLoading] = useState<boolean>(true);
    const [hasFetchedData, setHasFetchedData] = useState<boolean>(false);
    const { horseData } = useContext(HorseContext);

    useEffect(() => {
        async function fetchRides() {
            const horseId = horseData[0].id.toString();
            try {
                const fetchedRideData = await getRidesByHorseId(horseId);
             
                setRides(fetchedRideData); 
            } catch(error: unknown) {
                if(isAxiosError(error)) {
                    const axiosError = error as AxiosError;

                    if(axiosError && axiosError?.response?.status === 400) {
                        console.log('Något gick fel');
                    }
                }
            } finally {
                setRidesIsLoading(false);
                setHasFetchedData(true);
            }
        }

        if(!hasFetchedData) {
            fetchRides();
        }
    });

    return { rides, ridesIsLoading, hasFetchedData } as const;
}