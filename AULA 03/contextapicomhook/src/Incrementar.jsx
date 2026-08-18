import { useContadorContext } from "./useContadorContext";

const Incrementar = () => {
    
    const { contador, setContador } = useContadorContext();

    return (
        <>
            <button onClick={() => setContador(contador + 1)}>Incrementar</button>
        </>
    )
}

export default Incrementar;