import { useNavigate } from "react-router-dom";

export function NotAuthenticated() {
    const navigate = useNavigate();

    function directToLogin() {
        navigate('/login');    
    }

    return(
        <>
            <div className="container">
                <div className="innerContainer">
                    <div className="errorContainer">
                        <h1>Du har inte tillstånd att besöka den här sidan</h1>
                        <p>Logga in eller skapa ett konto för att nå alla funktioner</p>
                        <button onClick={directToLogin} className="primaryButton">Inloggning</button>
                    </div>
                </div>
            </div>
         
        </>
    );
}