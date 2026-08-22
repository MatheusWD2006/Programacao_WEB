import { useContext } from "react";
import AppContext from "./AppContext";

function TelaHoras() {
  const { horasSemana, setHorasSemana, valorHora, setValorHora, setTela } = useContext(AppContext);

  return (
    <div>
      <h3>Dados de Trabalho</h3>
      <label>Horas trabalhadas por semana:</label>
      <input 
        type="number"
        value={horasSemana} 
        onChange={(e) => setHorasSemana(e.target.value)} 
      /><br />

      <label>Valor por hora:</label>
      <input 
        type="number"
        value={valorHora} 
        onChange={(e) => setValorHora(e.target.value)} 
      /><br />

      <button onClick={() => setTela(4)}>Concluir</button>
    </div>
  );
}

export default TelaHoras;