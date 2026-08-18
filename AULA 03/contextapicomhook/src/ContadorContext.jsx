import { createContext, useState } from 'react';

// 1 - exportando o  context
export const ContadorContext = createContext();

// 2 - Criando o provider como um componente
export const ContadorContextProvider = ({ children }) => {
    const [contador, setContador] = useState(0);

    return (        
        <ContadorContext.Provider value={{ contador, setContador }}>
            {children}
        </ContadorContext.Provider>
    );
};

/* O Provider do ContadorContexto será compartilhado no arquivo index.js, 
para ficar disponível globalmente em toda a aplicação */