import { useContext } from "react";
import AppContext from "./AppContext";

function TelaResultado() {
  const { nome, telefone, salarioBruto, inss, salarioLiquido, setTela } = useContext(AppContext);

  return (
    <div>
      <h3>**Cálculo**</h3>
      <p><strong>Nome:</strong> {nome}</p>
      <p><strong>Telefone:</strong> {telefone}</p>
      <p><strong>Salário Bruto:</strong> R$ {(salarioBruto || 0).toFixed(2)}</p>
      <p><strong>Valor pago de INSS:</strong> R$ {(inss || 0).toFixed(2)}</p>
      <p><strong>Salário Líquido:</strong> R$ {(salarioLiquido || 0).toFixed(2)}</p>

      <button onClick={() => setTela(1)}>Voltar ao Início</button>
    </div>
  );
}

export default TelaResultado;