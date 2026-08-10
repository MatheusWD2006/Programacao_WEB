function CalculaIMC(peso, altura) {
    if (altura <= 0) {
        throw new Error("A altura deve ser maior que zero.");
    }
    if (peso <= 0) {
        throw new Error("O peso deve ser maior que zero.");
    }
    const imc = peso / (altura * altura);
    return imc;
}

export default CalculaIMC;