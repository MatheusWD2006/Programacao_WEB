import React, { useState } from "react";
import calculaIMC from "./calcula_imc";

function TelaIMC() {
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState("");

  function tratarCalculo() {
    setErro("");
    setResultado(null);

    const pesoNum = parseFloat(peso);
    const alturaNum = parseFloat(altura);

    if (!pesoNum || !alturaNum) {
      setErro("Preencha peso e altura corretamente.");
      return;
    }

    const res = calculaIMC(pesoNum, alturaNum);

    if (res.erro) {
      setErro(res.erro);
    } else {
      setResultado(res);
    }
  }

  const isVermelho =
    resultado &&
    (resultado.classificacao === "SOBREPESO" ||
      resultado.classificacao === "OBESIDADE" ||
      resultado.classificacao === "OBESIDADE GRAVE");

  return (
    <div>
      <h1>Calculadora de IMC</h1>

      <div>
        <label>Peso (KG): </label>
        <input
          type="number"
          value={peso}
          onChange={(e) => setPeso(e.target.value)}
        />
      </div>

      <div>
        <label>Altura (m): </label>
        <input
          type="number"
          value={altura}
          onChange={(e) => setAltura(e.target.value)}
        />
      </div>

      <button onClick={tratarCalculo}>Calcular</button>

      {erro && <p style={{ color: "red" }}>{erro}</p>}

      {resultado && (
        <div>
          <p>IMC: {resultado.imc.toFixed(2)}</p>
          <p style={{ color: isVermelho ? "red" : "blue" }}>
            Classificação: {resultado.classificacao}
          </p>
        </div>
      )}
    </div>
  );
}

export default TelaIMC;