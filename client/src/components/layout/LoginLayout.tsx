import { Outlet } from "react-router-dom";

export function LoginLayout() {
    return(
        <>
            <main>
                <div className="headerImage"></div>
                <section className="login">
                    <Outlet></Outlet>
                </section>
            </main>
        </>
    )
}