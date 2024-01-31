import { SvgLogo } from "../../svg/SvgLogo";

interface IAppHeadingProps {
    title: string;
}

export function AppHeading( {title}: IAppHeadingProps) {
    return(
        <>
            <div className="headingContainer">
                <SvgLogo height={50} width={50} outline="5A9378" fill="161414"></SvgLogo>
                <h1>{title}</h1>
            </div>
            <div className="divider"></div>
        </>
    );
}