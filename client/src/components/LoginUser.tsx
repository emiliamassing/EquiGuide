import { useNavigate } from "react-router-dom";

export function LoginUser() {
    const navigate = useNavigate();

    function directToLogin() {
        navigate('/login');
    }

    function loginUser() {
        console.log('Try to login');
        
    }

    return(
        <>
            <h1>Login</h1>
            <div className="loginButtonContainer">
                <button className="secondaryButton" onClick={directToLogin}>Go back</button>
                <button className="primaryButton" onClick={loginUser}>Login</button>
            </div>
        </>
    );
}