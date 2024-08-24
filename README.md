# Controle de Tarefas API

## Rotas de Usuário 

### Registro de usuário POST /users/

Padrão de corpo

```json
{
	"name": "Lorem Ipsun",
	"email": "loremipsum@gmail.com",
	"password": "@12patinhos"
}
```

Padrão de resposta  (STATUS: 201)

```json
{
    "id": 1,
    "title": "Lorem ipsum",
    "content": "Lorem ipsum",
    "finished": false,
    "categoryId": 1,
}    
```

#### Possíveis erros

| STATUS | DESCRIÇÃO
| ------ | ------ | 
| 400 | Padrão de corpo inválido |
| 409 | Conflito, usuário já registrado |



### Login de usuário POST /users/login

Padrão de corpo

```json
{
	"email": "LoremIpsum@gmail.com",
	"password": "@12patinhos"
}
```

Padrão de resposta  (STATUS: 200)

```json
{
	"accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNzI0NTExODk1fQ.pw9hY5Hmt0yUDQSZtS8zOkzzb-apDAp9ir8ielM0PVg",
	"user": {
		"id": 5,
		"name": "Lorem Ipsum",
		"email": "LoremIpsum@gmail.com"
	}
}    
```

#### Possíveis erros

##### STATUS (400) - Padrão de corpo inválido
##### STATUS (403) - Senha e email
##### STATUS (404) - Usuário não existe



### Recuperar usuário para login automático GET /users/profile

Padrão de resposta  (STATUS: 200)

```json
{
    "id": 1,
    "name": "Lorem Ipsum",
    "email": "LoremIpsum@email.com"
}   
```

#### Possíveis erros

##### STATUS (401) - É necessário uma token de usuário 
##### STATUS (403) - Token inválida


## Rotas de Tarefas 

### Criação de tarefa POST /tasks

Padrão de corpo

```json
{
    "title": "Lorem ipsum",
    "content": "Lorem ipsum",
    "categoryId?": 1,
}
```

Padrão de resposta  (STATUS: 201)

```json
{
    "id": 1,
    "title": "Lorem ipsum",
    "content": "Lorem ipsum",
    "finished": false,
    "categoryId": 1,
}    
```

#### Possíveis erros:

##### STATUS (400) -  quando o corpo não é compatível com o padrão
##### STATUS (401) - É necessário uma token de usuário 
##### STATUS (403) - Token inválida ou categoria inválida
##### STATUS (404) - Categoria não encontrada


### Leitura de tarefas GET /tasks

Padrão de resposta  (STATUS: 200)

```json
[
    {
        "id": 1,
        "title": "Lorem ipsum",
        "content": "Lorem ipsum",
        "finished": false,
        "category": {
            "id": 1,
            "name": "Estudo",
        }
    }  
]  
```

URL Search Params

| Parâmetro | Exemplo de uso 
| ------ | ------ | 
| category | /tasks?category=estudo |

#### Possíveis erros:

##### STATUS (401) - É necessário uma token de usuário 
##### STATUS (403) - Token inválida 
##### STATUS (404) - Categoria não encontrada


### Leitura de individual GET /tasks/:1

Padrão de resposta  (STATUS: 200)

```json
{
    "id": 1,
    "title": "Lorem ipsum",
    "content": "Lorem ipsum",
    "finished": false,
    "category": {
        "id": 1,
        "name": "Estudo"
    }
}   
```

#### Possíveis erros:
##### STATUS (401) - É necessário uma token de usuário 
##### STATUS (403) - Token inválida 
##### STATUS (403) - Usuário não é o dono dessa tarefa
##### STATUS (404) - Tarefa não encontrada


### Atualizar tarefa PATCH /tasks/:id

Padrão de corpo 

```json
{
    "title?": "Lorem ipsum",
    "content?": "Lorem ipsum",
    "finished?": true,
    "categoryId?": 1,
}
```

Padrão de resposta (STATUS: 200)

```json
{
    "id": 1,
    "title": "Lorem ipsum",
    "content": "Lorem ipsum",
    "finished": true,
    "categoryId": 1,
}    
```

#### Possíveis erros:

##### STATUS (401) - É necessário uma token de usuário 
##### STATUS (403) - Token inválida 
##### STATUS (403) - Usuário não é o dono dessa tarefa 
##### STATUS (404) - Tarefa não encontrada
##### STATUS (404) - Categoria não encontrada

### Excluir tarefa PATCH /tasks/:id

Está rota não tem um corpo de resposta (STATUS: 204)

#### Possíveis erros:

##### STATUS (401) - É necessário uma token de usuário 
##### STATUS (403) - Usuário não é o dono dessa tarefa 
##### STATUS (403) - Token inválida 
##### STATUS (404) - Tarefa não encontrada

## Rotas de Categoria

### Criação de categoria POST /categories

Padrão de corpo

```json
{
    "name": "Example",
}
```

Padrão de resposta (STATUS 201)

```json
{
    "id": 1,
    "name": "Example",
    "userId": 1
}
```

#### Possíveis erros:
##### STATUS (400) - quando o corpo não é compatível com o padrão
##### STATUS (401) - É necessário uma token de usuário 
##### STATUS (403) - Token inválida 

### Exclusão de categoria DELETE /categories/:id

Está rota não tem um corpo de resposta (STATUS: 204)

#### Possíveis erros:

##### STATUS (401) - É necessário uma token de usuário 
##### STATUS (403) - Token inválida 
##### STATUS (404) - Categoria não encontrada
