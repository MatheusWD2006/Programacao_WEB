import { useContext } from "react";
import AppContext from "./AppContext";

function Exibe() {

    // Aqui capturamos do contexto os estados que queremos usar
    const { media, color } = useContext(AppContext);

    return (
        <div>
            {media >= 0 &&
                <h1 style={{ backgroundColor: color }}>Média: {media}</h1>
            }
        </div>
    )

}

export default Exibe;