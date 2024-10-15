import { useNavigate } from "react-router-dom"

export function Startpage() {
    const navigate = useNavigate();

    function directToLogin() {
        navigate('/login');
    }

    return(
        <>
            <div className="startpageWrapper"></div>
            <div className="startpageContainer">
                <div className="headingContainer">
                    <h1 className="startpageHeading">Gör varje stund med hästen värdefull</h1>
                    <p>
                        Med Equiguide får du verktygen att <span className="clarifyWord">planera</span>, <span className="clarifyWord">strukturera </span>
                        och anpassa dina ridpass för att nå dina mål, oavsett om du tränar för tävling eller rider för nöje. 
                        Skapa balans mellan hästens behov och dina ambitioner och gör varje ridstund <span className="clarifyWord">meningsfull</span>.
                    </p>
                </div>
                <div className="highlightContainer">
                    <div className="highlight">
                        <div className="highlightFlex">
                            <span className="material-symbols-outlined startIcon">speed</span>
                            <h2>Effektivitet</h2>
                        </div>
                        <p>
                            Jag har länge varit en av dem som haft svårt att både planera och komma på kreativa aktiviteter 
                            tillsammans med mina fyrbenta vänner. 
                            Med EquiGuide kan du enkelt effektivisera din hästvardag och hålla ordning på alla dina aktiviteter. 
                            Genom smarta verktyg för planering och uppföljning gör vi det lättare att optimera dina ridpass och träningar.
                            Slipp stress och tidskrävande planering – låt mig hjälpa dig att fokusera på det som verkligen betyder något.
                        </p>
                    </div>
                    <div className="highlight">
                        <div className="highlightFlex">
                            <span className="material-symbols-outlined startIcon">favorite</span>
                            <h2>Kvalitétstid</h2>
                        </div>
                        <p>
                            Man vill så gärna ha varierad träning följt av något som är givande för både häst och ryttare. 
                            Med min tjänst får du mer tid att njuta av stunderna med din häst. 
                            Genom att effektivisera din planering och organisering frigör du minuter och timmar som du kan spendera på ridpass, 
                            lek eller bara en lugn stund i stallet. 
                            Med EquiGuide kan du sluta känna att det alltid blir samma repetitiva övningar 
                            och istället skapa en djupare och mer meningsfull relation med din fyrbenta vän.
                        </p>
                    </div>
                    <div className="highlight">
                        <div className="highlightFlex">
                            <span className="material-symbols-outlined startIcon">calendar_today</span>
                            <h2>Planering</h2>
                        </div>
                        <p>
                            Ovanstående motiveringar är orsaken till att idén för EquiGuide växte fram. 
                            Min vision är att skapa en webbapplikation som förhoppningsvis kan hjälpa ryttare 
                            med planering av sina ridpass eller träningar. 
                            En strukturerad vardag är nyckeln till framgång inom ridsporten. 
                            Med EquiGuide får du en översikt över alla dina aktiviteter och träningar, 
                            vilket gör det enkelt att hålla reda på vad som behöver göras och när. 
                            EquiGuide kommer att erbjuda både övningar och tips för att få en lite mer varierad vardag. 
                            Förhoppningsvis hittar du någon funktion som hjälper just dig!
                        </p>
                    </div>
                    <button className="primaryButton" onClick={directToLogin}>Kom igång</button>
                </div>
            </div>
        </>
    )
}