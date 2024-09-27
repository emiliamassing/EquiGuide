import { useContext, useEffect, useState } from "react";
import { IRideData } from "../models/IRideData";
import { RideContext } from "../contexts/RideContext";
import { AxiosError, isAxiosError } from "axios";
import { getRideById } from "../services/rideService";

export function useGetRidesById() {
    const [ride, setRide] = useState<IRideData[]>([]);
    const [rideIsLoading, setRideisLoading] = useState<boolean>(true);
    const [hasFetchedData, setHasFetchedData] = useState<boolean>(false);
    const { rideData } = useContext(RideContext);

    useEffect(() => {
        async function fetchRide() {
            console.log(rideData);
            

            const rideId = rideData[0].id;
            const idString = rideId.toString();

            try {
                const fetchedRideData = await getRideById(idString);

                setRide(fetchedRideData);
            } catch(error: unknown)  {
                if(isAxiosError(error)) {
                    const axiosError = error as AxiosError;

                    if(axiosError && axiosError.response?.status === 400) {
                        console.log('Något gick fel');
                    }
                }
            }  finally {
                setRideisLoading(false);
                setHasFetchedData(true);
            }         
        }

        if(!hasFetchedData) {
            fetchRide();
        }
    });

    return { ride, rideIsLoading, hasFetchedData } as const;
}