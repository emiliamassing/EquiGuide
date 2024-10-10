import { ChangeEvent, FormEvent, useContext, useState } from "react"
import { UserContext } from "../../../contexts/UserContext"
import { isAuthenticated } from "../../../services/tokenService"
import { NotAuthenticated } from "../../error/NotAuthenticated";
import { AppHeading } from "../layouts/AppHeading";
import { useNavigate } from "react-router-dom";
import { AxiosError, isAxiosError } from "axios";
import { editUser, getUserById } from "../../../services/userService";
import { ShowVerification } from "../verification/ShowVerification";
import { ActionTypes } from "../../../types/ActionTypes";

export function EditUserPage() {
    const { userData, dispatch } = useContext(UserContext);
    const user = userData[0].user;
    const navigate = useNavigate();
    const [firstNameInput, setFirstNameInput] = useState(user.firstname);
    const [lastNameInput, setlastNameInput] = useState(user.lastname);
    const [emailInput, setEmailInput] = useState(user.email);
    const [passwordInput, setPasswordInput] = useState('');
    const [confirmPasswordInput, setConfirmPasswordInput] = useState('');
    const [dataUpdated, setDataUpdated] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    function directToProfile() {
        navigate('/app/profile');
    }

    function resetDataUpdated() {
        setDataUpdated(false);
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

    async function tryToEditUser(e: FormEvent) {
        e.preventDefault();
        const userId = userData[0].user.id;
    
        if (passwordInput && passwordInput !== confirmPasswordInput) {
            setErrorMessage('Lösenorden matchar inte');
            return;
        }

        const hasDataChanged =
        firstNameInput !== user.firstname ||
        lastNameInput !== user.lastname ||
        emailInput !== user.email ||
        (passwordInput && passwordInput !== '');

        if(!hasDataChanged) {
            setErrorMessage('Ingen ändring gjord');
            return;
        }
    
        try {
            const updatedData = await editUser({
                first_name: firstNameInput,
                last_name: lastNameInput,
                email: emailInput,
                password: passwordInput || undefined,
            }, userId);
    
            console.log('Användare redigerad', updatedData);
            setErrorMessage('');
            updateUserData();
            setDataUpdated(true);
        } catch (error: unknown) {
            if (isAxiosError(error)) {
                const axiosError = error as AxiosError;
                console.error('Error response:', axiosError.response);
    
                if (axiosError.response?.status === 400) {
                    setErrorMessage('Felaktig data medskickad, försök igen');
                } else if (axiosError.response?.status === 500) {
                    setErrorMessage('Något gick fel, försök igen');
                } else {
                    setErrorMessage('Ett okänt fel har inträffat, försök igen');
                }
            } else {
                setErrorMessage('Ett okänt fel har inträffat, försök igen');
            }
        }
    }
    
    async function updateUserData() { 
        const userId = userData[0].user.id;

        try{
            const updatedData = await getUserById(JSON.stringify(userId));

            dispatch({ type: ActionTypes.UPDATE_CONTEXT, 
                payload: JSON.stringify({
                    email: updatedData[0].email,
                    id: updatedData[0].id,
                    first_name: updatedData[0].first_name,
                    last_name: updatedData[0].last_name
                }) 
            });
        } catch(error: unknown) {
            if(isAxiosError(error)) {
                const axiosError = error as AxiosError;

                if(axiosError && axiosError.response?.status === 500) {
                    setErrorMessage('Något gick fel, försök igen');
                }
            }
        }
    }
    
    return(
        isAuthenticated() ? (
            <>
                {dataUpdated ? 
                    <ShowVerification resetData={resetDataUpdated} verificationMessage="Användaruppgifter redigerade" heading="Redigera profil"></ShowVerification>
                    :
                    <div className="container">
                        <AppHeading title="Redigera profil"></AppHeading>
                        <div className="innerContainer">
                            <form onSubmit={tryToEditUser}>
                                <div className="inputDivider">
                                    <div className="inputContainer">
                                        <span>Förnamn</span>
                                        <input type="text" name="firstName" placeholder="Förnamn" value={firstNameInput} onChange={handleFirstNameChange}></input>
                                    </div>
                                    <div className="inputContainer">
                                        <span>Efternamn</span>
                                        <input type="text" name="lastName" placeholder="Efternamn" value={lastNameInput} onChange={handleLastNameChange}></input>
                                    </div>
                                </div>
                                <div className="inputContainer">
                                    <span>E-mail</span>
                                    <input type="text" name="email" placeholder="E-Mail" value={emailInput} onChange={handleEmailChange}></input>
                                </div>
                                <div className="inputContainer">
                                    <span>Nytt lösenord</span>
                                    <input type="password" name="password" placeholder="Lösenord" autoComplete="off" onChange={handlePasswordChange}></input>
                                </div>
                                <div className="inputContainer">
                                    <span>Bekräfta nytt lösenord</span>
                                    <input type="password" name="verifyPassword" placeholder="Bekräfta lösenord" autoComplete="off" onChange={handlePasswordConfirmationChange}></input>
                                </div>
                                <span className="errorMessage">{errorMessage}</span>
                                <div className="buttonContainer">
                                    <button className="secondaryButton" onClick={directToProfile}>Tillbaka</button>
                                    <button className="primaryButton">Redigera</button>
                                </div>
                            </form>
                        </div>
                    </div>
                }
            </>
        ) : (
            <NotAuthenticated></NotAuthenticated>
        )
    )
}