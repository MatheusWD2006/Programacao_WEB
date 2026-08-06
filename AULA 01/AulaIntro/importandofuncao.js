const funcoes = require('./exportandofuncao')

funcoes.ola();
funcoes.saida("Usando a função importada");

const {ola, saida} = require('./exportandofuncao')
ola();
saida("Função desestruturada");