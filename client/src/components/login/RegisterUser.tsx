import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addUserToLocalStorage, addUser, loginUser } from "../../services/userService";
import { isAxiosError } from "../../services/serviceBase";
import { AxiosError } from "axios";
import { ActionTypes } from "../../types/ActionTypes";
import { UserContext } from "../../contexts/UserContext";

export function RegisterUser() {
    const navigate = useNavigate();
    const [firstNameInput, setFirstNameInput] = useState('');
    const [lastNameInput, setlastNameInput] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [confirmPasswordInput, setConfirmPasswordInput] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { dispatch } = useContext(UserContext);

    function directToLogin() {
        navigate('/login');
    }

    function handleFirstNameChange(e: ChangeEvent<HTMLInputElement>) {
        setFirstNameInput(e.target.value);
    }

    function handleLastNameChange(e: ChangeEvent<HTMLInputElement>) {
        setlastNameInput(e.target.value);
    }

    function handleEmailChange(e: ChangeEvent<HTMLInputElement>) {
        setEmailInput(e.target.value);
    }

    function handlePasswordChange(e: ChangeEvent<HTMLInputElement>) {
        setPasswordInput(e.target.value);
    }

    function handlePasswordConfirmationChange(e: ChangeEvent<HTMLInputElement>) {
        setConfirmPasswordInput(e.target.value);
    }

    async function tryToRegisterUser(e: FormEvent) {
        e.preventDefault();
        
        if(passwordInput === confirmPasswordInput) {
            try {
                const userData = await addUser({
                    first_name: firstNameInput,
                    last_name: lastNameInput, 
                    email: emailInput,
                    password: passwordInput
                });

                console.log('User created', userData);
    
                const logInUserData = await loginUser({
                    email: emailInput,
                    password: passwordInput
                });

                setErrorMessage('');
    
                dispatch({ type: ActionTypes.LOGIN, payload: JSON.stringify(logInUserData) });
                addUserToLocalStorage(logInUserData.token);

                navigate('/login/userVerification');
            } catch(error: unknown) {
                if(isAxiosError(error)) {
                    const axiosError = error as AxiosError;
                    setErrorMessage('Något gick fel, testa igen');

                    if(axiosError && axiosError.response?.status === 400) {
                        setErrorMessage('Email-adressen är redan registrerad');
                    }
                }
            }
        } else {
            setErrorMessage('Lösenorden matchar inte');
        }
    }

    return(
        <>
            <h1>Registrera konto</h1>
            <form onSubmit={tryToRegisterUser} className="registerUserForm">
                <div className="inputDivider">
                    <div className="loginInputContainer">
                        <span className="material-symbols-outlined inputSymbol">person</span>
                        <input type="text" placeholder="Förnamn" onChange={handleFirstNameChange} required></input>
                    </div>
                    <div className="loginInputContainer">
                        <span className="material-symbols-outlined inputSymbol">person</span>
                        <input type="text" placeholder="Efternamn" onChange={handleLastNameChange} required></input>
                    </div>
                </div>
                <div className="loginInputContainer">
                    <span className="material-symbols-outlined inputSymbol">mail</span>
                    <input type="text" placeholder="E-Mail" onChange={handleEmailChange} required></input>
                </div>
                <div className="loginInputContainer">
                    <span className="material-symbols-outlined inputSymbol">lock</span>
                    <input type="password" placeholder="Lösenord" onChange={handlePasswordChange} required></input>
                </div>
                <div className="loginInputContainer">
                    <span className="material-symbols-outlined inputSymbol">check_circle</span>
                    <input type="password" placeholder="Bekräfta lösenord" onChange={handlePasswordConfirmationChange} required></input>
                </div>
                    <span className="errorMessage">{errorMessage}</span>
                <div className="loginButtonContainer">
                    <button className="secondaryButton" onClick={directToLogin}>Tillbaka</button>
                    <button className="primaryButton">Registrera</button>
                </div>
            </form>            
        </>
    );
}