import { useEffect, useState } from "react";
import AppContext from "./AppContext.jsx";
import TelaInicial from "./TelaInicial.jsx";
import TelaPessoa from "./TelaPessoa.jsx";
import TelaHoras from "./TelaHoras.jsx";
import TelaResultado from "./TelaResultado.jsx";

function App() {
  const [tela, setTela] = useState(1);

  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [horasSemana, setHorasSemana] = useState("");
  const [valorHora, setValorHora] = useState("");

  const [salarioBruto, setSalarioBruto] = useState(0);
  const [inss, setInss] = useState(0);
  const [salarioLiquido, setSalarioLiquido] = useState(0);

  const calculaINSS = (bruto) => {
    if (!bruto || bruto <= 0) return 0;
    let valorInss = 0;

    if (bruto <= 1621.00) {
      valorInss = bruto * 0.075;
    } else if (bruto <= 2902.84) {
      valorInss = (1621.00 * 0.075) + ((bruto - 1621.00) * 0.09);
    } else if (bruto <= 4354.27) {
      valorInss = (1621.00 * 0.075) + ((2902.84 - 1621.00) * 0.09) + ((bruto - 2902.84) * 0.12);
    } else if (bruto <= 8475.55) {
      valorInss = (1621.00 * 0.075) + ((2902.84 - 1621.00) * 0.09) + ((4354.27 - 2902.84) * 0.12) + ((bruto - 4354.27) * 0.14);
    } else {
      valorInss = (1621.00 * 0.075) + ((2902.84 - 1621.00) * 0.09) + ((4354.27 - 2902.84) * 0.12) + ((8475.55 - 4354.27) * 0.14) + ((bruto - 8475.55) * 0.14);
    }

    return valorInss;
  };

  useEffect(() => {
    const h = Number(horasSemana) || 0;
    const v = Number(valorHora) || 0;
    
    const bruto = h * v * 5;
    const descontoInss = calculaINSS(bruto);
    const liquido = bruto - descontoInss;

    setSalarioBruto(bruto);
    setInss(descontoInss);
    setSalarioLiquido(liquido);
  }, [horasSemana, valorHora]);

  return (
    <AppContext.Provider
      value={{
        tela,
        setTela,
        nome,
        setNome,
        telefone,
        setTelefone,
        horasSemana,
        setHorasSemana,
        valorHora,
        setValorHora,
        salarioBruto,
        inss,
        salarioLiquido
      }}
    >
      {tela === 1 && <TelaInicial />}
      {tela === 2 && <TelaPessoa />}
      {tela === 3 && <TelaHoras />}
      {tela === 4 && <TelaResultado />}
    </AppContext.Provider>
  );
}

export default App;