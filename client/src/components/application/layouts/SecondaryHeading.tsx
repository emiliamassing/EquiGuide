interface ISecondHeadingProps {
    title: string;
}

export function SecondaryHeading({ title }: ISecondHeadingProps) {
    return(
        <>
            <div className="headingContainer">
                <h2>{title}</h2>
            </div>
            <div className="divider"></div>
        </>
    )
}