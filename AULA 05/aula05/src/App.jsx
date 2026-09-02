import Livros from "./Livros";

const { useState } = require("react");


function App() {
  const [mensagem, setMensagem] = useState("");

  const getOla = async () => {
    /*await fetch("http://localhost:3003/")
    .then(response => response.json())
    .then(json => setMensagem(json.mensagem))
    .catch(erro => setMensagem("Erro: " + erro));*/
    const response = await fetch("http://localhost:3003/");
    const statuscode = response.status;
    const json = await response.json();
    setMensagem("Status code: " + statuscode + " Json: " + json);
  };
  const pegaDados = async () => {
    await fetch("http://localhost:3003/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: "João",
        profissao: "Desenvolvedor",
      }),
    }).then((response) => response.json())
    .then((json) => setMensagem("Nome: " + json.nome + " Profissão: " + json.profissao + " Mensagem: " + json.mensagem));
  }

  return (
    <div>
      <h1>{mensagem}</h1>
      <button onClick={getOla}>Ola</button>
      <button onClick={pegaDados}>Pega Dados</button>
      <hr />

      
      <Livros />
    </div>
  );
}

export default App;
