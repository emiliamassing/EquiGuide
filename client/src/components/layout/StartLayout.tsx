import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { SvgLogo } from "../svg/SvgLogo";

export function StartLayout() {
    return(
        <>
            <header>
                <div className="logo">
                    <SvgLogo height={40} width={40} outline="0a3b2c79" fill="FBF9FA"></SvgLogo>
                    <span>EquiGuide</span>
                </div>
            </header>
            <main className="start">
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