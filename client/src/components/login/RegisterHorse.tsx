import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function RegisterHorse() {
    const navigate = useNavigate();
    const [nameInput, setNameInput] = useState('');
    const [breedInput, setBreedInput] = useState('');
    const [ageInput, setAgeInput] = useState(0);

    function directToUserVerification() {
        navigate('/login/userVerification');
    }

    return(
        <>
            <h1>Lägg till häst</h1>
            <span className="infoText">Du kan lägga till flera hästar senare</span>
            <form className="registerHorseForm">
            <div className="inputDivider">
                <div className="inputContainer">
                    <span className="material-symbols-outlined inputSymbol">border_color</span>
                    <input type="text" placeholder="Namn" required></input>
                </div>
                <div className="inputContainer">
                    <span className="material-symbols-outlined inputSymbol">question_mark</span>
                    <input type="text" placeholder="Ras" required></input>
                </div>
                <div className="inputContainer">
                    <span className="material-symbols-outlined inputSymbol">cake</span>
                    <input type="number" placeholder="Ålder" required></input>
                </div>
                <div className="inputContainer">
                    <span className="material-symbols-outlined inputSymbol">male</span>
                    <input type="text" placeholder="Kön" required></input>
                </div>
            </div>
            <div className="inputContainer">
                <span className="material-symbols-outlined inputSymbol">trophy</span>
                <input type="text" placeholder="Inriktning" required></input>
            </div>
            <div className="loginButtonContainer">
                <button className="secondaryButton" onClick={directToUserVerification}>Tillbaka</button>
                <button className="primaryButton">Lägg till</button>
            </div>
            </form>
        </>
    );
}