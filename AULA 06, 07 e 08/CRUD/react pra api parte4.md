# Criação de PWA com create-react-app e a biblioteca React Bootstrap

## Componente para exibir tela de Carregamento enquanto fetch na API é executado

### Criação do componente `Carregando` — `Carregando.jsx`

Para exibir uma tela de carregamento enquanto a requisição para a API está sendo executada, é necessário criar um componente.

Crie o componente `Carregando.jsx`:

**`/src/componentes/comuns/Carregando.jsx`**

```javascript
import Spinner from 'react-bootstrap/Spinner';

export default function Carregando(props) {

    return (
        <>
            {
                !props.carregando
                    ? props.children
                    :
                    <div className="d-flex align-items-center m-5">

                        <strong role="status">
                            Carregando...
                        </strong>

                        <Spinner
                            animation="border"
                            size="sm"
                            variant="primary"
                        />

                        <Spinner
                            animation="border"
                            variant="primary"
                        />

                    </div>
            }
        </>
    );
}
```

---

## Modificação do componente `Categoria.jsx` para usar o componente `Carregando.jsx`

Modifique o componente `Categoria.jsx` para usar o componente `Carregando.jsx`.

É necessária a importação do componente e a criação de um estado para controlar enquanto a requisição é executada, bem como a utilização do componente em conjunto com componentes que podem exibir a tela de carregamento.

### Importação

```javascript
// Importação
import Carregando from '../../comuns/Carregando';
```

### Estado que controla a exibição da tela de carregamento

```javascript
// Estado que controla a exibição da tela de carregamento
const [carregando, setCarregando] = useState(true);
```

### Modificação do método que recupera as categorias

Modifique o método `recuperaCategorias` para alterar o valor do estado `carregando` durante a execução da requisição:

```javascript
// Modificação do método que recupera as categorias
// para mudar o valor do estado carregando
const recuperaCategorias = async () => {

    setCarregando(true);

    setListaObjetos(await getCategoriasAPI());

    setCarregando(false);
}
```

### Utilização do componente `Carregando`

Na chamada do componente `Tabela`, utilize o componente `Carregando` como pai:

```javascript
// Na chamada do componente Tabela,
// usar o componente Carregando como pai

<Carregando carregando={carregando}>
    <Tabela />
</Carregando>
```

Dessa forma, enquanto `carregando` for `true`, será exibida a mensagem e os `Spinner` de carregamento.

Quando `carregando` passar para `false`, o componente `Tabela` será exibido normalmente.

```
```
