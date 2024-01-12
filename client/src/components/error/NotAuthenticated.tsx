import { useNavigate } from "react-router-dom";

export function NotAuthenticated() {
    const navigate = useNavigate();

    function directToLogin() {
        navigate('/login');    
    }

    return(
        <>
            <h1>Du har inte tillstånd att besöka den här sidan</h1>
            <p>Logga in eller skapa ett konto för att nå alla funtioner</p>
            <button onClick={directToLogin} className="primaryButton">Till inloggning</button>
        </>
    );
}