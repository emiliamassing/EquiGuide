import { useNavigate } from "react-router-dom";
import { IHorseData } from "../../../models/IHorseData"
import { disciplines } from "../../../models/disciplines";
import { capitalizeWords, isAxiosError } from "../../../services/serviceBase";
import { SvgLogo } from "../../svg/SvgLogo"
import { ChangeEvent, FormEvent, useState } from "react";
import { AxiosError } from "axios";
import { userData } from "../../../services/userService";
import { addRide } from "../../../services/rideService";

interface IHorseProps {
    horseList: IHorseData[]
}

const allDisciplines = capitalizeWords(disciplines);

export function AddRideForm({horseList}: IHorseProps) {
    const navigate = useNavigate();
    const [titleInput, setTitleInput] = useState('');
    const [dateInput, setDateInput] = useState('');
    const [horseId, setSelectedHorseId] = useState('');
    const [selectedDiscipline, setSelectedDiscipline] = useState('');
    const userId = userData ? userData.id : null;
    const localHorses = localStorage.getItem('horses');

    function navigateToHome() {
        navigate('/app/home');
    }

    function handleTitleInputChange(e: ChangeEvent<HTMLInputElement>) {
        setTitleInput(e.target.value);
    }

    function handleDateInputChange(e: ChangeEvent<HTMLInputElement>) {
        setDateInput(e.target.value);
    }

    function handleSelectedHorseChange(e: ChangeEvent<HTMLSelectElement>) {
        const selectedHorseName = e.target.value;

        if(localHorses) {
            const parsedHorses: IHorseData[] = JSON.parse(localHorses);
            
            const selectedHorse = parsedHorses.find((horse) => horse.name === selectedHorseName);
            
            if(selectedHorse) {
                setSelectedHorseId(selectedHorse.id);
            }
        }
    }

    function handleSelectedDisciplineChange(e: ChangeEvent<HTMLSelectElement>) {
        setSelectedDiscipline(e.target.value);
    }

    async function tryToAddRide(e: FormEvent) {
        console.log('Skapa pass');
        e.preventDefault();

        try{
            const rideData = await addRide({
                title: titleInput,
                date: dateInput,
                discipline: selectedDiscipline,
                notes: "Nej",
                rating: "3",
                userId: userId,
                horseId: horseId
            })

            console.log('Ride added', rideData);
        } catch(error: unknown) {
            if(isAxiosError(error)) {
                const axiosError = error as AxiosError;

                if(axiosError && axiosError.response?.status === 500) {
                    console.log('Något gick fel'); 
                }
            }
        }
    }

    return(
        <>
            <div className="container">
                    <div className="headingContainer">
                        <SvgLogo height={50} width={50} outline="5A9378" fill="161414"></SvgLogo>
                        <h1>Planera ridpass</h1>
                    </div>
                    <div className="divider"></div>
                    <form onSubmit={tryToAddRide}>
                        <div className="inputContainer">
                            <label htmlFor="title">Titel</label>
                            <input type="text" name="title" placeholder="Titel" required onChange={handleTitleInputChange}></input>
                        </div>
                        <div className="inputContainer">
                            <label htmlFor="date">Välj datum</label>
                            <input type="date" name="date" required onChange={handleDateInputChange}></input>
                        </div>
                        <div className="inputContainer">
                        <span>Välj häst</span>
                            <select required onChange={handleSelectedHorseChange}>
                                <option value={""} hidden disabled>Välj häst</option>
                                {
                                    horseList.map((horse) => (
                                        <option value={horse.name} key={horse.name}>{horse.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="inputContainer">
                            <span>Inriktning</span>
                            <select required onChange={handleSelectedDisciplineChange}>
                                <option value={""} hidden disabled>Inriktning</option>
                                {
                                    allDisciplines.map(discipline => (
                                        <option value={discipline} key={discipline}>{discipline}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="formButtonContainer">
                            <button className="secondaryButton" onClick={navigateToHome}>Avbryt</button>
                            <button className="primaryButton">Skapa pass</button>
                        </div>
                    </form>
                </div>
        </>
    )
}