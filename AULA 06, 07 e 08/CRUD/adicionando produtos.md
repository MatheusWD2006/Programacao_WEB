# Criação de PWA com create-react-app e a biblioteca React Bootstrap

## CRUD de Produtos — CRUD com relacionamentos

## Ajustes na API

Será necessária a criação de novas rotas na API para suportar as operações CRUD sobre a tabela `produtos`.

### Entidade Produto

Crie o arquivo **produto.js** no seguinte caminho:

`/entities/produto.js`

```javascript
class Produto {
    constructor(codigo, nome, descricao, quantidade_estoque, ativo, valor, data_cadastro, categoria, categoria_nome) {
        this.codigo = codigo;
        this.nome = nome;
        this.descricao = descricao;
        this.quantidade_estoque = quantidade_estoque;
        this.ativo = ativo;
        this.valor = valor;
        this.data_cadastro = data_cadastro;
        this.categoria = categoria;
        this.categoria_nome = categoria_nome;
    }
}

module.exports = Produto;
```

### UseCase de Produto

Crie o arquivo **produtoUseCases.js** no seguinte caminho:

`/useCases/produtoUseCases.js`

```javascript
const { pool } = require('../config');
const Produto = require('../entities/produto')

const getProdutosDB = async () => {
    try {
        const { rows } = await pool.query(`
            select p.codigo as codigo,
                   p.nome as nome,
                   p.descricao as descricao,
                   p.quantidade_estoque as quantidade_estoque,
                   p.ativo as ativo,
                   p.valor as valor,
                   to_char(p.data_cadastro,'YYYY-MM-DD') as data_cadastro,
                   p.categoria as categoria,
                   c.nome as categoria_nome
            from produtos p
            join categorias c on p.categoria = c.codigo
            order by p.codigo
        `);

        return rows.map((produto) =>
            new Produto(
                produto.codigo,
                produto.nome,
                produto.descricao,
                produto.quantidade_estoque,
                produto.ativo,
                produto.valor,
                produto.data_cadastro,
                produto.categoria,
                produto.categoria_nome
            )
        );
    } catch (err) {
        throw "Erro : " + err;
    }
}

const addProdutoDB = async (body) => {
    try {
        const {
            nome,
            descricao,
            quantidade_estoque,
            ativo,
            valor,
            data_cadastro,
            categoria
        } = body;

        const results = await pool.query(`
            INSERT INTO produtos
            (nome, descricao, quantidade_estoque, ativo, valor, data_cadastro, categoria)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            returning codigo,
                      nome,
                      descricao,
                      quantidade_estoque,
                      ativo,
                      valor,
                      to_char(data_cadastro,'YYYY-MM-DD') as data_cadastro,
                      categoria
        `,
        [
            nome,
            descricao,
            quantidade_estoque,
            ativo,
            valor,
            data_cadastro,
            categoria
        ]);

        const produto = results.rows[0];

        return new Produto(
            produto.codigo,
            produto.nome,
            produto.descricao,
            produto.quantidade_estoque,
            produto.ativo,
            produto.valor,
            produto.data_cadastro,
            produto.categoria,
            ""
        );
    } catch (err) {
        throw "Erro ao inserir o produto: " + err;
    }
}

const updateProdutoDB = async (body) => {
    try {
        const {
            codigo,
            nome,
            descricao,
            quantidade_estoque,
            ativo,
            valor,
            data_cadastro,
            categoria
        } = body;

        const results = await pool.query(`
            UPDATE produtos
            set nome = $2,
                descricao = $3,
                quantidade_estoque = $4,
                ativo = $5,
                valor = $6,
                data_cadastro = $7,
                categoria = $8
            where codigo = $1
            returning codigo,
                      nome,
                      descricao,
                      quantidade_estoque,
                      ativo,
                      valor,
                      to_char(data_cadastro,'YYYY-MM-DD') as data_cadastro,
                      categoria
        `,
        [
            codigo,
            nome,
            descricao,
            quantidade_estoque,
            ativo,
            valor,
            data_cadastro,
            categoria
        ]);

        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${codigo} para ser alterado`;
        }

        const produto = results.rows[0];

        return new Produto(
            produto.codigo,
            produto.nome,
            produto.descricao,
            produto.quantidade_estoque,
            produto.ativo,
            produto.valor,
            produto.data_cadastro,
            produto.categoria,
            ""
        );
    } catch (err) {
        throw "Erro ao alterar o produto: " + err;
    }
}

const deleteProdutoDB = async (codigo) => {
    try {
        const results = await pool.query(`
            DELETE FROM produtos
            where codigo = $1
        `, [codigo]);

        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${codigo} para ser removido`;
        } else {
            return "Produto removido com sucesso";
        }
    } catch (err) {
        throw "Erro ao remover o produto: " + err;
    }
}

const getProdutoPorCodigoDB = async (codigo) => {
    try {
        const results = await pool.query(`
            select p.codigo as codigo,
                   p.nome as nome,
                   p.descricao as descricao,
                   p.quantidade_estoque as quantidade_estoque,
                   p.ativo as ativo,
                   p.valor as valor,
                   to_char(p.data_cadastro,'YYYY-MM-DD') as data_cadastro,
                   p.categoria as categoria,
                   c.nome as categoria_nome
            from produtos p
            join categorias c on p.categoria = c.codigo
            where p.codigo = $1
        `, [codigo]);

        if (results.rowCount == 0) {
            throw "Nenhum registro encontrado com o código: " + codigo;
        } else {
            const produto = results.rows[0];

            return new Produto(
                produto.codigo,
                produto.nome,
                produto.descricao,
                produto.quantidade_estoque,
                produto.ativo,
                produto.valor,
                produto.data_cadastro,
                produto.categoria,
                ""
            );
        }
    } catch (err) {
        throw "Erro ao recuperar o produto: " + err;
    }
}

module.exports = {
    getProdutosDB,
    addProdutoDB,
    updateProdutoDB,
    deleteProdutoDB,
    getProdutoPorCodigoDB
}
```

### Controller de Produto

Crie o arquivo **produtoController.js** no seguinte caminho:

`/controllers/produtoController.js`

```javascript
const {
    getProdutosDB,
    addProdutoDB,
    updateProdutoDB,
    deleteProdutoDB,
    getProdutoPorCodigoDB
} = require('../usecases/produtoUseCases')

const getProdutos = async (request, response) => {
    await getProdutosDB()
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: 'Erro ao consultar os produtos: ' + err
        }));
}

const addProduto = async (request, response) => {
    await addProdutoDB(request.body)
        .then(data => response.status(200).json({
            status: "success",
            message: "Produto criado",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const updateProduto = async (request, response) => {
    await updateProdutoDB(request.body)
        .then(data => response.status(200).json({
            status: "success",
            message: "Produto alterado",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const deleteProduto = async (request, response) => {
    await deleteProdutoDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json({
            status: "success",
            message: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const getProdutoPorCodigo = async (request, response) => {
    await getProdutoPorCodigoDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

module.exports = {
    getProdutos,
    addProduto,
    updateProduto,
    deleteProduto,
    getProdutoPorCodigo
}
```

### Rotas de Produtos

Crie o arquivo **rotasProdutos.js** no seguinte caminho:

`/routes/rotasProdutos.js`

```javascript
const { Router } = require('express');

const {
    getProdutos,
    addProduto,
    updateProduto,
    deleteProduto,
    getProdutoPorCodigo
} = require('../controllers/produtoController');

const rotasProdutos = new Router();

rotasProdutos.route('/produto')
    .get(getProdutos)
    .post(addProduto)
    .put(updateProduto)

rotasProdutos.route('/produto/:codigo')
    .get(getProdutoPorCodigo)
    .delete(deleteProduto)

module.exports = { rotasProdutos };
```

### Atualização do `rotas.js`

Arquivo:

`/routes/rotas.js`

```javascript
const { Router } = require('express');

const { rotasCategorias } = require('./rotasCategorias');
const { rotasProdutos } = require('./rotasProdutos');

const rotas = new Router();

rotas.use(rotasCategorias);
rotas.use(rotasProdutos);

module.exports = rotas;
```

---

## Ajustes no Frontend

### Componente `Uteis.jsx`

Arquivo:

`/src/componentes/comuns/Uteis.jsx`

```javascript
export const formatoMoeda = (valor) => {
    let vrl = Number(valor);

    let valorFormatado = vrl.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2
    });

    return valorFormatado;
}
```

---

# CRUD para Produto

## Cliente para consumo dos serviços — `ProdutoServico.jsx`

O consumo dos serviços será criado dentro de métodos neste arquivo para facilitar a reutilização.

Crie o arquivo **ProdutoServico.jsx** no seguinte caminho:

`/src/servicos/ProdutoServico.jsx`

```javascript
export const getProdutosAPI = async () => {
    const response = await fetch(
        `${process.env.REACT_APP_ENDERECO_API}/produto`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }
    )

    const data = await response.json()

    return data;
}

export const getProdutoPorCodigoAPI = async codigo => {
    const response = await fetch(
        `${process.env.REACT_APP_ENDERECO_API}/produto/${codigo}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }
    );

    const data = await response.json();

    return data;
}

export const deleteProdutoPorCodigoAPI = async codigo => {
    const response = await fetch(
        `${process.env.REACT_APP_ENDERECO_API}/produto/${codigo}`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        }
    );

    const data = await response.json();

    return data;
}

export const cadastraProdutoAPI = async (objeto, metodo) => {
    const response = await fetch(
        `${process.env.REACT_APP_ENDERECO_API}/produto`,
        {
            method: metodo,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(objeto),
        }
    )

    const data = await response.json();

    return data;
}
```

## Criação do contexto para o Produto — `ProdutoContext.jsx`

Para facilitar o compartilhamento de métodos e estados entre o componente principal do CRUD e seus filhos, é necessário utilizar a Context API, criando-se um contexto para o produto.

Crie o arquivo **ProdutoContext.jsx** no seguinte caminho:

`/src/componentes/telas/produto/ProdutoContext.jsx`

```javascript
import React from 'react';

const ProdutoContext = React.createContext();

export default ProdutoContext;
```

## Criação do componente Produto — `Produto.jsx`

A manutenção CRUD será composta de três componentes:

* Um componente principal chamado `Produto.jsx`, que terá as regras de negócio e estados.
* Um componente `Formulario.jsx`, responsável pela renderização do formulário.
* Um componente `Tabela.jsx`, responsável pela exibição dos registros.

O componente `Produto.jsx` segue a mesma lógica do componente criado para a categoria, porém precisa ter estados para armazenar as categorias que serão relacionadas no formulário.

Crie o arquivo:

`/src/componentes/telas/produto/Produto.jsx`

```javascript
import React, { useState, useEffect } from 'react';
import ProdutoContext from './ProdutoContext';

import { getCategoriasAPI } from '../../../servicos/CategoriaServico';

import {
    getProdutosAPI,
    getProdutoPorCodigoAPI,
    deleteProdutoPorCodigoAPI,
    cadastraProdutoAPI
} from '../../../servicos/ProdutoServico'

import Tabela from './Tabela';
import Formulario from './Formulario';
import Carregando from '../../comuns/Carregando';

function Produto() {

    const [alerta, setAlerta] = useState({
        status: "",
        message: ""
    });

    const [listaObjetos, setListaObjetos] = useState([]);
    const [listaCategorias, setListaCategorias] = useState([]);
    const [carregando, setCarregando] = useState(true);

    const recuperaProdutos = async () => {
        setCarregando(true);
        setListaObjetos(await getProdutosAPI());
        setCarregando(false);
    }

    const recuperaCategorias = async () => {
        setListaCategorias(await getCategoriasAPI());
    }

    const remover = async codigo => {
        if (window.confirm('Deseja remover este objeto?')) {

            let retornoAPI =
                await deleteProdutoPorCodigoAPI(codigo);

            setAlerta({
                status: retornoAPI.status,
                message: retornoAPI.message
            })

            recuperaProdutos();
        }
    }

    useEffect(() => {
        recuperaProdutos();
        recuperaCategorias();
    }, []);

    const [editar, setEditar] = useState(false);
    const [exibirForm, setExibirForm] = useState(false);

    const [objeto, setObjeto] = useState({
        codigo: 0,
        nome: "",
        descricao: "",
        quantidade_estoque: "",
        valor: "",
        ativo: "",
        data_cadastro: new Date().toISOString().slice(0, 10),
        categoria: ""
    })

    const novoObjeto = () => {

        setEditar(false);

        setAlerta({
            status: "",
            message: ""
        });

        setObjeto({
            codigo: 0,
            nome: "",
            descricao: "",
            quantidade_estoque: "",
            valor: "",
            ativo: "",
            data_cadastro: new Date().toISOString().slice(0, 10),
            categoria: ""
        });

        setExibirForm(true);
    }

    const editarObjeto = async codigo => {

        setObjeto(await getProdutoPorCodigoAPI(codigo));

        setEditar(true);

        setAlerta({
            status: "",
            message: ""
        });

        setExibirForm(true);
    }

    const acaoCadastrar = async e => {

        e.preventDefault();

        const metodo = editar ? "PUT" : "POST";

        try {

            let retornoAPI =
                await cadastraProdutoAPI(objeto, metodo);

            setAlerta({
                status: retornoAPI.status,
                message: retornoAPI.message
            });

            setObjeto(retornoAPI.objeto);

            if (!editar) {
                setEditar(true);
            }

        } catch (err) {
            console.error(err.message);
        }

        recuperaProdutos();
    }

    const handleChange = (e) => {

        const name = e.target.name;
        const value = e.target.value;

        setObjeto({
            ...objeto,
            [name]: value
        });
    }

    return (
        <ProdutoContext.Provider value={{
            listaObjetos,
            alerta,
            remover,
            objeto,
            editarObjeto,
            acaoCadastrar,
            handleChange,
            novoObjeto,
            exibirForm,
            setExibirForm,
            listaCategorias
        }}>

            <Carregando carregando={carregando}>
                <Tabela />
            </Carregando>

            <Formulario />

        </ProdutoContext.Provider>
    );
}

export default Produto;
```

## Criação do componente Tabela — `Tabela.jsx`

O componente `Tabela` irá exibir a listagem dos produtos.

Arquivo:

`/src/componentes/telas/produto/Tabela.jsx`

```javascript
import { useContext } from 'react'
import ProdutoContext from './ProdutoContext';

import Alerta from '../../comuns/Alerta';

import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';

import { formatoMoeda } from '../../comuns/Uteis'

function Tabela() {

    const {
        alerta,
        listaObjetos,
        remover,
        novoObjeto,
        editarObjeto
    } = useContext(ProdutoContext);

    return (
        <div style={{ padding: '20px' }}>

            <h1>Produtos</h1>

            <Alerta alerta={alerta} />

            <Button
                variant="primary"
                onClick={() => novoObjeto()}
            >
                Novo
                <i className="bi bi-file-earmark-plus"></i>
            </Button>

            {listaObjetos.length === 0 &&
                <h1>Nenhuma categoria encontrada</h1>
            }

            {listaObjetos.length > 0 && (

                <Table striped bordered hover responsive>

                    <thead>
                        <tr>

                            <th style={{
                                textAlign: 'center'
                            }}>
                                Ações
                            </th>

                            <th>Código</th>
                            <th>Nome</th>
                            <th>Descrição</th>
                            <th>Estoque</th>
                            <th>Ativo</th>
                            <th>Valor</th>
                            <th>Data Cadastro</th>
                            <th>Categoria</th>

                        </tr>
                    </thead>

                    <tbody>

                        {listaObjetos.map((objeto) => (

                            <tr key={objeto.codigo}>

                                <td align="center">

                                    <Button
                                        variant="info"
                                        onClick={() =>
                                            editarObjeto(objeto.codigo)
                                        }
                                    >
                                        <i className="bi bi-pencil-square"></i>
                                    </Button>

                                    <Button
                                        variant="danger"
                                        onClick={() => {
                                            remover(objeto.codigo);
                                        }}
                                    >
                                        <i className="bi bi-trash"></i>
                                    </Button>

                                </td>

                                <td>{objeto.codigo}</td>
                                <td>{objeto.nome}</td>
                                <td>{objeto.descricao}</td>
                                <td>{objeto.quantidade_estoque}</td>

                                <td>
                                    {objeto.ativo ? 'SIM' : 'NÃO'}
                                </td>

                                <td>
                                    {formatoMoeda(objeto.valor)}
                                </td>

                                <td>{objeto.data_cadastro}</td>
                                <td>{objeto.categoria_nome}</td>

                            </tr>

                        ))}

                    </tbody>

                </Table>

            )}

        </div>
    )
}

export default Tabela;
```

## Componente CampoSelect — `CampoSelect.jsx`

O componente `CampoSelect` é um componente reaproveitável para campos do tipo `select`, utilizado para listar as categorias e o campo ativo do produto.

Crie o arquivo **CampoSelect.jsx** no seguinte caminho:

`/src/componentes/comuns/CampoSelect.jsx`

```javascript
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

function CampoSelect(props) {

    return (
        <FloatingLabel
            controlId={props.id}
            label={props.label}
            className="mb-3"
        >

            <Form.Select
                value={props.value}
                required={props.requerido}
                name={props.name}
                onChange={props.onchange}
            >

                <option disable="true" value="">
                    ({props.msginvalido})
                </option>

                {props.children}

            </Form.Select>

            <Form.Control.Feedback>
                {props.msgvalido}
            </Form.Control.Feedback>

            <Form.Control.Feedback type="invalid">
                {props.msginvalido}
            </Form.Control.Feedback>

        </FloatingLabel>
    )
}

export default CampoSelect;
```

## Componente CampoEntradaTextArea — `CampoEntradaTextArea.jsx`

O componente `CampoEntradaTextArea` é um componente reaproveitável para campos do tipo `textarea`, utilizado para a descrição do produto.

Crie o arquivo **CampoEntradaTextArea.jsx** no seguinte caminho:

`/src/componentes/comuns/CampoEntradaTextArea.jsx`

```javascript
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

function CampoEntradaTextArea({
    value,
    name,
    label,
    tipo,
    requerido,
    id,
    onchange,
    msgvalido,
    msginvalido,
    readonly,
    maxCaracteres
}) {

    return (
        <FloatingLabel
            controlId={id}
            label={label}
            className="mb-3"
        >

            <Form.Control
                type={tipo}
                required={requerido}
                name={name}
                value={value}
                onChange={onchange}
                readOnly={readonly}
                maxLength={maxCaracteres}
                as="textarea"
                style={{ height: '100px' }}
            />

            <Form.Control.Feedback>
                {msgvalido}
            </Form.Control.Feedback>

            <Form.Control.Feedback type="invalid">
                {msginvalido}
            </Form.Control.Feedback>

        </FloatingLabel>
    )
}

export default CampoEntradaTextArea;
```

## Componente Formulário — `Formulario.jsx`

O componente `Formulário` exibirá uma janela modal tanto para a criação de novos produtos quanto para a edição deles.

A mudança em relação ao componente `Formulário` da categoria é que neste são listadas as categorias para selecionar e relacionar com o produto.

Crie o arquivo **Formulario.jsx** no seguinte caminho:

`/src/componentes/telas/Produto/Formulario.jsx`

```javascript
import { useContext } from 'react'

import Alerta from '../../comuns/Alerta';
import ProdutoContext from './ProdutoContext';

import Col from 'react-bootstrap/Col';

import CampoEntrada from '../../comuns/CampoEntrada';
import Dialogo from '../../comuns/Dialogo';
import CampoSelect from '../../comuns/CampoSelect';
import CampoEntradaTextArea from '../../comuns/CampoEntradaTextArea';

function Formulario() {

    const {
        objeto,
        handleChange,
        acaoCadastrar,
        alerta,
        exibirForm,
        setExibirForm,
        listaCategorias
    } = useContext(ProdutoContext);

    return (

        <Dialogo
            id="modalEdicao"
            titulo="Produto"
            idform="formulario"
            acaoCadastrar={acaoCadastrar}
            exibirForm={exibirForm}
            setExibirForm={setExibirForm}
        >

            <Alerta alerta={alerta} />

            <Col xs={12} md={4}>

                <CampoEntrada
                    value={objeto.codigo}
                    id="txtCodido"
                    name="codigo"
                    label="Código"
                    tipo="number"
                    onchange={handleChange}
                    readonly={true}
                    maxCaracteres={5}
                />

            </Col>

            <Col xs={12} md={8}>

                <CampoEntrada
                    value={objeto.nome}
                    id="txtNome"
                    name="nome"
                    label="Nome"
                    tipo="text"
                    onchange={handleChange}
                    msgvalido="OK certo"
                    msginvalido="Informe o nome"
                    requerido={true}
                    readonly={false}
                    maxCaracteres={40}
                />

            </Col>

            <Col xs={12} md={12}>

                <CampoEntradaTextArea
                    value={objeto.descricao}
                    id="txtDescricao"
                    name="descricao"
                    label="Descrição"
                    tipo="text"
                    onchange={handleChange}
                    msgvalido="OK certo"
                    msginvalido="Informe a descrição"
                    requerido={false}
                    readonly={false}
                />

            </Col>

            <Col xs={12} md={6}>

                <CampoEntrada
                    value={objeto.quantidade_estoque}
                    id="txtEstoque"
                    name="quantidade_estoque"
                    label="Estoque"
                    tipo="number"
                    onchange={handleChange}
                    msgvalido="OK certo"
                    msginvalido="Informe a quantidade em estoque"
                    requerido={true}
                    readonly={false}
                />

            </Col>

            <Col xs={12} md={6}>

                <CampoEntrada
                    value={objeto.valor}
                    id="txtValor"
                    name="valor"
                    label="Valor"
                    tipo="number"
                    onchange={handleChange}
                    msgvalido="OK certo"
                    msginvalido="Informe o valor"
                    requerido={true}
                    readonly={false}
                />

            </Col>

            <Col xs={12} md={6}>

                <CampoEntrada
                    value={objeto.data_cadastro}
                    id="txtDataCadastro"
                    name="data_cadastro"
                    label="Data de cadastro"
                    tipo="date"
                    onchange={handleChange}
                    msgvalido="OK certo"
                    msginvalido="Informe a data de cadastro"
                    requerido={true}
                    readonly={false}
                />

            </Col>

            <Col xs={12} md={6}>

                <CampoSelect
                    value={objeto.ativo}
                    id="txtAtivo"
                    name="ativo"
                    label="Ativo"
                    onchange={handleChange}
                    msgvalido="OK certo"
                    msginvalido="Informe se está ativo"
                    requerido={true}
                >

                    <option value={true}>Sim</option>
                    <option value={false}>Não</option>

                </CampoSelect>

            </Col>

            <Col xs={12} md={12}>

                <CampoSelect
                    value={objeto.categoria}
                    id="txtCategoria"
                    name="categoria"
                    label="Categoria"
                    onchange={handleChange}
                    msgvalido="OK certo"
                    msginvalido="Informe a categoria"
                    requerido={true}
                >

                    {listaCategorias.map((cat) => (

                        <option
                            key={cat.codigo}
                            value={cat.codigo}
                        >
                            {cat.nome}
                        </option>

                    ))}

                </CampoSelect>

            </Col>

        </Dialogo>
    )
}

export default Formulario;
```

## Ajuste no `App.jsx` e `Menu.jsx`

### Rota no componente `App.jsx`

Adicionar uma rota para o componente `Produto.jsx`:

```javascript
{
    path: "produtos",
    element: <Produto/>
}
```

### Novo item no `Menu.jsx`

Adicionar um novo item de menu:

```javascript
<NavLink
    className="dropdown-item"
    exact="true"
    to="produtos"
>
    Produto
</NavLink>
```

### Código-fonte completo do `App.jsx`

```javascript
import {
    createBrowserRouter,
    RouterProvider
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'

import Menu from "./componentes/Menu";
import Home from "./componentes/telas/Home";
import Sobre from "./componentes/telas/Sobre";
import Categoria from "./componentes/telas/categoria/Categoria";
import Produto from "./componentes/telas/produto/Produto";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Menu />,

        children: [

            {
                index: true,
                element: <Home />,
            },

            {
                path: "categorias",
                element: <Categoria/>
            },

            {
                path: "produtos",
                element: <Produto/>
            }

        ]
    }
]);

function App() {
    return (
        <RouterProvider router={router} />
    );
}

export default App;
```
