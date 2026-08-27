const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const ola = (request, response) => {
  response.status(200).json("Seja bem vindo ao express!");
};

const sobre = (request, response) => {
  response.status(200).json("API com express");
};

const pegadados = (request, response) => {
  const { nome, profissao } = request.body;
  response
    .status(200)
    .json({
      nome: nome,
      profissao: profissao,
      mensagem: "Dados recebidos com sucesso!",
    });
};

let listaLivros = [
  { nome: "O Senhor dos Anéis", editora: "HarperCollins", ano: 1954 },
  { nome: "1984", editora: "Secker and Warburg", ano: 1949 },
  { nome: "O Pequeno Príncipe", editora: "Éditions Gallimard", ano: 1943 },
];

const getLivros = (request, response) => {
  response.status(200).json(listaLivros);
};

const addLivro = (request, response) => {
  const { nome, editora, ano } = request.body;

  if (!nome || !editora || !ano) {
    return response.status(500).json({ mensagem: "Todos os campos são obrigatórios!" });
  } else {
    listaLivros.push({ nome: nome, editora: editora, ano: ano });
    response.status(200).json({ mensagem: "Livro adicionado com sucesso!" });
  }
};

const getLivroPorIndice = (request, response) => {
  const index = parseInt(request.params.index);
  const livro = listaLivros[index];
  if (!livro) {
    return response.status(404).json({ mensagem: "Livro não encontrado!" });
  } else {
    response.status(200).json(livro);
  }
}

const removeLivroPorIndice = (request, response) => {
  const index = parseInt(request.params.index);
  const livro = listaLivros[index];
  if (!livro) {
    return response.status(404).json({ mensagem: "Livro não encontrado!" });
  } else {
    listaLivros.splice(index, 1);
    response.status(200).json({ mensagem: "Livro removido com sucesso!" });
  }
}

app.route("/livros/:index").get(getLivroPorIndice).delete(removeLivroPorIndice);

app.route("/livros").get(getLivros).post(addLivro);

app.route("/").get(ola).post(pegadados);
app.route("/sobre").get(sobre);


app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003");
});
