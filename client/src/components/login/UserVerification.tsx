import { useNavigate } from "react-router-dom"

export function UserVerification() {
    const navigate = useNavigate();

    function directToRegisterHorse() {
        navigate('/login/registerHorse');
    }   

    return(
        <>
            <h1>Välkommen</h1>
            <div className="verificationContainer">
                <p>Du har nu skapat ett konto på EquiGuide!</p>
                <p>För att forsätta behöver du lägga till en häst, detta kan du göra genom att klicka på knappen nedan.</p>
                <p>Därefter har du allt du behöver för att kunna börja samla inspiration och komma igång med planeringen!</p>
                <button className="primaryButton" onClick={directToRegisterHorse}>Nästa</button>
            </div>
        </>
    )
}