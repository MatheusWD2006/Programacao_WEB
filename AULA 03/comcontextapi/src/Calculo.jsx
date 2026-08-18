import { useContext } from "react";
import AppContext from "./AppContext";

 function Calculo(){

    /* Aqui capturamos do contextos os estados e funções de desejamos utilizar */
    const { nota1, setNota1, nota2, setNota2, calculaMedia } = useContext(AppContext);

    return (
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
        <button onClick={() => calculaMedia()}>Calcular a média</button>
    </div>  
    )
 }

 export default Calculo;