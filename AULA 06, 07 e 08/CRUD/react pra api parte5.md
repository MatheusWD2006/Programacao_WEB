# Criação de PWA com create-react-app e a biblioteca React Bootstrap

## Criação de componentes reaproveitáveis

É possível com o React a criação de componentes. Desta forma, serão criados alguns componentes que iriam ter código repetitivo, para diminuir a legibilidade do código e facilitar a manutenção.

---

### Criação do componente `CampoEntrada` — `CampoEntrada.jsx`

Para reaproveitar o código utilizado nos campos de entrada será criado um componente.

Desta forma, quando for necessária alguma modificação, ela ficará encapsulada nele.

Crie o componente `CampoEntrada.jsx`:

**`/src/componentes/comuns/CampoEntrada.jsx`**

```javascript
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

function CampoEntrada({
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

export default CampoEntrada;
```

### Utilização no componente `Formulario.jsx`

Use o componente da seguinte forma no componente Formulário:

#### Importação

```javascript
import CampoEntrada from '../../comuns/CampoEntrada';
```

#### Utilização

```javascript
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
```

---

### Criação do componente `Dialogo` — `Dialogo.jsx`

Outro componente que pode ser otimizado é o que faz o diálogo modal dos formulários.

Isso irá diminuir significativamente a quantidade de código necessário.

Crie o componente `Dialogo.jsx`:

**`/src/componentes/comuns/Dialogo.jsx`**

```javascript
import { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

function Dialogo(props) {

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {

        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);

        if (form.checkValidity() === true) {
            props.acaoCadastrar(event);
        }
    };

    return (
        <Modal
            show={props.exibirForm}
            onHide={() => props.setExibirForm(false)}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    {props.titulo}
                </Modal.Title>
            </Modal.Header>

            <Form
                id={props.id}
                onSubmit={handleSubmit}
                noValidate
                validated={validated}
            >
                <Modal.Body>
                    <Container>
                        <Row>
                            {props.children}
                        </Row>
                    </Container>
                </Modal.Body>

                <Modal.Footer>

                    <Button
                        variant="secondary"
                        onClick={() => props.setExibirForm(false)}
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
    )
}

export default Dialogo;
```

### Utilização no componente `Formulario.jsx`

Use o componente da seguinte forma no componente Formulário:

#### Importações

```javascript
import { useContext } from 'react';

import Alerta from '../../comuns/Alerta';
import CategoriaContext from './CategoriaContext';

import Col from 'react-bootstrap/Col';

import CampoEntrada from '../../comuns/CampoEntrada';
import Dialogo from '../../comuns/Dialogo';
```

#### Utilização do componente `Dialogo`

```javascript
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
        <Dialogo
            id="modalEdicao"
            titulo="Categoria"
            idform="formulario"
            acaoCadastrar={acaoCadastrar}
            exibirForm={exibirForm}
            setExibirForm={setExibirForm}
        >

            <Alerta alerta={alerta} />

            <Col xs={12} md={12}>
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

            <Col xs={12} md={12}>
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

        </Dialogo>
    )
}

export default Formulario;
```
