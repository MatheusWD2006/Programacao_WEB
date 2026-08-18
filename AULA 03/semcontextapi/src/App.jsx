import { useState } from "react";
import FormCalculo from "./FormCalculo";

function App() {

  const [media, setMedia] = useState(-1);
  const [color, setColor] = useState("white");

  const defineMedia = (valor) => {    
    setColor(valor >= 6 ? "blue" : "red")
    setMedia(valor)    
  }

  return (
    <div>
      {media >= 0 && 
        <h1 style={{backgroundColor : color}}>Média: {media}</h1>
      }
      {/* Sem usar context API é necessário o compartilhamento de funções com os filhos VIA Props */}
      <FormCalculo defineMedia={defineMedia}/>
    </div>
  );
}

export default App;