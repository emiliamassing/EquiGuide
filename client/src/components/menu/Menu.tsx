import { NavLink } from "react-router-dom";

export function Menu() {
    return(
        <>
            <nav>
                <ul className="menuList">
                    <li>
                        <NavLink to={'/app/home'}>
                            <span className="material-symbols-outlined">home</span>
                            <span className="navText">Hem</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/app/calendar'}>
                            <span className="material-symbols-outlined">calendar_month</span>
                            <span className="navText">Kalender</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/app/addRide'}>
                            <span className="material-symbols-outlined">add_circle</span>
                            <span className="navText">Planera ridpass</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/app/explore'}>
                            <span className="material-symbols-outlined">search</span>
                            <span className="navText">Utforska</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/app/profile'}>
                            <span className="material-symbols-outlined">person</span>
                            <span className="navText">Profil</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </>
    )
}