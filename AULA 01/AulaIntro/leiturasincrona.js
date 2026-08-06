const fs = require('fs');

let arquivo = "livros.txt";

const livros = [{nome: "CSS3", ano : 2020},
     {nome: "HTML5", ano : 2022},
    {nome: "REACT", ano : 2024},
     {nome: "NEXTJS", ano : 2025} ];

fs.writeFileSync(arquivo, JSON.stringify(livros))

let dadosArquivo = fs.readFileSync(arquivo).toString('UTF-8');
console.log(dadosArquivo);
let dadosJSON = JSON.parse(dadosArquivo);
console.log(dadosJSON);
