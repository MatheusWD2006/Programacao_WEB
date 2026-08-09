const Corpo = (props) => {
    return (
        <div>
            <p>Corpo da Página</p>
            <h3>Props recebida: {props.texto}</h3>
            <button onClick={() => props.mensagemAlerta("Executou a função")}>Mensagem</button>

            {props.dados.map(linha => (
                <li key={linha}>{linha}</li>
            ))}

<h3>Valores recebidos por pros: {JSON.stringify(props)}</h3> 


        </div>
    )
}

export default Corpo;