---
title:  "Criando API's com NodeJs, MongoDB e Express - Parte 3"
description: Finalizando aplicação e fazendo primeiras requisições
date: 2019-06-21 00:00:00
image: node-express-mongo.jpg
tags: [nodejs, api, express, mongodb, docker, postman, robo3t] 
---

Já leu as partes 1 e 2? Não? Confira aqui: 

- [PARTE 1](https://jonathanslima.github.io/2019/criando-api-com-node-express-mongo-parte-1/)
- [PARTE 2](https://jonathanslima.github.io/2019/criando-api-com-node-express-mongo-parte-2/)

Com um model e um controller para criação de um item no banco configurado, precisamos ajustar a rota. Primeiramente vamos criar um arquivo chamado *routes.js* dentro de */src*. Começaremos importando o express, para chamar seu método Router() e vamos importar também o controller que acabamos de criar.

```
const express = require('express');
const routes = express.Router();
const ItemList = require('./controllers/ItemController');
```

Depois vamos criar nossa primeira rota do nosso endpoint. Vamos destrinchar essa linha a seguir:

```
routes.post('/itemsList', ItemList.createItem)
```

Nossa rota, como estamos enviando dados, o verbo HTTP que vamos usar é o *POST*. Esse método recebe como primeiro parâmetro o caminho relativo, e como segundo, recebe o método *createItem* que está dentro de nosso controller.

Essa será a primeira rota, mais tarde faremos a rota de listagem (GET), a de delete (DELETE) e a de update (PUT).

Por fim, exporte as rotas:

```
module.exports = routes;
```

### Finalizando Server.js

Antes de passarmos para os próximos requests da API, precisamos chamar algumas coisas no server.js. Estamos com o seguinte código lá, primeiramente vamos remover a rota que colocamos e usar nosso arquivo de rotas:

<small>server.js</small>
```
// Remover essa rota

app.get('/', (req, res)=> {
  res.send('Hello World!');
});
// ****************************************

// Adicionar a lista de rotas

app.use('/api', require('./src/routes.js'))
// ****************************************
```

Precisamos também importar nosso model:

```
require('./src/models/Item');
```

Nosso server agora vai ficar assim:

```
const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Permite envio de json para o servidor
app.use(express.json());

// Conectar com o banco
mongoose.connect('mongodb://localhost:27017/apibase', {useNewUrlParser: true})

// Importação dos models
require('./src/models/Item');

// Importação das rotas
app.use('/api', require('./src/routes.js'))

app.listen('3002', ()=> console.log('server running at localhost:3002'))
```

Feito isso, podemos testar nosso CREATE no Postman, mas vamos ver isso no próximo post. 

[PARTE 4](/)