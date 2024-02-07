import { isAuthenticated } from "../../../services/tokenService";
import { NotAuthenticated } from "../../error/NotAuthenticated";
import { AddRideForm } from "./AddRideForm";
import { useGetHorses } from "../../../hooks/useGetHorses";
import { ShowLoader } from "../../loader/ShowLoader";

export function AddRidePage() {
    const { horses, isLoading } = useGetHorses();

    if(isLoading) {
        return(
            <>
                <ShowLoader></ShowLoader>
            </>
        )
    }

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