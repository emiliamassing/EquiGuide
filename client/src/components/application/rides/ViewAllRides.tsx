import { isAuthenticated } from "../../../services/tokenService";
import { NotAuthenticated } from "../../error/NotAuthenticated";
import { AppHeading } from "../layouts/AppHeading";

export function ViewAllRides() {
    return(
        isAuthenticated() ? (
            <div className="container">
                <AppHeading title="Alla ridpass"></AppHeading>
            </div>
        ) : (
            <NotAuthenticated></NotAuthenticated>
        )
    )
}