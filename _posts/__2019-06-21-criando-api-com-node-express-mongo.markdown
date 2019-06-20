---
title:  "Criando API's com NodeJs, MongoDB e Express"
description: Criação de uma API na visão de quem aprendeu a fazer isso literalmente ontem
date: 2019-06-21 00:00:00
image: post16-mapa.png
tags: [nodejs, api, express, mongodb, docker, postman] 
---

E aew pessoal.

Vou falar aqui sobre como criar uma API, com NodeJS, Express e MongoDB, e vamos ver algumas ferramentas no processo, como Postman e Docker. Esse post é baseado num aprendizado inicial, se você conhece bem essas tecnologias, esse conteúdo deve ser muito básico pra você. 

Dado o disclaimer, imagino que essa postagem vá me servir para algumas coisas: 

* Fixar o conteúdo que aprendi literalmente ontem (escrevo esse post no dia 19/06/19)
* Instigar-me a ir além, e aprender um pouco mais sobre essa stack, talvez implementando novas camadas de deenvl
* Voltar a escrever por aqui

Espero que essa postagem o ajude a dar o pontapé inicial nessa stack bacana e simples de entender.

## O que é necessário para seguir adiante

- Javascript/ ES6, não vou dizer que precisa do básico, mas quanto mais experiência, mais simples vai ficar de entender. Se você nunca ouviu falar em *arrow functions* por exemplo, acaba que a sintaxe pode ficar um pouco complicada.

E só.

Node, MongoDB, Express, Docker, Postman, se tiver um mínimo conhecimento prévio, ajuda, mas não é necessário, até porque se você está lendo isso aqui, é porque você deve ser iniciante nessas tecnologias/ ferramentas.

## Algumas considerações

Ao ler esse post e tentar reproduzir, sugiro que você tenha algo em mente e tente seguir baseado nesse seu projeto. Só copiar e colar não vai te levar muito longe.
Vou falar aqui, baseado nas minha experiências e dores. Espero que sejam as mesmas das suas. Mas se aparecerem outras, compartilhe aqui embaixo e vamos tentar resolver juntos.

Tá no Github um """boilerplate""" que fiz pra me ajudar a criar novas apis, com uma certa estrutura pré configurada. Não é um projeto, não é uma ideia ficar mantendo, só se der muito certo, o que não acredito e nem é o intuito, pois existem várias alternativas melhores e já disponíveis. Talvez vá implementando algumas coisas com o passar do tempo e com a experiência que vou adquirindo, mas se você baixar hoje, terá exatamente a mesma coisa que vou mostrar aqui.

## Setup do ambiente

Levando em conta que já temos [NodeJs e NPM](https://nodejs.org/en/) (ou [Yarn](https://yarnpkg.com/en/)) instalados na máquina, crie uma pasta com o nome de seu projeto e via terminal digite o seguinte comando:

```
npm init -y
```

### Express

Temos nosso *package.json* aparecendo na pasta. Agora vamos instalar o *express*.

```
npm install express
```

### Server.js

Com o Express instalado, vamos criar o arquivo principal da nossa API, vamos chamar por convenção de *server.js* e dentro vamos chamar o Express e setá-la dentro de uma constante:

```
const express = require('express');
const app = express();
```

Para iniciarmos o servidor, chamaremos o método *listen()* do Express.

```
app.listen('3001')
```

3001 é a porta que vamos setar na nossa url, então ficaria assim: **http://localhost:3001**. Rode no terminal:

```
node server.js
```

Acessando o navegador, veriamos a imagem abaixo:


![servidor sem rota](../../assets/images/cannot-get.jpg)


Isso acontece pois ainda não criamos nenhuma rota. Vamos criar a primeira:

```
app.get('/', (req, res)=> {
  res.send('Hello World');  
})
```

Finalize o servidor no terminal e rode novamente.

![servidor com rota](../../assets/images/server-running.jpg)

### Nodemon

Perceba que temos que derrubar o servidor toda vez que precisamos fazer qualquer alteração no nosso arquivo. Para isso vamos instalar uma ferramenta que vai nos ajudar com isso, o **Nodemon**:

```
npm install nodemon --save-dev
```

No package.json, vamos adicionar um novo comando em script. No final ficará assim:

```
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "dev": "nodemon server.js"
},
``` 
Volte para o terminal agora, e rode *npm run server*. Atualize a página no navegador e você verá que nada foi alterado.

## Ferramentas utilizadas

### Docker

Se você nunca ouviu falar sobre Docker deixo aqui alguns links para melhor entendimento:

- [Pesquisa Google - O que é Docker](https://www.google.com/search?q=o+que+%C3%A9+docker&oq=o+que+%C3%A9+docker&aqs=chrome..69i57j0l5.2748j0j4&sourceid=chrome&ie=UTF-8)

É necessário fazer a instalação, seguindo o link abaixo de acordo com o seu S.O.

- [http://docks.docker.com/install](http://docks.docker.com/install)

Finalizado a instalação, vamos criar um container com o MongoDB, seguindo os comandos a seguir:

```
docker pull mongo

docker run --name nome-sua-api -p 27017:27017 -d mongo
```

Vamos entender os comandos acima. 

O primeiro baixa uma imagem do MongoDB e deixa disponível no Docker. Se for em S.O. Unix é necessário ser root.
O segundo, o Docker vai rodar (**run**) um processo com um nome a sua escolha (**--name nome-sua-api**), coloquei *--name api-base*, na porta 27017:27017. Essa porta que configuramos significa que quando tentarmos acessar a porta padrão local do MongoDB (27017) ele redirecione (:) para a porta padrão do MongoDb instalado no Docker (27017), e o **-d mongo** é o nome da imagem que baixamos no primeiro comando. Comigo tinha dado que o primeiro parâmetro da porta estava em uso, então troquei para *27008:27017*.

Tendo tudo dado certo, rode no terminal:

```
docker ps -a
```

Que irá listar todos os containers disponíveis, caso você tenha mais de um. Você deve estar vendo o que criamos nessa lista. 

![container com mongodb](../../assets/images/container-mongo.jpg)

Caso ele não esteja rodando, num futuro caso de desligamento da máquina, só digitar:

```
docker start nome-sua-api
```

### Robo3T e Postman

Vamos instalar essas duas ferramentas que vão nos auxiliar. O Robo3T com a visualização do que acontece com o nosso banco e o Postman para testarmos nossas rotas. Voltaremos a ambos mais a frente.

- [https://robomongo.org/download](https://robomongo.org/download)
- [https://www.getpostman.com/downloads/](https://www.getpostman.com/downloads/)

## Conexão com o banco de dados

Precisamos conectar nossa aplicação ao banco de dados. Para isso vamos instalar uma ferramenta bem útil e que facilita bastante várias ações que fomos tomar com o Mongo.

### Mongoose

Tão simples como instalar *npm install mongoose*, precisamos importá-lo e em seguida realizar a conexão.

```
const express = require('express');
const app = express();
const mongoose = require('mongoose');

// Conectar com o banco
mongoose.connect('mongodb://localhost:27017/nodeapi', {useNewUrlParser: true})


app.get('/', (req, res)=> {
  res.send('Hello World!');
});

app.listen('3002', ()=> console.log('server running at localhost:3002'))
```

Vamos pegar o *mongoose* e conectar ao endereco 'mongodb://localhost:27017/nodeapi', *mongodb* é o protocolo.

## Models

## Controllers

## Routes

## Paginação

## Cors

![Mapa finalizado](../../assets/images/post16-mapa.png)

## Objetivo

``` html
<script async defer src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap&libraries=places"
  type="text/javascript"></script>
```

Onde tem YOUR_API_KEY substitua pela chave que você acabou de gerar. Se não tiver, você precisa adicionar o parâmetro `libraries=places` no final.


- [Download do código](../../assets/downloads/mapa-nicholas-cage.zip)
- [Código no Github](https://github.com/jonathanslima/google-maps)
