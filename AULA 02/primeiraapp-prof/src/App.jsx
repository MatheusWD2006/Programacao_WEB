import { useState } from "react";
import Corpo from "./Corpo";
import Titulo from "./Titulo";
import Exibir from "./Exibir";
import Calculadora from "./Calculadora";

function App() {

  const [contador, setContador] = useState(0)

  const mensagemAlerta = (mensagem) => {
    alert(mensagem)
  }

  return (
    <div>
      <Exibir />
      <h1>Contador: {contador}</h1>
      <br />
      <button onClick={() => setContador(contador + 1)}>Incrementar contador</button>
      <button onClick={() => setContador(contador - 1)}>Decrementar contador</button>
      <Titulo texto="Texto que o componente vai receber por props" />
      <Corpo texto="Outro props" mensagemAlerta={mensagemAlerta} dados={['React', 'npm', 'JSX']} />
      <br /> <hr /> <br />
      <Calculadora />

    </div>
  )
}

export default App;