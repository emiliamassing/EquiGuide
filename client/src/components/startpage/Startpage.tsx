import { useNavigate } from "react-router-dom"

export function Startpage() {
    const navigate = useNavigate();

    function directToLogin() {
        navigate('/login');
    }

    return(
        <>
            <h1>Startpage</h1>
            <p>Välkommen till EquiGuide</p>
            <button className="primaryButton" onClick={directToLogin}>Kom igång</button>
        </>
    )
}