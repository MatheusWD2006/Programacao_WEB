const fs = require('fs');


const lerProdutos = async (arquivo) => {

    const dados = fs.readFileSync(arquivo);

    const produtos = JSON.parse(dados);

    produtos.forEach(produto => {
        console.log(
            `ID: ${produto.id} | ` +
            `Produto: ${produto.nome} | ` +
            `Preço: R$ ${produto.preco}`
        );
    });

    console.log("Outra forma: \n");
    console.log(JSON.stringify(produtos))
};


console.log("Leitura dos produtos");

lerProdutos("./produtos.txt");

const adicionarProduto =  (novoProduto, arquivo) => {

    const dados = fs.readFileSync(arquivo);

    const produtos = JSON.parse(dados);

    produtos.push(novoProduto);

    const novosDados = JSON.stringify(produtos, null, 4);

    fs.writeFileSync(arquivo, novosDados, (err) => {

        if (err) {
            console.log("Erro ao salvar o arquivo.");
        }
        else {
            console.log("Produto adicionado com sucesso!");
        }

    });
};



const novoProduto = {
    id: 4,
    nome: "Monitor",
    preco: 1200
};

adicionarProduto(novoProduto, "./produtos.txt");
lerProdutos("./produtos.txt")