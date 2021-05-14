# Star-Wars-API
 API do Star Wars que utiliza a SWAPI como base

 ## Requisitos
A API deve ser REST

Para cada planeta, os seguintes dados devem ser obtidos do banco de dados da aplicação, sendo inserido manualmente:

* Nome
* Clima
* Terreno
- Para cada planeta também devemos retornar a quantidade de aparições em filmes, que devem ser obtidas pela API pública do Star Wars: [Swapi](https://swapi.dev/documentation)

Funcionalidades desejadas:

* Adicionar um planeta (com nome, clima e terreno)
* Listar planetas
* Buscar por nome
* Buscar por ID
* Remover planeta

## Execução
Para o projeto foi usado:

* JavaScript
* NodeJS
* Axios
* Express
* Mongoose
* Morgan
* Nodemoon

Para testar siga os seguintes passos:
1. Faça o clone do repositório utilizando: 
`git clone https://github.com/anamonteirosmk/Star-Wars_API.git` 
2. Dê o comando: 
`npm init`
3. Instale o nodemoon com o comando: 
`npm i nodemon@2.0.7`
4. Dentro do arquivo `app.js` na linha 7, substitua `<password>` pela senha de acesso do banco de dados
5. No terminal, entre na pasta do projeto e execute: 
`npm start`

A versão do seu node deve estar na mais atualizada