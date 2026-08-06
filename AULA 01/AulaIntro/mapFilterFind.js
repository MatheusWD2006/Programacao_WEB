const livros = [{nome: "CSS3", ano : 2020},
                {nome: "HTML5", ano : 2022},
                {nome: "REACT", ano : 2024},
                {nome: "NEXTJS", ano : 2025} ];

livros.map((livro) => {
    console.log("Livro: " + livro.nome + " Ano: " + livro.ano)
})

livros.map((livro, index) => {
    console.log("Indice: " + index + " Livro: " + livro.nome + " Ano: " + livro.ano);
})

const livrosFiltrados = livros.filter((livro) => livro.ano> 2022)
console.log(livrosFiltrados)

let objeto = livros.find((livro) =>  livro.nome === "REACT");
console.log(objeto);