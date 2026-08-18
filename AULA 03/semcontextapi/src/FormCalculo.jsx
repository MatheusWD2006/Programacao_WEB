import { useState } from "react";

function FormCalculo({defineMedia}) {

    const [nota1, setNota1] = useState(null);
    const [nota2, setNota2] = useState(null);

    return (
        <div>
            <div>
                <label>Nota 1:</label>
                <input value={nota1}
                    onChange={
                        e =>setNota1( e.target.value )
                    }
                /><br />
                <label>Nota 2:</label>
                <input value={nota2}
                    onChange={
                        e =>setNota2( e.target.value )
                    }
                /><br />
                <button onClick={() => defineMedia((Number(nota1)+Number(nota2)) / 2)}>Calcular a média</button>
            </div>            
        </div>
    )

}

export default FormCalculo;