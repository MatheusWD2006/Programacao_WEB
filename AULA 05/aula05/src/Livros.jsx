import { useState, useEffect } from "react";

function Livros() {
  const [livros, setLivros] = useState([]);
  const [nome, setNome] = useState("");
  const [editora, setEditora] = useState("");
  const [ano, setAno] = useState("");


  const carregarLivros = async () => {
    try {
      const response = await fetch("http://localhost:3003/livros");
      const data = await response.json();
      setLivros(data);
    } catch (error) {
      console.error("Erro ao buscar livros:", error);
    }
  };

  useEffect(() => {
    carregarLivros();
  }, []);


  const criarLivro = async (e) => {
    e.preventDefault();
    if (!nome || !editora || !ano) return;

    try {
      const response = await fetch("http://localhost:3003/livros", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, editora, ano: parseInt(ano) }),
      });

      if (response.ok) {
        setNome("");
        setEditora("");
        setAno("");
        carregarLivros(); 
      }
    } catch (error) {
      console.error("Erro ao adicionar livro:", error);
    }
  };


  const removerLivro = async (index) => {
    try {
      const response = await fetch(`http://localhost:3003/livros/${index}`, {
        method: "DELETE",
      });

      if (response.ok) {
        carregarLivros();
      }
    } catch (error) {
      console.error("Erro ao remover livro:", error);
    }
  };

  return (
    <div>
      <form onSubmit={criarLivro}>
        <div>
          <label>Nome: </label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>
        <div>
          <label>Editora: </label>
          <input
            type="text"
            value={editora}
            onChange={(e) => setEditora(e.target.value)}
          />
        </div>
        <div>
          <label>Ano: </label>
          <input
            type="number"
            value={ano}
            onChange={(e) => setAno(e.target.value)}
          />
        </div>
        <button type="submit">Criar</button>
      </form>

      <br />

      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Editora</th>
            <th>Ano</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {livros.map((livro, index) => (
            <tr key={index}>
              <td>{livro.nome}</td>
              <td>{livro.editora}</td>
              <td>{livro.ano}</td>
              <td>
                <button onClick={() => removerLivro(index)}>Remover</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Livros;