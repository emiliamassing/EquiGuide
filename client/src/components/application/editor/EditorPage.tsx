import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { AppHeading } from "../layouts/AppHeading";
import { RideContext } from "../../../contexts/RideContext";
import { isAuthenticated } from "../../../services/tokenService";
import { NotAuthenticated } from "../../error/NotAuthenticated";
import { capitalizeWords, isAxiosError } from "../../../services/serviceBase";
import { disciplines } from "../../../models/disciplines";
import { Editor } from "@tinymce/tinymce-react";
import { useNavigate } from "react-router-dom";
import { editRide } from "../../../services/rideService";
import { AxiosError } from "axios";
import { ShowVerification } from "../verification/ShowVerification";
import { ShowLoader } from "../../loader/ShowLoader";

const allDisciplines = capitalizeWords(disciplines);

export function EditorPage() {
    const { rideData } = useContext(RideContext);
    const [titleInput, setTitleInput] = useState(rideData[0].title);
    const [dateInput, setDateInput] = useState(formatDateForInput(rideData[0].date));
    const [selectedDiscipline, setSelectedDiscipline] = useState(rideData[0].discipline);
    const [rating, setRating] = useState(rideData[0].rating);
    const [notes, setNotes] = useState(rideData[0].notes);
    const [dataCreated, setDataCreated] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    function resetDataCreated() {
        setDataCreated(false);
    }

    function handleTitleInputChange(e: ChangeEvent<HTMLInputElement>) {
        setTitleInput(e.target.value);
    }

    function handleDateInputChange(e: ChangeEvent<HTMLInputElement>) {
        setDateInput(e.target.value);
    }

    function handleSelectedDisciplineChange(e: ChangeEvent<HTMLSelectElement>) {
        setSelectedDiscipline(e.target.value);
    }

    function handleStarClick(value: number ) {
        setRating(value);
    }

    function handleEditorChange(content: string) {
        setNotes(content);
    }

    /*
        Following function are used to ensure the date fetched from database is the same format as a new chosen date.
        This prevents form from getting submitted if date hasn't been changed.
    */
    function formatDateForInput(date: string | Date): string {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');  // Months are zero-based, so add 1
        const day = String(d.getDate()).padStart(2, '0'); // Pad day with a leading zero if necessary
    
        return `${year}-${month}-${day}`;
    }
    
    
    async function tryToEditRide(e: FormEvent) {
        e.preventDefault();

        const rideId = rideData[0].id;
        const formattedRideDate = formatDateForInput(rideData[0].date);

        const hasDataChanged =
            titleInput !== rideData[0].title ||
            dateInput !== formattedRideDate ||  // Compare formatted date with input date
            selectedDiscipline !== rideData[0].discipline || 
            rating !== rideData[0].rating ||
            notes !== rideData[0].notes;
    
        if (!hasDataChanged) {
            setErrorMessage('Ingen ändring gjord');
            return;
        }
        
        try {
            const editedData = await editRide({
                id: rideId,
                title: titleInput,
                date: dateInput,
                discipline: selectedDiscipline,
                rating: rating,
                notes: notes,
            }, rideId);

            console.log('Edited ride:', editedData);
            setDataCreated(true);
        }  catch (error: unknown) {
            if (isAxiosError(error)) {
                const axiosError = error as AxiosError;
    
                if (axiosError.response?.status === 500) {
                    console.log('Something went wrong');
                }
            }
        }
    }

    function directToHome() {
       navigate('/app/home');
    }

    return (
        isAuthenticated() ? (
            <>
                {dataCreated ?
                    <ShowVerification resetData={resetDataCreated} verificationMessage="Ridpass utvärderat" heading="Utvärdera ridpass"></ShowVerification>
                    :
                    <div className="container">
                        <AppHeading title="Utvärdera ridpass"></AppHeading>
                        <div className="innerContainer">
                            <div className="formFlexContainer">
                                <form onSubmit={tryToEditRide}>
                                    <div className="inputContainer">
                                        <label htmlFor="title">Titel</label>
                                        <input type="text" name="title" value={rideData[0].title} required onChange={handleTitleInputChange}></input>
                                    </div>
                                    <div className="inputContainer">
                                        <label htmlFor="date">Välj datum</label>
                                        <input type="date" name="date" required onChange={handleDateInputChange} value={dateInput}></input>
                                    </div>
                                    <div className="inputContainer">
                                        <span>Välj häst</span>
                                        <select disabled>
                                            <option value={rideData[0].horse_name}>{rideData[0].horse_name}</option>
                                        </select>
                                    </div>
                                    <div className="inputContainer">
                                        <span>Inriktning</span>
                                        <select required onChange={handleSelectedDisciplineChange}>
                                            <option value={rideData[0].discipline} hidden>{rideData[0].discipline}</option>
                                            {
                                                allDisciplines.map(discipline => (
                                                    <option value={discipline} key={discipline}>{discipline}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className="inputContainer">
                                        <span>Känsla</span>
                                        <div className="starRating">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <span
                                                    key={star}
                                                    className={`material-symbols-outlined star ${rating >= star ? 'filled' : ''}`}
                                                    onClick={() => handleStarClick(star)}  // Set rating on star click
                                                >
                                                    star
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="mceContainer">
                                        <span>Egna anteckningar</span>
                                        {
                                            <Editor 
                                                apiKey='iy5bvilu7ilzw9hu3vysmdbj7wufisn2soy5c9l1o2ybkw4s'
                                                value={notes}
                                                onEditorChange={handleEditorChange}
                                                init={{
                                                    plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
                                                    toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
                                                    setup: (editor) => {
                                                        editor.on('init', () => {
                                                            setIsLoading(false);
                                                        });
                                                    },
                                                }}
                                            />
                                        }
                                    </div>
                                    <span>{errorMessage}</span>
                                    <div className="buttonContainer">
                                        <button className="secondaryButton" onClick={directToHome}>Avbryt</button>
                                        <button className="primaryButton">Spara</button>
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
    );
}