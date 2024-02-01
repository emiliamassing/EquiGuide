import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../../services/tokenService"
import { removeFromLocalStorage } from "../../../services/userService";
import { NotAuthenticated } from "../../error/NotAuthenticated";
import { AppHeading } from "../layouts/AppHeading";

export function HomePage() {
    const navigate = useNavigate();

    function logout() {
        removeFromLocalStorage(); 
        navigate('/login');
    }

    return(
        isAuthenticated() ? (
            <>
                <div className="container">
                    <AppHeading title="Hem"></AppHeading>
                    <h2>Välkommen</h2>
                </div>
            </>
        ):(
            <NotAuthenticated></NotAuthenticated>
        )
    );
}