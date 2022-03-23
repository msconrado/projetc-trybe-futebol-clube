# Boas vindas ao repositório do TFC - Trybe Futebol Clube! ⚽️
# Contexto

Nesse projeto, construir **um back-end dockerizado utilizando modelagem de dados através do Sequelize**.

O **frontend foi disponibilizado pela Trybe**.

---

# Habilidades

 - Foi realizado a dockerização dos apps, network, volume e compose;
 - Modelado dados com **MySQL** através do **Sequelize**;
 - Criado e associado tabelas usando `models` do `sequelize`;
 - Construido uma **API REST** com endpoints para consumir os models criados;
 - Feito um `CRUD` utilizando `ORM`;

---
## O que foi desenvolvido

Uma aplicação responsável pela serie A do campeonato __TFC - Trybe Futebol Clube__. Começando pela API, desenvolvidos alguns endpoints (seguindo os princípios **REST**) que estão conectados ao seu banco de dados.


Uma aplicação dockerizada em `Node.js + Typescript` usando o pacote `sequelize`.

---
Para adicionar uma partida é necessário usuário e senha, portanto a pessoa deverá estar logada para fazer as alterações

## Instalando Dependências:

  ```
  npm install
  ```
---

## ⚠️ **Inicie o `docker-compose`** ⚠️

- Utilize os scripts de apoio `npm run compose:up` / `npm run compose:down`, para facilitar a execução do *compose*.

---
## Executando aplicação

- Font-end - [Tabela](http://localhost:3000/)
- Back-end - [Partidas](http://localhost:3001/matchs), [Clubes](http://localhost:3001/clubs) e [Tabela](http://localhost:3001/leaderboard)
- Para adicionar partidas, alterar o placar, e finalizar partidas tem que entrar com o login do admin.
- *email* = admin@admin.com 
- *password* = secret_admin

---
## Executando Testes

* Para rodar os testes implementados pela trybe:

  `npm test`

* Para rodar os testes que eu implementei:

  `cd app/backend && npm test`

* Para ver a cobertura de testes:

  `cd app/backend && npm run test:covarage`