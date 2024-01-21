import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";

export function StartLayout() {
    return(
        <>
            <main>
                <section className="start">
                    <Outlet></Outlet>
                </section>
            </main>
            <footer>
                <Footer></Footer>
            </footer>
        </>
    )
}