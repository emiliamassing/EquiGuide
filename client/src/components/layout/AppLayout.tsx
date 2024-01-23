import { Outlet } from "react-router-dom";
import { MobileMenu } from "../menu/MobileMenu";

export function AppLayout() {
    return(
        <>
            <MobileMenu></MobileMenu>
            <main>
                <section>
                    <Outlet></Outlet>
                </section>
            </main>
        </>
    )
}