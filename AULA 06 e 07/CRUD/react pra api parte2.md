# Criação de PWA com Create React App e React Bootstrap

## CRUD de Categoria — Cadastrar e Editar Categorias

### Alteração do componente `Categoria.jsx` para adicionar as funcionalidades de criar e alterar categorias

É necessário alterar o componente `Categoria.jsx` para incluir novos estados e métodos que darão suporte às funções de criação e edição de categorias.

Modifique o componente adicionando o seguinte trecho:

```javascript
// Novos estados e métodos
const [editar, setEditar] = useState(false);
const [exibirForm, setExibirForm] = useState(false);

const [objeto, setObjeto] = useState({
    codigo: "", 
    nome: "", 
    descricao: "", 
    sigla: ""
});

const novoObjeto = () => {
    setEditar(false);
    setAlerta({ status: "", message: "" });
    setObjeto({
        codigo: 0,
        nome: ""
    });
    setExibirForm(true);
}

const editarObjeto = async codigo => {
    setObjeto(await getCategoriaPorCodigoAPI(codigo));
    setEditar(true);
    setAlerta({ status: "", message: "" });
    setExibirForm(true);
}

const acaoCadastrar = async e => {
    e.preventDefault();
    const metodo = editar ? "PUT" : "POST";

    try {
        let retornoAPI = await cadastraCategoriaAPI(objeto, metodo);

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

    recuperaCategorias();
}

const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setObjeto({
        ...objeto,
        [name]: value
    });
}

// Adicionando no value do Provider os novos estados e métodos
// para uso dos componentes filhos
return (
    <CategoriaContext.Provider value={
        {
            listaObjetos,
            alerta,
            remover,
            objeto,
            editarObjeto,
            acaoCadastrar,
            handleChange,
            novoObjeto,
            exibirForm
        }
    }>
        <Tabela />
    </CategoriaContext.Provider>
);
```

---

## Componente Formulário — `Formulario.jsx`

O componente Formulário exibirá uma janela modal tanto para a criação de novas categorias quanto para a edição das existentes.

Crie o arquivo `Formulario.jsx` no caminho:

```text
/src/componentes/telas/categoria/Formulario.jsx
```

```javascript
import { useContext } from 'react';
import Alerta from '../../comuns/Alerta';
import CategoriaContext from './CategoriaContext';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

function Formulario() {

    const {
        objeto,
        handleChange,
        acaoCadastrar,
        alerta,
        exibirForm,
        setExibirForm
    } = useContext(CategoriaContext);

    return (
        <Modal
            show={exibirForm}
            onHide={() => setExibirForm(false)}
        >
            <Modal.Header closeButton>
                <Modal.Title>Categoria</Modal.Title>
            </Modal.Header>

            <form id="formulario" onSubmit={acaoCadastrar}>

                <Modal.Body>
                    <Container>
                        <Row>

                            <Alerta alerta={alerta} />

                            <Col xs={12} md={12}>
                                <FloatingLabel
                                    controlId="txtCodido"
                                    label="Código"
                                    className="mb-3"
                                >
                                    <Form.Control
                                        type="text"
                                        readOnly
                                        name="codigo"
                                        value={objeto.codigo}
                                        onChange={handleChange}
                                    />
                                </FloatingLabel>
                            </Col>

                            <Col xs={12} md={12}>
                                <FloatingLabel
                                    controlId="txtNome"
                                    label="Nome"
                                    className="mb-3"
                                >
                                    <Form.Control
                                        type="text"
                                        required
                                        name="nome"
                                        value={objeto.nome}
                                        onChange={handleChange}
                                        placeholder="Informe o nome"
                                    />
                                </FloatingLabel>
                            </Col>

                        </Row>
                    </Container>
                </Modal.Body>

                <Modal.Footer>

                    <Button
                        variant="secondary"
                        onClick={() => setExibirForm(false)}
                    >
                        Fechar
                    </Button>

                    <Button
                        variant="success"
                        type="submit"
                    >
                        Salvar <i className="bi bi-save"></i>
                    </Button>

                </Modal.Footer>

            </form>
        </Modal>
    );
}

export default Formulario;
```

---

## Alteração do componente `Categoria.jsx` para usar o `Formulario.jsx`

É necessário importar o componente `Formulario.jsx` no componente `Categoria.jsx`.

Altere o arquivo adicionando a importação:

```javascript
// Importação do componente Formulario
import Formulario from './Formulario';
```

Depois, inclua o componente no retorno do JSX:

```javascript
return (
    <CategoriaContext.Provider value={
        {
            listaObjetos,
            alerta,
            remover,
            objeto,
            editarObjeto,
            acaoCadastrar,
            handleChange,
            novoObjeto,
            exibirForm,
            setExibirForm
        }
    }>
        <Tabela />
        <Formulario />
    </CategoriaContext.Provider>
);
```

---

## Alteração do componente `Tabela.jsx` para chamar as ações de Novo e Editar

Atualize o componente `Tabela.jsx` capturando as ações disponibilizadas no contexto e vinculando-as aos botões **Novo** e **Editar**.

### Capturar as ações do contexto

```javascript
const {
    alerta,
    listaObjetos,
    remover,
    novoObjeto,
    editarObjeto
} = useContext(CategoriaContext);
```

### Chamando a ação no botão Novo

```javascript
<Button
    variant="primary"
    onClick={() => novoObjeto()}
>
    Novo <i className="bi bi-file-earmark-plus"></i>
</Button>
```

### Chamando a ação no botão Editar

```javascript
<Button
    variant="info"
    onClick={() => editarObjeto(objeto.codigo)}
>
    <i className="bi bi-pencil-square"></i>
</Button>
```
