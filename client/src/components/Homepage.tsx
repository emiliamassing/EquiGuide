import { isAuthenticated } from "../services/tokenService"
import { NotAuthenticated } from "./error/NotAuthenticated";

export function Homepage() {
    return(
        isAuthenticated() ? (
            <>
                <h1>You're now signed in</h1>
            </>
        ):(
            <NotAuthenticated></NotAuthenticated>
        )
    );
}