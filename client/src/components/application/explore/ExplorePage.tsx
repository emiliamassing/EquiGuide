import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../../services/tokenService"
import { removeFromLocalStorage } from "../../../services/userService";
import { NotAuthenticated } from "../../error/NotAuthenticated";

export function ExplorePage() {
    const navigate = useNavigate();

    function logout() {
        removeFromLocalStorage(); 
        navigate('/login');
    }

    return(
        isAuthenticated() ? (
            <>
                <h1>Hitta övningar</h1>
                <button className="primaryButton" onClick={logout}>Logga ut</button>
            </>
        ):(
            <NotAuthenticated></NotAuthenticated>
        )
    );
}