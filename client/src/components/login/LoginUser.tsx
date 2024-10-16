import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addUserToLocalStorage, loginUser } from "../../services/userService";
import { AxiosError } from "axios";
import { isAxiosError } from "../../services/serviceBase";
import { UserContext } from "../../contexts/UserContext";
import { ActionTypes } from "../../types/ActionTypes";

export function LoginUser() {
    const navigate = useNavigate();
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { dispatch } = useContext(UserContext);

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
        try {
            const userData = await loginUser({
                email: emailInput, 
                password: passwordInput
            });

            setErrorMessage('');

            dispatch({ type: ActionTypes.LOGIN, payload: JSON.stringify(userData) });
            addUserToLocalStorage(userData.token);
            
            navigate('/app/home');
        } catch(error: unknown) {
            if(isAxiosError(error)) {
                const axiosError = error as AxiosError;
                setErrorMessage('Något gick fel, testa igen');

                if(axiosError.response && axiosError.response.status === 400) {
                    setErrorMessage('Felaktig email');
                } else if(axiosError.response && axiosError.response.status === 401) {
                    setErrorMessage('Felaktigt lösenord');
                }
            }
        }
    }

    return(
        <> 
            <h1>Logga in</h1>
            <form onSubmit={tryToLoginUser} className="loginForm">
                <div className="loginInputContainer">
                    <span className="material-symbols-outlined inputSymbol">mail</span>
                    <input type="text" name="email" placeholder="Email" autoComplete="on" onChange={handleEmailChange} required></input>
                </div>
                <div className="loginInputContainer">
                    <span className="material-symbols-outlined inputSymbol">lock</span>
                    <input type="password" name="password" placeholder="Lösenord" autoComplete="off" onChange={handlePasswordChange} required></input>
                </div>
                <span className="errorMessage">{errorMessage}</span>
                <div className="loginButtonContainer">
                    <button className="secondaryButton" onClick={directToLogin}>Tillbaka</button>
                    <button className="primaryButton">Logga in</button>
                </div>
            </form>
        </>
    );
}