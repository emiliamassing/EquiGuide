import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { AppHeading } from "../layouts/AppHeading";
import { RideContext } from "../../../contexts/RideContext";
import { isAuthenticated } from "../../../services/tokenService";
import { NotAuthenticated } from "../../error/NotAuthenticated";
import { useGetRidesById } from "../../../hooks/useGetRidesById";
import { capitalizeWords, isAxiosError } from "../../../services/serviceBase";
import { disciplines } from "../../../models/disciplines";
import { Editor } from "@tinymce/tinymce-react";
import { useNavigate } from "react-router-dom";
import { editRide } from "../../../services/rideService";
import { AxiosError } from "axios";
import { ShowVerification } from "../verification/ShowVerification";

const allDisciplines = capitalizeWords(disciplines);

export function EditorPage() {
    const { rideData } = useContext(RideContext);
    const [titleInput, setTitleInput] = useState(rideData[0].title);
    const [dateInput, setDateInput] = useState(new Date(rideData[0].date).toLocaleDateString());
    const [selectedDiscipline, setSelectedDiscipline] = useState(rideData[0].discipline);
    const [rating, setRating] = useState(0);
    const [notes, setNotes] = useState('');
    const [dataCreated, setDataCreated] = useState(false);
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
    
    async function tryToEditRide(e: FormEvent) {
        e.preventDefault();

        const rideId = rideData[0].id;
        
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
                    <ShowVerification resetData={resetDataCreated} verificationMessage="Ridpass utvärderat"></ShowVerification>
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
                                        <input type="date" name="date" required onChange={handleDateInputChange} value={new Date(rideData[0].date).toLocaleDateString()}></input>
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
                                                    onClick={() => handleStarClick(star)} // Set rating on star click
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
                                                }}
                                            />
                                        }
                                    </div>
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