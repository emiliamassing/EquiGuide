import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addUserToLocalStorage, createUser, loginUser } from "../../services/userService";
import { isAxiosError } from "../../services/serviceBase";
import { AxiosError } from "axios";

export function RegisterUser() {
    const navigate = useNavigate();
    const [firstNameInput, setFirstNameInput] = useState('');
    const [lastNameInput, setlastNameInput] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [confirmPasswordInput, setConfirmPasswordInput] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

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
                const userData = await createUser({
                    first_name: firstNameInput,
                    last_name: lastNameInput, 
                    email: emailInput,
                    password: passwordInput
                });
    
                console.log(userData);
                console.log('User created');
    
                const logInUserData = await loginUser({
                    email: emailInput,
                    password: passwordInput
                });

                setErrorMessage('');
    
                addUserToLocalStorage(logInUserData.user, logInUserData.token);
                navigate('/login/registerHorse');
            } catch(error: unknown) {
                if(isAxiosError(error)) {
                    const axiosError = error as AxiosError;

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
            <form onSubmit={tryToRegisterUser} className="registerForm">
                <div className="inputDivider">
                    <div className="inputContainer">
                        <span className="material-symbols-outlined inputSymbol">person</span>
                        <input type="text" placeholder="Förnamn" onChange={handleFirstNameChange} required></input>
                    </div>
                    <div className="inputContainer">
                        <span className="material-symbols-outlined inputSymbol">person</span>
                        <input type="text" placeholder="Efternamn" onChange={handleLastNameChange} required></input>
                    </div>
                </div>

                <div className="inputContainer">
                    <span className="material-symbols-outlined inputSymbol">mail</span>
                    <input type="text" placeholder="E-Mail" onChange={handleEmailChange} required></input>
                </div>
                <div className="inputContainer">
                    <span className="material-symbols-outlined inputSymbol">lock</span>
                    <input type="password" placeholder="Lösenord" onChange={handlePasswordChange} required></input>
                </div>
                <div className="inputContainer">
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