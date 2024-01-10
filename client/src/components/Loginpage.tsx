import { useNavigate } from "react-router-dom";

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
                <div className="loginContainer">
                    <h1>Equiguide</h1>
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