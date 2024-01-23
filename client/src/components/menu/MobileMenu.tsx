import { Link } from "react-router-dom";

export function MobileMenu() {
    return(
        <>
            <nav>
                <ul>
                    <li>
                        <Link to={'/app/home'}>
                            <span className="material-symbols-outlined">home</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={'/app/calendar'}>
                            <span className="material-symbols-outlined">calendar_month</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={'/app/addRide'}>
                            <span className="material-symbols-outlined">add_circle</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={'/app/explore'}>
                            <span className="material-symbols-outlined">search</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={'/app/profile'}>
                            <span className="material-symbols-outlined">person</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    )
}