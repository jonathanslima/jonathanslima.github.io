---
title:  "Criando API's com NodeJs, MongoDB e Express - Parte 2"
description: Setup do ambiente, ferramentas e models/ controllers
date: 2019-06-21 00:00:00
image: node-express-mongo.jpg
tags: [nodejs, api, express, mongodb, docker, postman, robo3t] 
---

Já leu a parte 1? Não? Confira aqui: 

- [PARTE 1](https://jonathanslima.github.io/2019/criando-api-com-node-express-mongo-parte-1/)

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
app.listen('3002')
```

3002 é a porta que vamos setar na nossa url, então ficaria assim: **http://localhost:3002**. Rode no terminal:

```
node server.js
```

Acessando o navegador, veriamos a imagem abaixo:


![servidor sem rota](../../assets/images/cannot-get.jpg)


Isso acontece pois ainda não criamos nenhuma rota. Vamos criar a primeira. Antes de *app.listen('3002')* digite:

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
Volte para o terminal agora, e rode *npm run dev*. Atualize a página no navegador e você verá que nada foi alterado.

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

O primeiro baixa uma imagem do MongoDB e deixa disponível no Docker. Se for em sistemas Unix é necessário ser root.

O segundo, o Docker vai rodar (**run**) um processo com um nome a sua escolha (**--name nome-sua-api**), coloquei *--name api-base*, na porta 27017:27017. 

Essa porta que configuramos significa que quando tentarmos acessar a porta padrão local do MongoDB (27017) ele redirecione (:) para a porta padrão do MongoDb instalado no Docker (27017), e o **-d mongo** é o nome da imagem que baixamos no primeiro comando. Comigo tinha dado que o primeiro parâmetro da porta estava em uso, então troquei para *27013:27017*.

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

![Criando API's com NodeJs, MongoDB e Express](../../assets/images/robo3t.png)
![Criando API's com NodeJs, MongoDB e Express](../../assets/images/postman-icon.png)


- [https://robomongo.org/download](https://robomongo.org/download)
- [https://www.getpostman.com/downloads/](https://www.getpostman.com/downloads/)

## Conexão com o banco de dados

Precisamos conectar nossa aplicação ao banco de dados. Para isso vamos instalar uma ferramenta bem útil e que facilita bastante várias ações que fomos tomar com o Mongo.

### Mongoose

Tão simples como instalar *npm install mongoose*, precisamos importá-lo e em seguida realizar a conexão.

<small>server.js</small>
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

Vamos pegar o *mongoose* e conectar ao endereco **'mongodb://localhost:27017/nodeapi'**. 

*mongodb* é o protocolo.

## Models, Controllers e Routes

Vamos criar toda nossa estrutura para conseguirmos salvar no banco um novo item. Vamos usar uma estrutura padrão que vi em vários lugares enquanto estudava.

### Models

Na pasta raiz, vamos criar uma outra pasta chamada *src*. Dentro desta, ficará todo o código da nossa API,com exceção do *server.js*.

Dentro de src cria a pasta *models*, e dentro dela um arquivo chamado *Item.js* ou qualquer outro nome, que faça sentido a seu projeto. Esta pasta será utilizada para armazenarmos o Schema através do Mongoose. Para mais detalhes sobre Schema e seus tipos, [veja aqui](https://mongoosejs.com/docs/guide.html). 

Comece importando o mongoose:

```
const mongoose = require('mongoose');

```

Em seguida,defina uma constante que armazenará uma nova instância do Mongoose chamando o método Schema, que recebe como parâmetro um objeto. O modelo do objeto a ser definido no banco, é no mesmo padrão chave-valor, sendo que o valor das chaves você pode passar como um novo objeto, setando sua obrigatoriedade e seu tipo.

```
const itemSchema = new mongoose.Schema({
	nome: {
		required: true,
		type: String
	}
});
```

O modelo a seguir também é perfeitamente funcional:

```
const itemSchema = new mongoose.Schema({
	nome:  String,
	cpf: Number
});
```

E por fim, exporte esse Schema, dando-lhe um nome:

```
mongoose.model('Item', itemSchema);
```

### Controller

O controller é onde vai ficar toda a nossa lógica, regra de negócio. Vamos criar a pasta *controllers* e dentro dela, o arquivo itemController.js, ou novamente, o nome do arquivo que faça sentido para a sua aplicaçao. 

No momento temos a seguinte estrutura:

```
/root
  |-/src
  	|-models/
  	|	|-item.js
	|
  	|-controllers/
  		|-itemController.js

```

Dentro de *itemController*, vamos fazer o seguinte, comece importando o Mongoose e o modelo que criamos no tópico anterior:

```
const mongoose = require('mongoose');
const itemModel = mongoose.model('Item');
```

Em seguida vamos usar a exportação de módulos para que as funções estejam disponíveis:

```
module.exports = {}
```

Dentro desse objeto, vamos criar os vários métodos que ficarão responsáveis para fazer todo o CRUD. 

No método abaixo, usamos o *async*, para deixarmos a função assíncrona. Chamaremos de *createItem* que vai exatamente criar um novo item no banco de acordo com o model que configuramos, usando a função **.create** e passando como parâmetro o corpo da requisição, ou seja os dados que vamos enviar. 

O Await faz com que o retorno da função só seja invocada quando o *.create* for finalizado.

```
module.exports = {
	async createItem(req, res){ // New Item
	    const Item = await itemModel.create(req.body);
	    return res.json(Item);
	},
}
```
Com um model e um controller para criação de um item no banco configurado, precisamos ajustar a rota e chamar no arquivo server.js. Mas isso vamos ver só no próximo post. 

[PARTE 3](https://jonathanslima.github.io/2019/criando-api-com-node-express-mongo-parte-3/)