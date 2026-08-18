import { useContext } from "react";
import { ContadorContext } from "./ContadorContext";

/* Com o uso deste hook personalizado não precisamos usar mais o useContext nos filhos */

export const useContadorContext = () => {
    const context = useContext(ContadorContext);

    if (!context) {
        console.log('Contexto não encontrado');
    }

    return context;
};