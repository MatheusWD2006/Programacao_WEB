# Criação de PWA com create-react-app e a biblioteca React Bootstrap

## Melhorando a exibição das validações no Formulário

### Alteração do componente `Formulario.jsx` para usar mensagem de validação da biblioteca React Bootstrap

A biblioteca React Bootstrap possui componentes para exibir informações visuais da validação dos campos.

Documentação:

[**React Bootstrap — Forms Validation**](https://react-bootstrap.netlify.app/docs/forms/validation)

Para usar, realize algumas modificações no componente `Formulario.jsx`.

### Importações e novos métodos e estados

```javascript
import Form from 'react-bootstrap/Form';

function Formulario() {

    const {
        objeto,
        handleChange,
        acaoCadastrar,
        alerta,
        exibirForm,
        setExibirForm
    } = useContext(CategoriaContext);

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {

        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);

        if (form.checkValidity() === true) {
            acaoCadastrar(event);
        }
    };
```

### Alteração do formulário

No formulário, deve-se utilizar o componente `Form` do React Bootstrap com as opções `noValidate` e `validated`.

```javascript
<Form
    id="formulario"
    onSubmit={handleSubmit}
    noValidate
    validated={validated}
>
```

### Adicionando o `Feedback` aos campos

Nos campos, adicionar um `Feedback` para quando o campo estiver válido (opcional) e outro para quando estiver inválido.

```javascript
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

        <Form.Control.Feedback>
            Campo nome OK!
        </Form.Control.Feedback>

        <Form.Control.Feedback type="invalid">
            Informe o nome
        </Form.Control.Feedback>

    </FloatingLabel>
</Col>
```

---

## Componente Formulário — `Formulario.jsx`

O componente modificado deve ficar da seguinte forma:

```javascript
import { useContext, useState } from 'react';

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

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {

        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);

        if (form.checkValidity() === true) {
            acaoCadastrar(event);
        }
    };

    return (
        <Modal
            show={exibirForm}
            onHide={() => setExibirForm(false)}
        >
            <Modal.Header closeButton>
                <Modal.Title>Categoria</Modal.Title>
            </Modal.Header>

            <Form
                id="formulario"
                onSubmit={handleSubmit}
                noValidate
                validated={validated}
            >

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

                                    <Form.Control.Feedback>
                                        Campo nome OK!
                                    </Form.Control.Feedback>

                                    <Form.Control.Feedback type="invalid">
                                        Informe o nome
                                    </Form.Control.Feedback>

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

            </Form>
        </Modal>
    );
}

export default Formulario;
```
