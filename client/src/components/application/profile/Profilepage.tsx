import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../../services/tokenService"
import { removeFromLocalStorage } from "../../../services/userService";
import { NotAuthenticated } from "../../error/NotAuthenticated";
import { AppHeading } from "../layouts/AppHeading";

export function ProfilePage() {
    const navigate = useNavigate();

    function logout() {
        removeFromLocalStorage(); 
        navigate('/login');
    }

    return(
        isAuthenticated() ? (
            <>
                <div className="container">
                    <AppHeading title="Profil"></AppHeading>
                    <button className="primaryButton" onClick={logout}>Logga ut</button>
                </div>
            </>
        ):(
            <NotAuthenticated></NotAuthenticated>
        )
    );
}