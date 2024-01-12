import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterHorse } from "./RegisterHorse";
import { createUser } from "../../services/userService";

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
        } else {
            console.log("Passwords doesn't match");
        }
    }

    return(
        <>
            <h1>Register user</h1>
            <form onSubmit={tryToRegisterUser}>
                <input type="text" placeholder="First name" onChange={handleFirstNameChange} required></input>
                <input type="text" placeholder="Last name" onChange={handleLastNameChange} required></input>
                <input type="text" placeholder="E-Mail" onChange={handleEmailChange} required></input>
                <input type="password" placeholder="Password" onChange={handlePasswordChange} required></input>
                <input type="password" placeholder="Confirm password" onChange={handlePasswordConfirmationChange} required></input>

                <div className="loginButtonContainer">
                <button className="secondaryButton" onClick={directToLogin}>Go back</button>
                <button className="primaryButton">Register</button>
                </div>
            </form>            
        </>
    );
}