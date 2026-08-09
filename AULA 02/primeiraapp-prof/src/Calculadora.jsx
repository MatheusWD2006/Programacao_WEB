import { useState, useEffect } from "react";

function Calculadora() {

    const [valor1, setValor1] = useState(null);
    const [valor2, setValor2] = useState(null);
    const [resultado, setResultado] = useState(null);

    useEffect(()=>{
        console.log('Executa na primeira vez que o componente é renderizado')
    },[])

    useEffect(()=>{
        console.log('Modificou o valor do estado valor1')
    },[valor1]);

    return (
        <>
            <h1>Calculadora</h1>
            <h2>Valor 1: {valor1}</h2>
            <h2>Valor 2: {valor2}</h2>
            {resultado != null &&
                <h2 style={{backgroundColor : resultado < 0 ? 'red' : 'blue'}}>
                    Resultado: {resultado}
                </h2>
            }
            <div>
                <label>Valor 1</label>
                <input type="number" value={valor1}
                    onChange={e => setValor1(e.target.value)} />
            </div>
            <div>
                <label>Valor 2</label>
                <input type="number" value={valor2}
                    onChange={e => setValor2(e.target.value)} />
            </div>
            <button onClick={() => setResultado(Number(valor1) + Number(valor2))}>+</button>
            <button onClick={() => setResultado(Number(valor1) - Number(valor2))}>-</button>
            <button onClick={() => setResultado(Number(valor1) * Number(valor2))}>x</button>
            <button onClick={() => setResultado(Number(valor1) / Number(valor2))}>/</button>
        </>
    )
}

export default Calculadora;