function Titulo(props){
    return (
        <div>
            <h1>Olá mundo React. Meu primeiro componente!</h1>
            <h2>Usando a prop: {props.texto} </h2>
        </div>
    );
}

export default Titulo;