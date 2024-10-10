import { Outlet } from "react-router-dom";

export function LoginLayout() {
    return(
        <>
            <main className="loginMain">
                <div className="headerImage"></div>
                <section className="login">
                    <Outlet></Outlet>
                </section>
            </main>
        </>
    )
}