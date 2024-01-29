import { Outlet } from "react-router-dom";
import { Menu } from "../menu/Menu";

export function AppLayout() {
    return(
        <>
            <Menu></Menu>
            <main className="app">
                <section>
                    <Outlet></Outlet>
                </section>
            </main>
        </>
    )
}