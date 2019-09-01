## API Github Manager

A API Github Manager permite que você crie um usuário adicione usuários do github a listas e adicione tags aos usuários.

### Endereço

Para usar a API, utilize o endereço:

`https://api-github-manager.herokuapp.com/[command]`

Onde [command] pode ser um dos serviços listados abaixo:

### Listar todos usuários github
Comando: Rota Raiz </br></br>
Retorno: Um JSON com a lista de todos usuários do github cadastrados.

### Listar Usuários
Comando: `users` </br></br>
Retorno: Um JSON com a lista de Usuários cadastrados.

### Cadastrar um usuário

Comando: `users/register` </br></br>
Body Type: Form URL Encoded </br></br>
Váriaveis: `email`, `senha`, `isAdmin` e `cpf` </br></br>
Retorno: Um JSON com o status do cadastro. 

### Logar com um usuário

Comando: `users/authenticate` </br></br>
Body Type: Form URL Encoded </br></br>
Váriaveis: `email` e `senha` </br></br>
Retorno: Um JSON com o status da autenticação. </br></br>

### Cadastrar um usuário github
Comando `githubusers/new` </br></br>
Headers: `user` com o ID do usuário logado </br></br>
Váriaveis: `username` </br></br>
Retorno: Um JSON com o status da criação do usuário github </br></br>

### Criar uma lista de usuários github
Comando: `list/new` </br></br>
Headers: `user` com o ID do usuário logado </br></br>
Váriaveis: `nome` </br></br>
Retorno: Um JSON com o status da criação da lista e a lista </br></br>

### Editar uma lista de usuários github
Comando: PUT `list/:listId` </br></br>
Headers: `user` com o ID do usuário logado </br></br>
Váriaveis: `nome` </br></br>

### Deletar uma lista de usuários github
Comando: DELETE `list/:listId` </br></br>
Headers: `user`com o ID do usuário logado </br></br>

### Adicionar Usuário Github a uma Lista
Comando: POST `githubusers/:listId` </br></br>
Headers: `user` com o ID do usuário logado </br></br>
Váriaveis: `login` do usuário github </br></br>

### Adicionar Tag a Usuário Github
Comando: POST `tags/new` </br></br>
Headers: `user`com o ID do usuário logado </br></br>
Váriaveis: `login`com o login do usuário github e `tag_name`com o nome da tag </br></br>