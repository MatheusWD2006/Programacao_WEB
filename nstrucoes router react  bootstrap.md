# React Router DOM e React Bootstrap

## React Router DOM

Para instalar o **React Router DOM**, utilize o comando:

```bash
npm i react-router
```

> **Observação:** o pacote utilizado atualmente é `react-router`. Em projetos que utilizam a API tradicional do navegador com componentes como `BrowserRouter`, `Routes` e `Route`, também pode ser necessário utilizar `react-router-dom`, dependendo da versão e configuração do projeto.

---

## React Bootstrap

Para utilizar o **React Bootstrap** na aplicação React, instale os dois pacotes:

```bash
npm i bootstrap react-bootstrap
```

### Importando o CSS do Bootstrap

No componente principal da aplicação, ou no arquivo onde o Bootstrap será utilizado, adicione:

```jsx
import 'bootstrap/dist/css/bootstrap.min.css';
```

---

## Utilizando classes do Bootstrap no React

Como o React utiliza **JSX**, o atributo `class` deve ser substituído por `className`.

### Código original do Bootstrap

```html
<li class="nav-item">
    <a class="nav-link" href="#">Link</a>
</li>
```

### Código para React/JSX

```jsx
<li className="nav-item">
    <a className="nav-link" href="#">Link</a>
</li>
```

> **Importante:** ao copiar componentes ou exemplos do Bootstrap em HTML, verifique os atributos utilizados. No JSX, `class` deve ser `className`.

---

# Menu com React Bootstrap e React Router

Um exemplo de menu utilizando componentes do **React Bootstrap** juntamente com o **React Router**:

```jsx
<NavLink className="navbar-brand" exact="true" to="/">
    Rotas com react-router
</NavLink>

<Navbar.Toggle aria-controls="basic-navbar-nav" />

<Navbar.Collapse id="basic-navbar-nav">
    <Nav className="me-auto">

        <NavLink className="nav-link active" exact="true" to="/">
            Home
        </NavLink>

        <NavDropdown title="Ações" id="basic-nav-dropdown">

            <NavLink
                className="dropdown-item"
                exact="true"
                to="/rotas"
            >
                Rotas
            </NavLink>

            <NavLink
                className="dropdown-item"
                exact="true"
                to="/rotas/2025"
            >
                Rotas com parâmetros
            </NavLink>

        </NavDropdown>

        <NavLink
            className="nav-link active"
            exact="true"
            to="/sobre"
        >
            Sobre...
        </NavLink>

    </Nav>
</Navbar.Collapse>
```

## Estrutura das rotas do menu

O menu acima possui as seguintes opções:

| Opção                    | Rota          | Função                        |
| ------------------------ | ------------- | ----------------------------- |
| **Home**                 | `/`           | Página inicial                |
| **Rotas**                | `/rotas`      | Página relacionada às rotas   |
| **Rotas com parâmetros** | `/rotas/2025` | Exemplo de rota com parâmetro |
| **Sobre...**             | `/sobre`      | Página sobre a aplicação      |

---

## Principais componentes utilizados

* `NavLink` → cria links para navegação entre rotas.
* `Navbar.Toggle` → botão para abrir/fechar o menu, principalmente em telas menores.
* `Navbar.Collapse` → área que pode ser expandida ou recolhida.
* `Nav` → organiza os links de navegação.
* `NavDropdown` → cria um menu suspenso.
* `className` → substitui o `class` do HTML quando estamos utilizando JSX.
