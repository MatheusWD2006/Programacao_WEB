# Criação de PWA com create-react-app e React Bootstrap

## CRUD de Categoria - Listagem de dados e remoção de registros

### Criação do projeto

Criar um projeto React com o template de PWA utilizando o comando abaixo:

```bash
yarn create react-app eshop-frontend --template cra-template-pwa
```

### Instalação das bibliotecas a serem utilizadas pelo projeto

Dentro da pasta do projeto, execute os comandos abaixo para adicionar as dependências necessárias:

```bash
yarn add bootstrap bootstrap-icons react-bootstrap react-router-dom
```

### Arquivo com as variáveis de ambiente

Crie um arquivo chamado **`.env`** no mesmo diretório do arquivo **`package.json`** para especificar o endereço da API que vai ser utilizada na aplicação, com o seguinte conteúdo:

**`.env`**

```env
REACT_APP_ENDERECO_API=http://127.0.0.1:3002
```

### Componente Home - Home.jsx

Crie o arquivo `Home.jsx` no seguinte caminho:

**`/src/componentes/telas/Home.jsx`**

```javascript
const Home = () => (
    <div>
        <h1>eShop</h1>
    </div>
);

export default Home;
```

### Componente Sobre - Sobre.jsx

Crie o arquivo `Sobre.jsx` no seguinte caminho:

**`/src/componentes/telas/Sobre.jsx`**

```javascript
const Sobre = () => (
    <div>
        <h1>eShop</h1>
        <h2>Sistema desenvolvido na Disciplina de PW</h2>
    </div>
);

export default Sobre;
```

### Componente Menu - Menu.jsx

O Menu é responsável por organizar o layout da aplicação. Todas as telas serão renderizadas dentro do elemento **`<Outlet />`** como filhos do Menu.

Crie o arquivo `Menu.jsx` no seguinte caminho:

**`/src/componentes/Menu.jsx`**

```javascript
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, Outlet } from 'react-router-dom';

function Menu() {
    return (
        <div>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <NavLink
                        className="navbar-brand"
                        aria-current="page"
                        exact="true"
                        to="/"
                    >
                        eShop
                    </NavLink>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />

                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">

                            <NavLink
                                className="nav-link active"
                                aria-current="page"
                                exact="true"
                                to="/"
                            >
                                Home
                            </NavLink>

                            <NavDropdown
                                title="Manutenções"
                                id="basic-nav-dropdown"
                            >
                                <NavLink
                                    className="dropdown-item"
                                    exact="true"
                                    to="categorias"
                                >
                                    Categorias
                                </NavLink>
                            </NavDropdown>

                            <NavLink
                                className="nav-link active"
                                aria-current="page"
                                exact="true"
                                to="/sobre"
                            >
                                Sobre...
                            </NavLink>

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Outlet />
        </div>
    );
}

export default Menu;
```

### Componente App - App.jsx

O componente App é o componente principal da aplicação. Nele serão organizadas as rotas para que se renderizem os componentes conforme elas são chamadas, e também são carregados os arquivos **CSS** e **JS** que serão usados pela aplicação.

Usando o **`react-router-dom`**, utiliza-se o componente **`Menu.jsx`** como pai de todos os componentes. À medida que as rotas são chamadas pelo Menu, os componentes são renderizados dentro do **`Outlet`** do menu.

Modifique o arquivo `App.jsx`:

**`/src/App.jsx`**

```javascript
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import '@popperjs/core/dist/cjs/popper.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

import Menu from './componentes/Menu';
import Home from './componentes/telas/Home';
import Sobre from "./componentes/telas/Sobre";

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
                path: "/sobre",
                element: <Sobre />,
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

### Componente Alerta - Alerta.jsx

O componente Alerta exibirá mensagem de sucesso ou erro para o usuário.

Crie o arquivo `Alerta.jsx` no seguinte caminho:

**`/src/componentes/comuns/Alerta.jsx`**

```javascript
import { useState, useEffect } from "react";
import Alert from 'react-bootstrap/Alert';

const Alerta = ({ alerta }) => {

    const [exibir, setExibir] = useState(false);

    useEffect(() => {
        setExibir(true);

        setTimeout(() => {
            setExibir(false);
        }, 2000);

    }, [alerta]);

    return (
        <div>
            {(alerta.message.length > 0 && exibir) &&
                <Alert
                    variant={alerta.status === 'error' ? 'danger' : 'primary'}
                >
                    {alerta.message}
                </Alert>
            }
        </div>
    )
}

export default Alerta;
```

## CRUD para Categoria

### Cliente para consumo dos serviços - CategoriaServico.jsx

O consumo dos serviços será criado dentro de métodos neste arquivo para facilitar a reutilização.

Crie o arquivo `CategoriaServico.jsx` no seguinte caminho:

**`/src/servicos/CategoriaServico.jsx`**

```javascript
export const getCategoriasAPI = async () => {

    const response = await fetch(
        `${process.env.REACT_APP_ENDERECO_API}/categoria`,
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


export const getCategoriaPorCodigoAPI = async codigo => {

    const response = await fetch(
        `${process.env.REACT_APP_ENDERECO_API}/categoria/${codigo}`,
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


export const deleteCategoriaPorCodigoAPI = async codigo => {

    const response = await fetch(
        `${process.env.REACT_APP_ENDERECO_API}/categoria/${codigo}`,
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


export const cadastraCategoriaAPI = async (objeto, metodo) => {

    const response = await fetch(
        `${process.env.REACT_APP_ENDERECO_API}/categoria`,
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

### Criação do contexto para a Categoria - CategoriaContext.jsx

Para facilitar o compartilhamento de métodos e estados entre o componente principal do CRUD e seus filhos, é necessário a utilização da Context API, criando-se um contexto para a categoria.

Crie o arquivo `CategoriaContext.jsx` no seguinte caminho:

**`/src/componentes/telas/categoria/CategoriaContext.jsx`**

```javascript
import React from 'react';

const CategoriaContext = React.createContext();

export default CategoriaContext;
```

### Criação do componente Categoria - Categoria.jsx

A manutenção CRUD será composta de três componentes:

* Um componente principal chamado `Categoria.jsx`, que terá as regras de negócio e estados.
* Um componente para o formulário de edição de dados.
* Um componente para uma tabela que exibirá os registros.

Crie o arquivo `Categoria.jsx` no seguinte caminho:

**`/src/componentes/telas/categoria/Categoria.jsx`**

```javascript
import { useState, useEffect } from 'react';

import CategoriaContext from './CategoriaContext';

import {
    getCategoriasAPI,
    getCategoriaPorCodigoAPI,
    deleteCategoriaPorCodigoAPI,
    cadastraCategoriaAPI
} from '../../../servicos/CategoriaServico';


function Categoria() {

    const [alerta, setAlerta] = useState({
        status: "",
        message: ""
    });

    const [listaObjetos, setListaObjetos] = useState([]);


    const recuperaCategorias = async () => {
        setListaObjetos(await getCategoriasAPI());
    }


    const remover = async codigo => {

        if (window.confirm('Deseja remover este objeto?')) {

            let retornoAPI = await deleteCategoriaPorCodigoAPI(codigo);

            setAlerta({
                status: retornoAPI.status,
                message: retornoAPI.message
            })

            recuperaCategorias();
        }
    }


    useEffect(() => {
        recuperaCategorias();
    }, []);


    return (
        <CategoriaContext.Provider
            value={{
                alerta,
                setAlerta,
                listaObjetos,
                remover
            }}
        >
        </CategoriaContext.Provider>
    );
}

export default Categoria;
```

### Criação do componente Tabela - Tabela.jsx

O componente Tabela irá exibir a listagem das categorias.

Crie o arquivo `Tabela.jsx` no seguinte caminho:

**`/src/componentes/telas/categoria/Tabela.jsx`**

```javascript
import { useContext } from 'react';

import CategoriaContext from './CategoriaContext';

import Alerta from '../../comuns/Alerta';

import Table from 'react-bootstrap/Table';

import { Button } from 'react-bootstrap';


function Tabela() {

    const {
        alerta,
        listaObjetos,
        remover
    } = useContext(CategoriaContext);


    return (
        <div style={{ padding: '20px' }}>

            <h1>Categorias</h1>

            <Alerta alerta={alerta} />

            <Button variant="primary">
                Novo <i className="bi bi-file-earmark-plus"></i>
            </Button>

            {listaObjetos.length === 0 &&
                <h1>Nenhuma categoria encontrada</h1>
            }

            {listaObjetos.length > 0 && (

                <Table striped bordered hover responsive>

                    <thead>
                        <tr>

                            <th
                                style={{
                                    textAlign: 'center'
                                }}
                            >
                                Ações
                            </th>

                            <th>Código</th>

                            <th>Nome</th>

                        </tr>
                    </thead>

                    <tbody>

                        {listaObjetos.map((objeto) => (

                            <tr key={objeto.codigo}>

                                <td align="center">

                                    <Button variant="info">
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

### Alteração do componente Categoria.jsx para usar o Tabela.jsx

É necessário importar o componente `Tabela.jsx` no componente `Categoria.jsx`.

Altere o arquivo `Categoria.jsx`, adicionando a importação da Tabela e incluindo-o no método `return`:

```javascript
// importação do componente Tabela
import Tabela from './Tabela';


// adicionando no return do componente a chamada para o componente Tabela
return (
    <CategoriaContext.Provider
        value={{
            alerta,
            setAlerta,
            listaObjetos,
            remover
        }}
    >
        <Tabela />
    </CategoriaContext.Provider>
)
```

### Alteração do componente App.jsx para ter uma rota para Categoria.jsx

É necessário importar o componente no arquivo `App.jsx` para adicionar a rota para o CRUD de categoria:

```javascript
// importação do componente
import Categoria from "./componentes/telas/categorias/Categoria";

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
                path: "/sobre",
                element: <Sobre />,
            },

            {
                path: "/categorias",
                element: <Categoria />,
            }

        ]
    }
]);
```

### Executando a aplicação

Com a aplicação da API rodando, digite o comando abaixo em um terminal para executar a aplicação e testar:

```bash
yarn start
```
