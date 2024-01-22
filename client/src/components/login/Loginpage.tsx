import { useNavigate } from "react-router-dom";
import { SvgLogo } from "../svg/SvgLogo";

export function Loginpage() {
    const navigate = useNavigate();

    function directToRegisterUser() {
        navigate('/login/registerUser');
    }

    function directToLoginUser() {
        navigate('/login/loginUser');
    }

    return(
        <>
            <h1>Equiguide</h1>
            <SvgLogo height={120} width={120} outline="0a3b2c79" fill="161414"></SvgLogo>
            <p>Unlock your riding potential</p>
            <div className="loginButtonContainer">
                <button className="secondaryButton" onClick={directToRegisterUser}>Registrera</button>
                <button className="primaryButton" onClick={directToLoginUser}>Logga in</button>
            </div>
        </>
    );
}