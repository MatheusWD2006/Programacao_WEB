import React from "react";

function TelaIMC(props) {
  
  const isVermelho =
    props.resultado &&
    (props.resultado.classificacao === "SOBREPESO" ||
      props.resultado.classificacao === "OBESIDADE" ||
      props.resultado.classificacao === "OBESIDADE GRAVE");

  return (
    <div>
      <h1>Calculadora de IMC</h1>

      <div>
        <label>Peso (KG): </label>
        <input
          type="number"
          value={props.peso}
          onChange={(e) => props.setPeso(e.target.value)}
        />
      </div>

      <div>
        <label>Altura (m): </label>
        <input
          type="number"
          value={props.altura}
          onChange={(e) => props.setAltura(e.target.value)}
        />
      </div>

      <button onClick={props.aoCalcular}>Calcular</button>

      {props.erro && <p style={{ color: "red" }}>{props.erro}</p>}

      {props.resultado && (
        <div>
          <p>IMC: {props.resultado.imc.toFixed(2)}</p>
          <p style={{ color: isVermelho ? "red" : "blue" }}>
            Classificação: {props.resultado.classificacao}
          </p>
        </div>
      )}
    </div>
  );
}

export default TelaIMC;