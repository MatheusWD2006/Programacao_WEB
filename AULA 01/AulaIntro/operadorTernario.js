let resultado = "";
let preco = 50;
if (preco < 50 ){
    resultado = "Barato";
} else {
    resultado = "Caro";
}
console.log(resultado);
// (condição) ? retorno se verdadeiro : retorno se falso
resultado = preco < 50 ? "Retorno Barato" : "Retorno Caro";
console.log(resultado);