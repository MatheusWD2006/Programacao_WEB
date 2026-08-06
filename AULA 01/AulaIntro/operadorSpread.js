const livros1 = ["CSS3", "REACT", "NODE"];
const livros2 = ["JAVA", "JAVASCRIPT", "PHP"];
console.log(livros1);
console.log(livros2);
//let livros = livros1 + livros2;
let livros = [...livros1,...livros2];
console.log(livros);

const precos = [70, 90, 120, 150, 230];
let precoMaior = Math.max(...precos);
console.log(precoMaior);

let objeto = {id: 1, nome: 'Jéssica', funcao: 'professora'};
console.log(objeto);
objeto.nome = "Jéssica D.";
console.log(objeto);

let objetoAlterado = {...objeto, nome : "Jéssica Di Domênico"};
console.log(objetoAlterado);