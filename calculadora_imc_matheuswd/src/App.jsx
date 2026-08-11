import React, { useState } from "react";
import calculaIMC from "./calcula_imc";
import TelaIMC from "./tela";

function App() {
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

  return (
    <div>
      <TelaIMC
        peso={peso}
        setPeso={setPeso}
        altura={altura}
        setAltura={setAltura}
        aoCalcular={tratarCalculo}
        resultado={resultado}
        erro={erro}
      />
    </div>
  );
}

export default App;
