# Criação de uma API com Express

Criação de uma API com **Express** que acessa um banco de dados, aplicando conceitos de **Clean Code**.

---

# Banco de Dados da API

## Criação do banco de dados

Criar um banco de dados chamado `eshoppw`.

## Criação das tabelas

Criar as tabelas do banco de dados com os comandos SQL abaixo:

```sql
CREATE TABLE categorias (
    codigo SERIAL NOT NULL PRIMARY KEY,
    nome VARCHAR(40) NOT NULL
);
```

```sql
CREATE TABLE produtos (
    codigo SERIAL NOT NULL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    descricao TEXT,
    quantidade_estoque INTEGER,
    CHECK (quantidade_estoque >= 0),
    ativo BOOLEAN NOT NULL,
    valor NUMERIC(12,2) NOT NULL,
    CHECK (valor >= 0),
    data_cadastro DATE NOT NULL,
    categoria INTEGER NOT NULL,
    FOREIGN KEY (categoria) REFERENCES categorias (codigo)
);
```

## Inserção de registros

Insira alguns registros nas tabelas com os comandos SQL abaixo:

### Categorias

```sql
INSERT INTO categorias (nome)
VALUES
    ('Eletrônicos'),
    ('Eletrodomésticos'),
    ('Informática');
```

### Produtos

```sql
INSERT INTO produtos (
    nome,
    descricao,
    quantidade_estoque,
    ativo,
    valor,
    data_cadastro,
    categoria
)
VALUES
    ('Mouse USB', 'Mouse USB', 20, true, 60.0, current_date, 1),
    ('Mouse Sem FIO', 'Mouse sem fio', 10, true, 120.0, current_date, 1),
    ('Teclado USB', 'Teclado USB', 30, true, 500.0, current_date, 1);
```

---

# Criação da API

## Criação do projeto

Crie uma pasta chamada:

```text
eshop_api
```

Entre na pasta usando o **VS Code** ou digite `code .` no console dentro da pasta para abrir o VS Code nela.

---

## Inicialização do projeto

Dentro do VS Code, acesse a opção **Terminal** e digite o comando abaixo para criar o arquivo `package.json`:

```bash
npm init -y
```

---

## Instalação das dependências

Após, digite os comandos abaixo no terminal para adicionar ao projeto as dependências necessárias:

```bash
npm i cors express pg
```

```bash
npm i -D nodemon
```

---

# Configuração do `package.json`

Para executar o projeto, será necessário adicionar dois comandos que irão executar o projeto:

* `start` — para executar em produção.
* `start:dev` — para executar enquanto o projeto estiver em desenvolvimento, utilizando a biblioteca `nodemon`.

Adicione no elemento `scripts` o seguinte conteúdo:

```javascript
"scripts": {
    "start": "node index.js",
    "start:dev": "nodemon index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
},
```

## Arquivo `package.json`

O código completo do arquivo `package.json` deve estar da seguinte maneira:

```json
{
    "name": "eshopapi",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
        "start": "node index.js",
        "start:dev": "nodemon index.js",
        "test": "echo \"Error: no test specified\" && exit 1"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "dependencies": {
        "cors": "^2.8.5",
        "express": "^4.19.2",
        "pg": "^8.12.0"
    },
    "devDependencies": {
        "nodemon": "^3.1.4"
    }
}
```

---

# Arquivo `config.js`

Crie o arquivo `config.js` na raiz do código fonte.

Ele contém as definições para conexão com o banco de dados localmente e na nuvem.

O arquivo deve ter o seguinte conteúdo:

**`/config.js`**

```javascript
const { Pool } = require('pg');

const isProduction = process.env.NODE_ENV === 'production';

let pool = null;

if (isProduction) {
    pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });
} else {
    pool = new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'eshoppw',
        password: 'postgres',
        port: 5432
    });
}

module.exports = { pool };
```

---

# Arquivo `categoria.js`

Crie o arquivo `categoria.js` dentro da pasta `entities`.

Ele especifica quais campos os objetos do tipo **Categoria** deverão ter.

**`/entities/categoria.js`**

```javascript
class Categoria {
    constructor(codigo, nome) {
        this.codigo = codigo;
        this.nome = nome;
    }
}

module.exports = Categoria;
```

---

# Arquivo `categoriaUseCases.js`

Crie o arquivo `categoriaUseCases.js` dentro da pasta `usecases`.

Ele vai conter as consultas SQL para manipular a tabela `categorias`.

**`/usecases/categoriaUseCases.js`**

```javascript
const { pool } = require('../config');
const Categoria = require('../entities/categoria');

const getCategoriasDB = async () => {
    try {
        const { rows } = await pool.query(
            'SELECT * FROM categorias ORDER BY nome'
        );

        return rows.map(
            (categoria) => new Categoria(
                categoria.codigo,
                categoria.nome
            )
        );
    } catch (err) {
        throw "Erro : " + err;
    }
};

module.exports = {
    getCategoriasDB
};
```

---

# Arquivo `categoriaController.js`

Crie o arquivo `categoriaController.js` dentro da pasta `controllers`.

Ele será responsável por tratar as requisições e respostas HTTP.

**`/controllers/categoriaController.js`**

```javascript
const {
    getCategoriasDB
} = require('../usecases/categoriaUseCases');

const getCategorias = async (request, response) => {
    await getCategoriasDB()
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: 'Erro ao consultar as categorias: ' + err
        }));
};

module.exports = {
    getCategorias
};
```

---

# Arquivo `rotasCategorias.js`

Crie o arquivo `rotasCategorias.js` dentro da pasta `routes`.

Ele será responsável por criar as rotas para os endpoints da API, associando uma rota e um verbo HTTP à execução de um método.

**`/routes/rotasCategorias.js`**

```javascript
const { Router } = require('express');

const {
    getCategorias
} = require('../controllers/categoriaController');

const rotasCategorias = new Router();

rotasCategorias.route('/categoria')
    .get(getCategorias);

module.exports = {
    rotasCategorias
};
```

---

# Arquivo `rotas.js`

Crie o arquivo `rotas.js` dentro da pasta `routes`.

Ele será responsável por agrupar todas as rotas da API.

**`/routes/rotas.js`**

```javascript
const { Router } = require('express');

const {
    rotasCategorias
} = require('./rotasCategorias');

const rotas = new Router();

rotas.use(rotasCategorias);

module.exports = rotas;
```

---

# Arquivo `index.js`

Crie o arquivo `index.js` na raiz da aplicação.

Ele é o arquivo principal, responsável por executar a API.

**`/index.js`**

```javascript
const express = require('express');
const cors = require('cors');
const rotas = require('./routes/rotas');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(rotas);

app.listen(process.env.PORT || 3002, () => {
    console.log('Servidor da API rodando....');
});
```

---

# Executando a API

Execute o comando abaixo para iniciar a API em modo de desenvolvimento:

```bash
npm run start:dev
```

---

# Operações CRUD

Adicione ao arquivo `categoriaUseCases.js` as operações CRUD restantes.

Modifique o arquivo `categoriaUseCases.js`, adicionando os métodos para executar as outras operações CRUD.

**`/usecases/categoriaUseCases.js`**

## Adicionar categoria

```javascript
const addCategoriaDB = async (body) => {
    try {
        const { nome } = body;

        const results = await pool.query(
            `INSERT INTO categorias (nome)
             VALUES ($1)
             RETURNING codigo, nome`,
            [nome]
        );

        const categoria = results.rows[0];

        return new Categoria(
            categoria.codigo,
            categoria.nome
        );
    } catch (err) {
        throw "Erro ao inserir a categoria: " + err;
    }
};
```

## Alterar categoria

```javascript
const updateCategoriaDB = async (body) => {
    try {
        const { codigo, nome } = body;

        const results = await pool.query(
            `UPDATE categorias
             SET nome = $2
             WHERE codigo = $1
             RETURNING codigo, nome`,
            [codigo, nome]
        );

        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${codigo} para ser alterado`;
        }

        const categoria = results.rows[0];

        return new Categoria(
            categoria.codigo,
            categoria.nome
        );
    } catch (err) {
        throw "Erro ao alterar a categoria: " + err;
    }
};
```

## Remover categoria

```javascript
const deleteCategoriaDB = async (codigo) => {
    try {
        const results = await pool.query(
            `DELETE FROM categorias
             WHERE codigo = $1`,
            [codigo]
        );

        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${codigo} para ser removido`;
        } else {
            return "Categoria removida com sucesso";
        }
    } catch (err) {
        throw "Erro ao remover a categoria: " + err;
    }
};
```

## Buscar categoria por código

```javascript
const getCategoriaPorCodigoDB = async (codigo) => {
    try {
        const results = await pool.query(
            `SELECT * FROM categorias
             WHERE codigo = $1`,
            [codigo]
        );

        if (results.rowCount == 0) {
            throw "Nenhum registro encontrado com o código: " + codigo;
        } else {
            const categoria = results.rows[0];

            return new Categoria(
                categoria.codigo,
                categoria.nome
            );
        }
    } catch (err) {
        throw "Erro ao recuperar a categoria: " + err;
    }
};
```

## Exportação dos métodos

```javascript
module.exports = {
    getCategoriasDB,
    addCategoriaDB,
    updateCategoriaDB,
    deleteCategoriaDB,
    getCategoriaPorCodigoDB
};
```

---

# Tratamento das operações CRUD no Controller

Adicione ao arquivo `categoriaController.js` os tratamentos para as requisições das operações CRUD restantes.

Modifique o arquivo `categoriaController.js` para tratar as requisições das operações CRUD restantes.

**`/controllers/categoriaController.js`**

## Importação dos métodos

```javascript
const {
    getCategoriasDB,
    addCategoriaDB,
    updateCategoriaDB,
    deleteCategoriaDB,
    getCategoriaPorCodigoDB
} = require('../usecases/categoriaUseCases');
```

## Adicionar categoria

```javascript
const addCategoria = async (request, response) => {
    await addCategoriaDB(request.body)
        .then(data => response.status(200).json({
            status: "success",
            message: "Categoria criada",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
};
```

## Alterar categoria

```javascript
const updateCategoria = async (request, response) => {
    await updateCategoriaDB(request.body)
        .then(data => response.status(200).json({
            status: "success",
            message: "Categoria alterada",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
};
```

## Remover categoria

```javascript
const deleteCategoria = async (request, response) => {
    await deleteCategoriaDB(
        parseInt(request.params.codigo)
    )
        .then(data => response.status(200).json({
            status: "success",
            message: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
};
```

## Buscar categoria por código

```javascript
const getCategoriaPorCodigo = async (request, response) => {
    await getCategoriaPorCodigoDB(
        parseInt(request.params.codigo)
    )
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
};
```

## Exportação dos métodos

```javascript
module.exports = {
    getCategorias,
    addCategoria,
    updateCategoria,
    deleteCategoria,
    getCategoriaPorCodigo
};
```

---

# Mapeando as rotas das operações CRUD

Modifique o arquivo `rotasCategorias.js` para mapear as operações CRUD restantes, associando as rotas, verbos HTTP e métodos.

**`/routes/rotasCategorias.js`**

```javascript
const { Router } = require('express');

const {
    getCategorias,
    addCategoria,
    updateCategoria,
    deleteCategoria,
    getCategoriaPorCodigo
} = require('../controllers/categoriaController');

const rotasCategorias = new Router();

rotasCategorias.route('/categoria')
    .get(getCategorias)
    .post(addCategoria)
    .put(updateCategoria);

rotasCategorias.route('/categoria/:codigo')
    .get(getCategoriaPorCodigo)
    .delete(deleteCategoria);

module.exports = {
    rotasCategorias
};
```

---

# Resumo das rotas da API

| Método HTTP | Rota                 | Operação                    |
| ----------- | -------------------- | --------------------------- |
| `GET`       | `/categoria`         | Listar todas as categorias  |
| `POST`      | `/categoria`         | Adicionar uma categoria     |
| `PUT`       | `/categoria`         | Alterar uma categoria       |
| `GET`       | `/categoria/:codigo` | Buscar categoria por código |
| `DELETE`    | `/categoria/:codigo` | Remover categoria           |
