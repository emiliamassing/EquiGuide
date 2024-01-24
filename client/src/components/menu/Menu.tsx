import { NavLink } from "react-router-dom";

export function Menu() {
    return(
        <>
            <nav>
                <ul className="menuList">
                    <li>
                        <NavLink to={'/app/home'}>
                            <span className="material-symbols-outlined">home</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/app/calendar'}>
                            <span className="material-symbols-outlined">calendar_month</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/app/addRide'}>
                            <span className="material-symbols-outlined">add_circle</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/app/explore'}>
                            <span className="material-symbols-outlined">search</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/app/profile'}>
                            <span className="material-symbols-outlined">person</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </>
    )
}