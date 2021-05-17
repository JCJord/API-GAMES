# API DE GAMES
Esta API é utilizada para retornar e manipular dados sobre jogos.
## Endpoints
### GET / 
Esse endpoint é responsável por retornar todos os dados cadastrados no banco de dados.
#### Parametros
Nenhum.
#### Respostas
##### OK! 200
Caso essa resposta aconteça você receberá a listagem dos jogos cadastrados.
Exemplo de resposta:
````

[
    {
        "id": 53,
        "name": "FIFA 22",
        "title": "Futebol",
        "price": 150,
        "createdAt": "2021-05-13T02:16:14.000Z",
        "updatedAt": "2021-05-14T22:59:27.000Z"
    },
    {
        "id": 56,
        "name": "Naruto Uzumaki Chronicles 2",
        "title": "Ninja Game",
        "price": 150,
        "createdAt": "2021-05-14T23:00:51.000Z",
        "updatedAt": "2021-05-14T23:00:51.000Z"
    },
    {
        "id": 57,
        "name": "Winning Eleven 10",
        "title": "Futebol Game",
        "price": 150,
        "createdAt": "2021-05-14T23:01:06.000Z",
        "updatedAt": "2021-05-14T23:01:06.000Z"
    }
]

````
##### Falha na autenticação 401
Caso essa resposta acontença isso signifca que houve algum problema durante o processo de autenticação da requisição.
Motivos: Token inválido , Token Expirado.

Exemplo de resposta : 

````

{
    "err": "invalid Token"
}

````

### POST /AUTH 
Esse endpoint é responsável por 
#### Parametros
Email: email do usuário cadastrado no sistema.

Password: senha do usuário cadastrado no sistema.

Exemplo:
```
{
  "email": "juliojc.jord@gmail.com",
  "senha": "122334",
}
```
#### Respostas
##### OK! 200
Caso essa resposta aconteça você receberá o Token JWT para acessar os endpoints protegidos da API.
Exemplo de resposta: 

```
{
    "Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJqdWxpb2pjLmpvcmRAZ21haWwuY29tIiwiaWF0IjoxNjIxMjc1NDc5LCJleHAiOjE2MjE0NDgyNzl9.aRGYzoKcpfo-cH0yPs-271duRT89rMZpzdJ_89sZMzwx"
}
```
##### Falha na autenticação 401
Caso essa resposta acontença isso signifca que houve algum problema durante o processo de autenticação da requisição.
Motivos: Token inválido , Token Expirado.

Exemplo de resposta : 

````

{
    "err": "invalid Token"
}

````
