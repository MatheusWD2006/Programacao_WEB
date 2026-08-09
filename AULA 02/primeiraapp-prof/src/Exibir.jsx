import { useState } from "react";


function Exibir() {
    const [mostrar, setMostrar] = useState(false);

    return (
        <>
            <h1>Exibição condicional no React</h1>

            {
                !mostrar &&
                <>
                    <h1>Quando o mostrar é false</h1>
                    <button onClick={() => setMostrar(true)}> Mostrar = true</button>

                </>
            }
            {
                mostrar &&
                <>
                    <h1> Quando o mostrar é true</h1>
                    <button onClick={() => setMostrar(false)}> Mostrar = false</button>
                </>
            }

        </>
    )
}

export default Exibir;