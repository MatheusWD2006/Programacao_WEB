function calculaIMC(peso, altura) {
  if (altura <= 0 || peso <= 0) {
    return { erro: "O peso e a altura devem ser maiores que zero." };
  }

  const imc = peso / (altura * altura);
  let classificacao = "";

  if (imc < 18.5) {
    classificacao = "MAGREZA";
  } else if (imc <= 24.9) {
    classificacao = "NORMAL";
  } else if (imc <= 29.9) {
    classificacao = "SOBREPESO";
  } else if (imc <= 39.9) {
    classificacao = "OBESIDADE";
  } else {
    classificacao = "OBESIDADE GRAVE";
  }

  return { imc: imc, classificacao: classificacao };
}

export default calculaIMC;