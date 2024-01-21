import { useNavigate } from "react-router-dom"

export function Startpage() {
    const navigate = useNavigate();

    function directToLogin() {
        navigate('/login');
    }

    return(
        <>
            <div className="startpageContainer">
                <h1>Välkommen</h1>
                <div className="textContainer">
                    <p>
                        Jag har länge varit en av dem som haft svårt att både planera och komma på kreativa aktiviteter tillsammans med mina fyrbenta vänner. 
                        Man vill så gärna ha varierad träning följt av något som är givande för både häst och ryttare. 
                        Men ändå slutar det så många gånger i att det blir samma repetetiva övningar.
                    </p>
                    <p>
                        Detta är anledningen till att idén för EquiGuide växte fram. 
                        Min vision är att skapa en webbapplikation som förhoppningsvis kan hjälpa ryttare med planering av sina ridpass eller träningar. 
                        EquiGuide kommer erbjuda både övningar och tips för att få en lite mer varierad vardag. 
                        Förhoppningsvis hittar du någon funktion som hjälper just dig!
                    </p>
                    <button className="primaryButton" onClick={directToLogin}>Kom igång</button>
                </div>
            </div>
        </>
    )
}