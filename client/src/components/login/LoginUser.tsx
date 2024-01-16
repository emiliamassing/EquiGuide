import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addUserToLocalStorage, loginUser } from "../../services/userService";

export function LoginUser() {
    const navigate = useNavigate();
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');

    function directToLogin() {
        navigate('/login');
    }

    function handleEmailChange(e: ChangeEvent<HTMLInputElement>) {
        setEmailInput(e.target.value);
    }

    function handlePasswordChange(e: ChangeEvent<HTMLInputElement>) {
        setPasswordInput(e.target.value);
    }

    async function tryToLoginUser(e: FormEvent) {
        e.preventDefault();

        const userData = await loginUser({
            email: emailInput, 
            password: passwordInput
        });

        addUserToLocalStorage(userData.user, userData.token);
        navigate('/home');
    }

    return(
        <>
            <h1>Logga in</h1>
            <form onSubmit={tryToLoginUser}>
                <input type="text" placeholder="E-Mail" onChange={handleEmailChange}></input>
                <input type="password" placeholder="Lösenord" onChange={handlePasswordChange}></input>

                <div className="loginButtonContainer">
                <button className="secondaryButton" onClick={directToLogin}>Tillbaka</button>
                <button className="primaryButton">Logga in</button>
            </div>
            </form>
        </>
    );
}