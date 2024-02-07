import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { capitalizeWords, isAxiosError } from "../../services/serviceBase";
import { AxiosError } from "axios";
import { addHorse } from "../../services/horseService";
import { disciplines } from "../../models/disciplines";
import { UserContext } from "../../contexts/UserContext";

const allDisciplines = capitalizeWords(disciplines);

export function RegisterHorse() {
    const navigate = useNavigate();
    const [nameInput, setNameInput] = useState('');
    const [breedInput, setBreedInput] = useState('');
    const [ageInput, setAgeInput] = useState('');
    const [selectedGender, setSelectedGender] = useState('');
    const [selectedDiscipline, setSelectedDiscipline] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const userData = useContext(UserContext);
    const user = userData.userData[0].user;

    function directToUserVerification() {
        navigate('/login/userVerification');
    }

    function handleNameInputChange(e: ChangeEvent<HTMLInputElement>) {
        setNameInput(e.target.value);
    }
    function handleBreedInputChange(e: ChangeEvent<HTMLInputElement>) {
        setBreedInput(e.target.value);
    }
    function handleAgeInputChange(e: ChangeEvent<HTMLInputElement>) {
        setAgeInput(e.target.value)
    }

    function handleSelectedGenderChange(e: ChangeEvent<HTMLSelectElement>) {
       setSelectedGender(e.target.value);
    }

    function handleSelectedDisciplineChange(e: ChangeEvent<HTMLSelectElement>) {
        setSelectedDiscipline(e.target.value);
    }

    async function tryToRegisterHorse(e: FormEvent) {
        e.preventDefault();

        try {
            const horseData = await addHorse({
                name: nameInput,
                breed: breedInput,
                age: ageInput,
                gender: selectedGender,
                discipline: selectedDiscipline,
                userId: user.id
            });

            console.log('Horse created', horseData);
            setErrorMessage('');
            
            navigate('/app/home');
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
        <>
            <h1>Lägg till häst</h1>
            <span className="infoText">Du kan lägga till flera hästar senare</span>
            <form className="registerHorseForm" onSubmit={tryToRegisterHorse}>
            <div className="inputDivider">
                <div className="loginInputContainer">
                    <span className="material-symbols-outlined inputSymbol">border_color</span>
                    <input type="text" name="name" placeholder="Namn" required onChange={handleNameInputChange}></input>
                </div>
                <div className="loginInputContainer">
                    <span className="material-symbols-outlined inputSymbol">border_color</span>
                    <input type="text" name="breed" placeholder="Ras" required onChange={handleBreedInputChange}></input>
                </div>
                <div className="loginInputContainer">
                    <span className="material-symbols-outlined inputSymbol">cake</span>
                    <input type="number" name="age" placeholder="Ålder" required onChange={handleAgeInputChange}></input>
                </div>
                <div className="loginInputContainer">
                    <span className="material-symbols-outlined inputSymbol">male</span>
                    <select name="gender" value={selectedGender} onChange={handleSelectedGenderChange} required>
                        <option value={""} disabled hidden>Kön</option>
                        <option value={"hingst"}>Hingst</option>
                        <option value={"valack"}>Valack</option>
                        <option value={"sto"}>Sto</option>
                    </select>
                </div>
            </div>
            <div className="loginInputContainer">
                    <span className="material-symbols-outlined inputSymbol">trophy</span>
                    <select name="discipline" value={selectedDiscipline} onChange={handleSelectedDisciplineChange} required>
                        <option value={""} disabled hidden>Inriktning</option>
                        {
                            allDisciplines.map(discipline => (
                                <option value={discipline} key={discipline}>{discipline}</option>
                            ))
                        }
                    </select>
                </div>
            <span className="errorMessage">{errorMessage}</span>
            <div className="loginButtonContainer">
                <button className="secondaryButton" onClick={directToUserVerification}>Tillbaka</button>
                <button className="primaryButton">Lägg till</button>
            </div>
            </form>
        </>
    );
}