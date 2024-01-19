import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";

export function AppLayout() {
    return(
        <>
            <nav>Menu</nav>
            <main>
                <section>
                    <Outlet></Outlet>
                </section>
            </main>
            <footer>
                <Footer></Footer>
            </footer>
        </>
    )
}