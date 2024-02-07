import { useContext, useEffect, useState } from "react";
import { IRideData } from "../models/IRideData";
import { UserContext } from "../contexts/UserContext";
import { getRidesByUserId } from "../services/rideService";
import { isAxiosError } from "../services/serviceBase";
import { AxiosError } from "axios";

export function useGetRides() {
    const [rides, setRides] = useState<IRideData[]>([]);
    const [ridesIsLoading, setRidesIsLoading] = useState<boolean>(true);
    const [hasFetchedData, setHasFetchedData] = useState<boolean>(false);
    const { userData } = useContext(UserContext);

    useEffect(() => {
        async function fetchRides() {
            const userId = userData[0].user.id;
            const idString = userId.toString();

            try{
                const rideData = await getRidesByUserId(idString);
                
                setRides(rideData);
            } catch(error: unknown) {
                if(isAxiosError(error)) {
                    const axiosError = error as AxiosError;

                    if(axiosError.response && axiosError.response.status === 400) {
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