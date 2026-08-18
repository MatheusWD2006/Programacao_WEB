import { useEffect, useState } from "react";
// importando o contexto para ser possível usá-lo neste componente
import AppContext from "./AppContext";
import Exibe from "./Exibe";
import Calculo from "./Calculo";

function App() {

  /* Usando Contexto API é possível centralizar todas as funções e estados em um componente principal */
  const [media, setMedia] = useState(-1);
  const [color, setColor] = useState("white");
  const [nota1, setNota1] = useState(null);
  const [nota2, setNota2] = useState(null);

  const calculaMedia = () => {    
    setMedia((Number(nota1)+Number(nota2)) / 2);
       
  }

  /* aqui usamos o useEffect para quer após a média ser calculada
  o valor da cor seja atualizado e renderizado na tela   */
  useEffect(() => {
    setColor(media >= 6 ? "blue" : "red");  
  },[media]);	    



  return (
    /* No AppContext Provider colocaremos todos os estados e funções que desejamos usar nos filhos 
    que serão chamados dentro dentro do escopo do elemento abaixo.
      Depois nos componentes filhos pode-se pegar do contexto qualquer um destes estados ou funções. 
    
    */
    <AppContext.Provider value={{ media, color, nota1, setNota1, nota2, setNota2, calculaMedia }}>
        <Exibe/>
        <Calculo/>
    </AppContext.Provider>
  );
}

export default App;