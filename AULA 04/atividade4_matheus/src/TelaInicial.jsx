import { useContext } from "react";
import AppContext from "./AppContext";

function TelaInicial() {
  const { setTela } = useContext(AppContext);

  return (
    <div>
      <h2>Cálculo Salarial com ICMS</h2>
      <button onClick={() => setTela(2)}>Iniciar</button>
    </div>
  );
}

export default TelaInicial;