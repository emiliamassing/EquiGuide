import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../services/tokenService"
import { removeFromLocalStorage } from "../services/userService";
import { NotAuthenticated } from "./error/NotAuthenticated";

export function Homepage() {
    function logout() {
        removeFromLocalStorage(); 
    }

    return(
        isAuthenticated() ? (
            <>
                <h1>Du är nu inloggad</h1>
                <button className="primaryButton" onClick={logout}>Logga ut</button>
            </>
        ):(
            <NotAuthenticated></NotAuthenticated>
        )
    );
}