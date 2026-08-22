import { useContext } from "react";
import AppContext from "./AppContext";

function TelaPessoa() {
  const { nome, setNome, telefone, setTelefone, setTela } = useContext(AppContext);

  return (
    <div>
      <h3>Dados Pessoais</h3>
      <label>Nome:</label>
      <input 
        type="text"
        value={nome} 
        onChange={(e) => setNome(e.target.value)} 
      /><br />

      <label>Telefone:</label>
      <input 
        type="text"
        value={telefone} 
        onChange={(e) => setTelefone(e.target.value.replace(/\D/g, ''))} 
      /><br />

      <button onClick={() => setTela(3)}>Avançar</button>
    </div>
  );
}

export default TelaPessoa;