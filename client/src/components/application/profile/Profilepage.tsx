import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../../services/tokenService"
import { removeFromLocalStorage } from "../../../services/userService";
import { NotAuthenticated } from "../../error/NotAuthenticated";
import { AppHeading } from "../layouts/AppHeading";
import { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";
import { ActionTypes } from "../../../types/ActionTypes";

export function ProfilePage() {
    const navigate = useNavigate();
    const { userData, dispatch } = useContext(UserContext);
    const user = userData[0].user;

    function logout() {
        removeFromLocalStorage();
        dispatch({ type: ActionTypes.LOGOUT, payload: JSON.stringify(user.id) }) 
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