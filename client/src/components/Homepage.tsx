import { isAuthenticated } from "../services/tokenService"
import { NotAuthenticated } from "./error/NotAuthenticated";

export function Homepage() {
    return(
        isAuthenticated() ? (
            <>
                <h1>Du är nu inloggad</h1>
            </>
        ):(
            <NotAuthenticated></NotAuthenticated>
        )
    );
}