import { Link } from "react-router-dom";

export function MobileMenu() {
    return(
        <>
            <nav>
                <ul>
                    <li>
                        <Link to={'/app/home'}>Hem</Link>
                    </li>
                    <li>
                        <Link to={'/app/calendar'}>Kalender</Link>
                    </li>
                    <li>
                        <Link to={'/app/addRide'}>Lägg till ridpass</Link>
                    </li>
                    <li>
                        <Link to={'/app/explore'}>Utforska</Link>
                    </li>
                    <li>
                        <Link to={'/app/profile'}>Profil</Link>
                    </li>
                </ul>
            </nav>
        </>
    )
}