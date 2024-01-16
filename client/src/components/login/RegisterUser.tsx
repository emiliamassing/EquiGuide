import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addUserToLocalStorage, createUser, loginUser } from "../../services/userService";

export function RegisterUser() {
    const navigate = useNavigate();
    const [firstNameInput, setFirstNameInput] = useState('');
    const [lastNameInput, setlastNameInput] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [confirmPasswordInput, setConfirmPasswordInput] = useState('');

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
            console.log('Password match');

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

            addUserToLocalStorage(logInUserData.user, logInUserData.token);

        } else {
            console.log("Passwords doesn't match");
        }
    }

    return(
        <>
            <h1>Registrera</h1>
            <form onSubmit={tryToRegisterUser}>
                <input type="text" placeholder="Förnamn" onChange={handleFirstNameChange} required></input>
                <input type="text" placeholder="Efternamn" onChange={handleLastNameChange} required></input>
                <input type="text" placeholder="E-Mail" onChange={handleEmailChange} required></input>
                <input type="password" placeholder="Lösenord" onChange={handlePasswordChange} required></input>
                <input type="password" placeholder="Bekräfta lösenord" onChange={handlePasswordConfirmationChange} required></input>

                <div className="loginButtonContainer">
                <button className="secondaryButton" onClick={directToLogin}>Tillbaka</button>
                <button className="primaryButton">Registrera</button>
                </div>
            </form>            
        </>
    );
}