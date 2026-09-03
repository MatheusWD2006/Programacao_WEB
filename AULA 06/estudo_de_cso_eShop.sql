criar tabela categorias (
   código serial não nulo chave primária,
   nome varchar (40) não nulo
);

criar tabela produtos (
   código serial não nulo chave primária,
   nome varchar (50) não nulo,
   texto descricao,
   quantidade_estoque inteiro,
   verificar (quantidade_estoque >= 0),
   ativo booleano não nulo,
   valor numérico(12,2) não nulo,
   verificar (valor >= 0),
   data_cadastro data não nula,
   categoria inteiro não nulo,
   chave estrangeira (categoria) referências categorias (codigo)
);

criar tabela avaliações (
 	 código serial não nulo chave primária,
	 autor varchar(40) não nulo,
	email varchar(40) não nulo,
	texto varchar(200) não nulo,
	nota inteiro não nulo,
	verificar (nota >= 0 e nota <= 5),
	data de dados não nula,
	produto inteiro não nulo,
	chave estrangeira (produto) referências produtos (codigo)
);

-- inserindo registros
-- categorias
inserir nas categorias (nome) valores ('Eletrônicos') , ('Eletrodomésticos') , ('Informática');

-- produtos

inserir em produtos (nome, descrição, quantidade_estoque, ativo, valor, data_cadastro, categoria)
valores ('Mouse USB','Mouse USB', 20, verdadeiro, 60.0, data_atual,1),
('Mouse Sem Fio','Mouse sem Fio', 10, true, 120.0, data_atual,1),
('Teclado USB','Teclado USB', 30, true, 500.0, data_atual,1);

--
inserir em avaliações (autor, email, texto, nota, dados, produto)
valores ('Jorge', 'jorgebavaresco@ifsul.edu.br','Rato muito preciso', 5, data_atual, 1);


-- consultas

selecione p.codigo como codigo, p.nome como nome, p.descricao como descrição, p.quantidade_estoque como quantidade_estoque, p.ativo como ativo, p.valor como valor, to_char(p.data_cadastro,'YYYY-MM-DD') como data_cadastro, p.categoria como categoria, c.nome como categoria_nome
de produtos p
junte categorias c em p.categoria = c.código
Encomendar por código P.

selecione * de avaliações;

-- criação da tabela usuários
criar tabela usuários (
	email varchar(50) não nulo chave primária,
	senha varchar(20) não nulo,
	tipo char(1) não nulo,
	verifique (tipo = 'T' ou tipo = 'A' ou tipo = 'U'),
	telefone varchar(14) não nulo,
	nome varchar(50) não nulo
);

--inserindo alguns registros na tabela de usuários
inserir em usuários (e-mail, senha, tipo, telefone, nome)
valores ('jorgebavaresco@ifsul.edu.br', '123456', 'A','(54)99984-4348','Jorge Bavaresco'),
('joao@ifsul.edu.br', '123456', 'U','(54)44484-4348','João');