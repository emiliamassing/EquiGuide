import { isAuthenticated } from "../../../services/tokenService"
import { NotAuthenticated } from "../../error/NotAuthenticated";
import { AppHeading } from "../layouts/AppHeading";

export function ExplorePage() {
    return(
        isAuthenticated() ? (
            <>
                <div className="container">
                    <AppHeading title="Utforska"></AppHeading>
                    <div className="innerContainer">
                        <p>Denna sidan kommer lämnas tom för stunden, mer information finns att tillgå via examensrapporten.</p>
                    </div>
                </div>
            </>
        ):(
            <NotAuthenticated></NotAuthenticated>
        )
    );
}