<h1>Teste Técnico feito para vaga de estágio no SENAI-MS.</h1>
<h2>Como instalar.</h2>
<h3>Requisitos minimos.</h3>
Ter instalado o MySQL para a criação do Database. Ter instalado o NodeJS para a inicialização do servidor.

<h2>Tecnologias utilizadas</h2>

• **NodeJS** *(ambiente de execução Javascript)*
<br/>
• **NPM** *(Gerenciador de Pacotes)*
<br/>
• **JavaScript** *(linguagem de desenvolvimento)*
<br/>
• **Express** *(Ferramenta de servidor)*
<br/>
• **Sequelize** *(ORM feito com o MySQL)*
<br/>
• **MySQL** *(Banco de dados)*
<br/>
• **Postman** *(Teste de requisições da API)*

<h2>Inicialização do Projeto</h2>
Inicie uma instância local do MySQL e crie um banco de dados para conectar ao projeto através do arquivo `config.json`, localizado dentro da pasta `config`. 

![Captura de tela 2025-02-12 151857](https://github.com/user-attachments/assets/d426d36c-c127-454b-a1f3-af1184c3aa66)

<br>
Então, coloque no terminal o comando "node server.js" para iniciar o servidor.
<br>
Após isso, popule a tabela de administradores com um CPF e uma senha, que possibilitarão o acesso do administrador. 
<br>
Inicialmente, o projeto estará sem voluntários na tabela dentro do banco de dados. Isso pode ser populado através da página de formulário de voluntários, localizada no botão "Quero Participar".

![Captura de tela 2025-02-12 151651](https://github.com/user-attachments/assets/680c2bc8-512f-4318-8f03-2903d536a9a9)
<br>
No final da página de administradores, haverá uma lista de voluntários onde será possível editar ou deletar.
<br>
Para abrir o site, é recomendado o uso da extensão Live Server do VS Code.