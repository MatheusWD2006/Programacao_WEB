const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const ola = (request, response) => {
  response.status(200).json("Seja bem vindo ao express!");
}

const sobre = (request, response) => {
  response.status(200).json("API com express");
}

const pegadados = (request, response) => {
    const {nome, profissao} = request.body;
    response.status(200).json({nome: nome, profissao: profissao, mensagem: "Dados recebidos com sucesso!"});
}


app.route("/").get(ola).post(pegadados);
app.route("/sobre").get(sobre);


app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003");
});