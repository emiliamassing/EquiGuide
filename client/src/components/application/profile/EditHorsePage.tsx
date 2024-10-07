import { useNavigate } from "react-router-dom";
import { disciplines } from "../../../models/disciplines";
import { capitalizeWords, isAxiosError } from "../../../services/serviceBase";
import { isAuthenticated } from "../../../services/tokenService";
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { editHorse } from "../../../services/horseService";
import { HorseContext } from "../../../contexts/HorseContext";
import { AxiosError } from "axios";
import { ShowVerification } from "../verification/ShowVerification";
import { AppHeading } from "../layouts/AppHeading";
import { NotAuthenticated } from "../../error/NotAuthenticated";

const allDisciplines = capitalizeWords(disciplines);

export function EditHorsePage() {
    const navigate = useNavigate();
    const { horseData } = useContext(HorseContext);
    const [nameInput, setNameInput] = useState(horseData[0].name);
    const [breedInput, setBreedInput] = useState(horseData[0].breed);
    const [ageInput, setAgeInput] = useState(horseData[0].age.toString());
    const [selectedGender, setSelectedGender] = useState(horseData[0].gender);
    const [selectedDiscipline, setSelectedDiscipline] = useState(horseData[0].discipline);
    const [dataCreated, setDataCreated] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

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

        const horseId = Number(horseData[0].id);

        try {
            const horseData = await editHorse({
                name: nameInput,
                breed: breedInput,
                age: ageInput,
                gender: selectedGender,
                discipline: selectedDiscipline,
            }, horseId);

            console.log("Horse edited", horseData);
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


    return(
        isAuthenticated() ? (
            <>
                {dataCreated ? 
                    <ShowVerification resetData={resetDataCreated} verificationMessage="Uppgifter ändrade" heading={horseData[0].name}></ShowVerification>
                    :
                    <div className="container">
                        <AppHeading title="Ändra uppgifter"></AppHeading>
                        <div className="innerContainer">
                            <div className="formFlexContainer">
                                <form onSubmit={tryToAddHorse}>
                                    <div className="inputDivider">
                                        <div className="inputContainer">
                                            <label htmlFor="name">Namn</label>
                                            <input type="text" name="name" value={nameInput} required onChange={handleNameInputChange}></input>
                                        </div>
                                        <div className="inputContainer">
                                            <label htmlFor="breed">Ras</label>
                                            <input type="text" name="breed" value={breedInput} required onChange={handleBreedInputChange}></input>
                                        </div>
                                        <div className="inputContainer">
                                            <label htmlFor="age">Ålder</label>
                                            <input type="number" name="age" value={ageInput} required onChange={handleAgeInputChange}></input>
                                        </div>
                                        <div className="inputContainer">
                                            <span>Kön</span>
                                            <select name="gender" value={selectedGender} onChange={handleSelectedGenderChange} required>
                                                <option value={horseData[0].gender} disabled hidden>Kön</option>
                                                <option value={"hingst"}>Hingst</option>
                                                <option value={"valack"}>Valack</option>
                                                <option value={"sto"}>Sto</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="inputContainer">
                                            <span>Inriktning</span>
                                            <select name="discipline" value={selectedDiscipline} onChange={handleSelectedDisciplineChange} required>
                                                <option value={horseData[0].discipline} disabled hidden>Inriktning</option>
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
                                        <button className="primaryButton">Ändra</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                }
            </>
        ) : (
            <NotAuthenticated></NotAuthenticated>
        )
    )
}