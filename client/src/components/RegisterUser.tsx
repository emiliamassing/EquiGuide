import { useNavigate } from "react-router-dom";

export function RegisterUser() {
    const navigate = useNavigate();

    function directToLogin() {
        navigate('/login');
    }

    function directToCreateHorse() {
        console.log('Will direct to create horse component');
    }

    return(
        <>
            <h1>Register user</h1>
            <div className="loginButtonContainer">
                <button className="secondaryButton" onClick={directToLogin}>Go back</button>
                <button className="primaryButton" onClick={directToCreateHorse}>Next</button>
            </div>
        </>
    );
}