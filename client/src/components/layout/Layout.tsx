import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";

export function Layout() {
    return(
        <>
            <main>
                <Outlet></Outlet>
            </main>
            <footer>
                <Footer></Footer>
            </footer>
        </>
    )
}