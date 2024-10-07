import { isAuthenticated } from "../../../services/tokenService";
import { NotAuthenticated } from "../../error/NotAuthenticated";
import { AppHeading } from "../layouts/AppHeading";

export function ViewRideWithHorse() {
    return(
        isAuthenticated() ? (
            <div className="container">
                <AppHeading title="Alla ridpass med Corellia"></AppHeading>
            </div>
        ) : (
            <NotAuthenticated></NotAuthenticated>
        )
    )
}