## API Github Manager

A API Github Manager permite que você crie um  usuário adcione usuários e crie lista para organizar seus usuários do github.

### Endereço

Para usar a API, utilize o endereço:

`https://api-github-manager.herokuapp.com/[command]`

Onde [command] pode ser um dos serviços listados abaixo:

### Listar Usuários

Comando: `users`
Retorno: Um JSON com a lista de Usuários cadastrados.

### Cadastrar um usuário

Comando: `users/register`
Body Type: Form URL Encoded
Váriaveis: `email`, `senha`, `isAdmin` e `cpf`
Retorno: Um JSON com o status do cadastro.

### Logar com um usuário

Comando: `users/authenticate`
Body Type: Form URL Encoded
Váriaveis: `email` e `senha`
Retorno: Um JSON com o status da autenticação.

### Cadastrar um usuário github
Comando `githubusers/new`
Headers: `user` com o ID do usuário logado
Váriaveis: `username`
Retorno: Um JSON com o status da criação do usuário github

### Listar todos usuários github
Comando: `githubusers`
Retorno: Um JSON com a lista de todos usuários do github cadastrados.

### Criar uma lista de usuários github
Comando: `list/new`
Headers: `user` com o ID do usuário logado
Váriaveis: `nome`
Retorno: Um JSON com o status da criação da lista e a lista

### Editar uma lista de usuários github
Comando: PUT `list/:listId`
Headers: `user` com o ID do usuário logado
Váriaveis: `nome`

### Deletar uma lista de usuários github
Comando: DELETE `list/:listId`
Headers: `user`com o ID do usuário logado

### Adicionar Usuário Github a uma Lista
Comando: POST `/githubusers/:listId`
Headers: `user` com o ID do usuário logado
Váriaveis: `login` do usuário github

### Adicionar Tag a Usuário Github
Comando: POST `/tags/new`
Headers: `user`com o ID do usuário logado
Váriaveis: `login`com o login do usuário github e `tag_name`com o nome da tag