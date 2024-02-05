import { isAuthenticated } from "../../../services/tokenService"
import { NotAuthenticated } from "../../error/NotAuthenticated";
import { AppHeading } from "../layouts/AppHeading";
import { useGetHorses } from "../../../hooks/useGetHorses";
import { ShowLoader } from "../../loader/ShowLoader";
import { RideContainer } from "./RideContainer";
import { ViewRidesForm } from "./ViewRidesForm";
import { SecondaryHeading } from "../layouts/SecondaryHeading";
import { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";
import { useGetContext } from "../../../hooks/useGetContext";

export function HomePage() {
    const { horses, isLoading } = useGetHorses();
    const { userData }  = useContext(UserContext);
    const user = userData.length > 0 ? userData[0].user : null;    

    useGetContext();

    return(
        isAuthenticated() ? (
            isLoading ? 
                <ShowLoader></ShowLoader>
            :
            <>
                <div className="container">
                    <AppHeading title="Hem"></AppHeading>
                    <div className="innerContainer">
                        <h2>
                            Välkommen, {user? user.firstname : 'Kunde inte hämta data'} <span className="material-symbols-outlined icon">favorite</span>
                        </h2>
                        <RideContainer horses={horses}></RideContainer>
                    </div>
                </div>
                <div className="container">
                <SecondaryHeading title="Ridpass"></SecondaryHeading>
                    <div className="innerContainer">
                            <div className="tertriaryButtonContainer">
                                <button className="tertriaryButton">Se alla tidigare ridpass</button>
                            </div>
                        <ViewRidesForm horses={horses}></ViewRidesForm>
                    </div>
                    
                </div>
            </>
        ):(
            <NotAuthenticated></NotAuthenticated>
        )
    );
}