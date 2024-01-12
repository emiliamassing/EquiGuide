import { useNavigate } from "react-router-dom";
import { SvgLogo } from "../logo/SvgLogo";

export function Loginpage() {
    const navigate = useNavigate();

    function directToRegisterUser() {
        navigate('/registerUser');
    }

    function directToLoginUser() {
        navigate('/loginUser');
    }

    return(
        <>
            <section>
                <div className="headerImage"></div>
                <div className="loginPageContainer">
                    <h1>Equiguide</h1>
                    <SvgLogo height={120} width={120}></SvgLogo>
                    <p>Unlock your riding potential</p>
                    <div className="loginButtonContainer">
                        <button className="secondaryButton" onClick={directToRegisterUser}>Register</button>
                        <button className="primaryButton" onClick={directToLoginUser}>Login</button>
                    </div>
                </div>
            </section>
        </>
    );
}