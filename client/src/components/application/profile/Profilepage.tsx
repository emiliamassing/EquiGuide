import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../../services/tokenService";
import { removeFromLocalStorage } from "../../../services/userService";
import { NotAuthenticated } from "../../error/NotAuthenticated";
import { AppHeading } from "../layouts/AppHeading";
import { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";
import { ActionTypes } from "../../../types/ActionTypes";
import { SvgProfile } from "../../svg/SvgProfile";
import { useGetHorses } from "../../../hooks/useGetHorses";
import { ShowLoader } from "../../loader/ShowLoader";
import { HorseContainer } from "./HorseContainer";

export function ProfilePage() {
    const navigate = useNavigate();
    const { horses, isLoading } = useGetHorses();
    const { userData, dispatch } = useContext(UserContext);
    const user = userData[0].user;

    function directToEditUser() {
        navigate('/app/profile/editUser');
    }

    function logout() {
        removeFromLocalStorage();
        dispatch({ type: ActionTypes.LOGOUT, payload: JSON.stringify(user.id) }); 
        navigate('/login');
    }

    return(
        isAuthenticated() ? (
            isLoading ?
                <ShowLoader></ShowLoader>
            :
            <>
                <div className="container">
                    <AppHeading title="Profil"></AppHeading>
                    <div className="innerContainer innerProfileContainer">
                        <div className="profileContainer">
                            <div className="profileHolder">
                                <SvgProfile></SvgProfile>
                            </div>
                            <h2>{user.firstname} {user.lastname}</h2>
                            <button className="tertriaryButton" onClick={directToEditUser}>Redigera profil</button>
                        </div>
                        <div className="horseContainer">
                            <h2>Mina hästar</h2>
                            <HorseContainer horses={horses}></HorseContainer>
                        </div>
                        <button className="tertriaryButton logoutButton" onClick={logout}>Logga ut</button>
                    </div>
                </div>
            </>
        ):(
            <NotAuthenticated></NotAuthenticated>
        )
    );
}