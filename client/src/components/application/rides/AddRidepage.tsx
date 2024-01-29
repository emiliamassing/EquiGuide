import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../../services/tokenService";
import { NotAuthenticated } from "../../error/NotAuthenticated";
import { disciplines } from "../../../models/disciplines";
import { capitalizeWords } from "../../../services/serviceBase";
import { SvgLogo } from "../../svg/SvgLogo";

const allDisciplines = capitalizeWords(disciplines);

export function AddRidePage() {
    const navigate = useNavigate();

    function navigateToHome() {
        navigate('/app/home');
    }

    return(
        isAuthenticated() ? (
            <>
                <div className="container">
                    <div className="headingContainer">
                        <SvgLogo height={50} width={50} outline="5A9378" fill="161414"></SvgLogo>
                        <h1>Planera ridpass</h1>
                    </div>
                    <div className="divider"></div>
                    <form>
                        <div className="inputContainer">
                            <label htmlFor="title">Titel</label>
                            <input type="text" name="title" placeholder="Titel" required></input>
                        </div>
                        <div className="inputContainer">
                            <label htmlFor="date">Välj datum</label>
                            <input type="date" name="date" required></input>
                        </div>
                        <div className="inputContainer">
                        <span>Välj häst</span>
                        <select>
                            <option value={""} hidden disabled>Välj häst</option>
                        </select>
                        </div>
                        <div className="inputContainer">
                            <span>Inriktning</span>
                            <select>
                                <option value={""} hidden disabled>Inriktning</option>
                                {
                                    allDisciplines.map(discipline => (
                                        <option value={discipline}>{discipline}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </form>
                    <div className="formButtonContainer">
                        <button className="secondaryButton" onClick={navigateToHome}>Avbryt</button>
                        <button className="primaryButton">Skapa pass</button>
                    </div>
                </div>
            </>
        ):(
            <NotAuthenticated></NotAuthenticated>
        )
    );
}