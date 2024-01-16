import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";

export function LoginLayout() {
    return(
        <>
            <main>
                <div className="headerImage"></div>
                <div className="loginPageContainer">
                    <section>
                        <Outlet></Outlet>
                    </section>
                </div>
            </main>
            <footer>
                <Footer></Footer>
            </footer>
        </>
    )
}