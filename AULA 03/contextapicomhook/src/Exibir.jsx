
import { useContadorContext } from "./useContadorContext";

const Exibir = () => {

    // capturando os estados do contexto com o uso do hook personalizado
    const { contador } = useContadorContext();
    
    return (
        <>
            <h1>{contador}</h1>
        </>
    )
}
export default Exibir;