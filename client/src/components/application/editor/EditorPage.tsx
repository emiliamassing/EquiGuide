import { useContext } from "react";
import { AppHeading } from "../layouts/AppHeading";
import { RideContext } from "../../../contexts/RideContext";
import { isAuthenticated } from "../../../services/tokenService";
import { NotAuthenticated } from "../../error/NotAuthenticated";
import { useGetRidesById } from "../../../hooks/useGetRidesById";

export function EditorPage() {
    const { rideData } = useContext(RideContext);
    const { ride } = useGetRidesById();

    console.log(ride);
    

    return (
        isAuthenticated() ? (
            <div className="container">
               <AppHeading title="Utvärdera ridpass"></AppHeading>
            </div>
        ) : (
            <NotAuthenticated></NotAuthenticated>
        )
    );
}