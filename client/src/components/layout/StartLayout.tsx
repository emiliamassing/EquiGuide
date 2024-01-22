import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { SvgHeader } from "../svg/SvgHeader";
import { SvgLogo } from "../svg/SvgLogo";

export function StartLayout() {
    return(
        <>
            <header>
                <SvgHeader></SvgHeader>
                <div className="logo">
                    <SvgLogo height={50} width={50} outline="0a3b2c79" fill="FBF9FA"></SvgLogo>
                    <span>EquiGuide</span>
                </div>
            </header>
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