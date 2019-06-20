---
title:  "Criando API's com NodeJs, MongoDB e Express"
description: Criação de uma API na visão de quem aprendeu a fazer isso literalmente ontem
date: 2019-06-21 00:00:00
image: post16-mapa.png
tags: [nodejs, api, express, mongodb, docker, postman] 
---
<!--
//NODE+EXPRESS+MONGO https://cdn-images-1.medium.com/max/1200/1*LkU6JjfNdYxv3Q8weUcnEg.jpeg
//ROBO3T https://dashboard.snapcraft.io/site_media/appmedia/2018/09/logo-256x256.png
//POSTMAN https://www.getpostman.com/img/v2/logo-glyph.png
-->
E aew pessoal.

Vou falar aqui sobre como criar uma API, com NodeJS, Express e MongoDB, e vamos ver algumas ferramentas no processo, como Postman e Docker. Esse post é baseado num aprendizado inicial, se você conhece bem essas tecnologias, esse conteúdo deve ser muito básico pra você. 

Dado o disclaimer, imagino que essa postagem vá me servir para algumas coisas: 

* Fixar o conteúdo que aprendi literalmente ontem (escrevo esse post no dia 19/06/19)
* Instigar-me a ir além, e aprender um pouco mais sobre essa stack, talvez implementando novas camadas de deenvl
* Voltar a escrever por aqui

Espero que essa postagem o ajude também a dar o pontapé inicial nessa stack bacana e simples de entender.

## O que é necessário para seguir adiante

- Javascript/ ES6, não vou dizer que precisa do básico, mas quanto mais experiência, mais simples vai ficar de entender. Se você nunca ouviu falar em *arrow functions* por exemplo, acaba que a sintaxe pode ficar um pouco complicada.

E só.

Node, MongoDB, Express, Docker, Postman, se tiver um mínimo conhecimento prévio, ajuda, mas não é necessário, até porque se você está lendo isso aqui, é porque você deve ser iniciante nessas tecnologias/ ferramentas.

## Algumas considerações

Ao ler esse post e tentar reproduzir, sugiro que você tenha algo em mente e tente seguir baseado nesse seu projeto. Só copiar e colar não vai te levar muito longe.
Vou falar aqui, baseado nas minha experiências e dores. Espero que sejam as mesmas das suas. Mas se aparecerem outras, compartilhe aqui embaixo e vamos tentar resolver juntos.

Tá no Github um """boilerplate""" que fiz pra me ajudar a criar novas apis, com uma certa estrutura pré configurada. Não é um projeto, não é uma ideia ficar mantendo, só se der muito certo, o que não acredito e nem é o intuito, pois existem várias alternativas melhores e já disponíveis. Talvez vá implementando algumas coisas com o passar do tempo e com a experiência que vou adquirindo, mas se você baixar hoje, terá exatamente a mesma coisa que vou mostrar aqui.


Ir para a próxima parte: [PART 2](). 

******************* ---------------------- ************************
PART 2 
******************* ---------------------- ************************

Já leu a parte 1? Não? Confira aqui: 

- [PARTE 1]()

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

[PARTE 3]()

******************* ---------------------- ************************
PART 3 
******************* ---------------------- ************************

Já leu as partes 1 e 2? Não? Confira aqui: 

- [PARTE 1]()
- [PARTE 2]()

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

[PARTE 4]()

******************* ---------------------- ************************
PART 4 
******************* ---------------------- ************************

Já leu as partes 1, 2 e 3? Não? Confira aqui: 

- [PARTE 1]()
- [PARTE 2]()
- [PARTE 3]()

Vamos testar se conseguimos criar um item no nosso banco via Postman, mas antes vamos entender um pouco mais sobre a interface dessa ferramenta.

