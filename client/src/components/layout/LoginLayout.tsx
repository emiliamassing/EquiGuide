import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";

export function LoginLayout() {
    return(
        <>
            <main>
                <div className="headerImage"></div>
                <section>
                    <Outlet></Outlet>
                </section>
            </main>
            <footer></footer>
        </>
    )
}