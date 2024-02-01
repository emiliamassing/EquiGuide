import { isAuthenticated } from "../../../services/tokenService"
import { NotAuthenticated } from "../../error/NotAuthenticated";
import { AppHeading } from "../layouts/AppHeading";
import { useGetHorses } from "../../../hooks/useGetHorses";
import { ShowLoader } from "../../loader/ShowLoader";
import { RideContainer } from "./RideContainer";
import { ViewRidesForm } from "./ViewRidesForm";
import { SecondaryHeading } from "../layouts/SecondaryHeading";

export function HomePage() {
    const { horses, isLoading } = useGetHorses();

    return(
        isAuthenticated() ? (
            isLoading ? 
                <ShowLoader></ShowLoader>
            :
            <>
                <div className="container">
                    <AppHeading title="Hem"></AppHeading>
                    <h2>Välkommen</h2>
                    <RideContainer horses={horses}></RideContainer>
                </div>
                <div className="container">
                    <SecondaryHeading title="Ridpass"></SecondaryHeading>
                    <div className="tertriaryButtonContainer">
                       <button className="tertriaryButton">Se alla tidigare ridpass</button>
                    </div>
                    <ViewRidesForm horses={horses}></ViewRidesForm>
                </div>
            </>
        ):(
            <NotAuthenticated></NotAuthenticated>
        )
    );
}