import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { isAuthenticated } from "../../../services/tokenService";
import { NotAuthenticated } from "../../error/NotAuthenticated";
import { AppHeading } from "../layouts/AppHeading";
import { UserContext } from "../../../contexts/UserContext";
import { capitalizeWords, isAxiosError } from "../../../services/serviceBase";
import { disciplines } from "../../../models/disciplines";
import { useNavigate } from "react-router-dom";
import { ShowVerification } from "../verification/ShowVerification";
import { addHorse } from "../../../services/horseService";
import { AxiosError } from "axios";

const allDisciplines = capitalizeWords(disciplines);

export function AddHorsePage() {
    const navigate = useNavigate();
    const { userData } = useContext(UserContext);
    const [nameInput, setNameInput] = useState('');
    const [breedInput, setBreedInput] = useState('');
    const [ageInput, setAgeInput] = useState('');
    const [selectedGender, setSelectedGender] = useState('');
    const [selectedDiscipline, setSelectedDiscipline] = useState('');
    const [dataCreated, setDataCreated] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const user = userData[0].user;

    function directToProfile() {
        navigate('/app/profile');
    }

    function resetDataCreated() {
        setDataCreated(false);
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

    async function tryToAddHorse(e: FormEvent) {
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

            console.log("Horse added", horseData);
            setErrorMessage('');
            setDataCreated(true);
        } catch(error: unknown) {
            if(isAxiosError(error)) {
                const axiosError = error as AxiosError;

                if(axiosError && axiosError.response?.status === 500) {
                    setErrorMessage('Något gick fel, försök igen');
                }
            }
        }
    }

    return (
        isAuthenticated() ? (
            <>
                {dataCreated ? 
                    <ShowVerification resetData={resetDataCreated} verificationMessage="Häst tillagd" heading="Lägg till häst"></ShowVerification>
                    :
                    <div className="container">
                        <AppHeading title="Lägg till häst"></AppHeading>
                        <div className="innerContainer">
                            <form className="registerHorseForm" onSubmit={tryToAddHorse}>
                                <div className="inputDivider">
                                    <div className="inputContainer">
                                        <label htmlFor="name">Namn</label>
                                        <input type="text" name="name" placeholder="Namn" required onChange={handleNameInputChange}></input>
                                    </div>
                                    <div className="inputContainer">
                                        <label htmlFor="breed">Ras</label>
                                        <input type="text" name="breed" placeholder="Ras" required onChange={handleBreedInputChange}></input>
                                    </div>
                                    <div className="inputContainer">
                                        <label htmlFor="age">Ålder</label>
                                        <input type="number" name="age" placeholder="Ålder" required onChange={handleAgeInputChange}></input>
                                    </div>
                                    <div className="inputContainer">
                                        <span>Kön</span>
                                        <select name="gender" value={selectedGender} onChange={handleSelectedGenderChange} required>
                                            <option value={""} disabled hidden>Kön</option>
                                            <option value={"hingst"}>Hingst</option>
                                            <option value={"valack"}>Valack</option>
                                            <option value={"sto"}>Sto</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="inputContainer">
                                        <span>Inriktning</span>
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
                                <div className="formButtonContainer">
                                    <button className="secondaryButton" onClick={directToProfile}>Tillbaka</button>
                                    <button className="primaryButton">Lägg till</button>
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