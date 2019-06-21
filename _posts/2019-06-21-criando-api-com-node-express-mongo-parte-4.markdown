---
title:  "Criando API's com NodeJs, MongoDB e Express - Parte 4"
description: Finalizando aplicação e fazendo primeiras requisições
date: 2019-06-21 00:00:00
image: node-express-mongo.jpg
tags: [nodejs, api, express, mongodb, docker, postman, robo3t] 
---

<style>
	pre.highlight, .highlight pre{
		color: #00ff00;
	}
</style>

Já leu as partes 1, 2 e 3? Não? Confira aqui: 

- [PARTE 1](https://jonathanslima.github.io/2019/criando-api-com-node-express-mongo-parte-1/)
- [PARTE 2](https://jonathanslima.github.io/2019/criando-api-com-node-express-mongo-parte-2/)
- [PARTE 3](https://jonathanslima.github.io/2019/criando-api-com-node-express-mongo-parte-3/)

Vamos testar se conseguimos criar um item no nosso banco. Abra o Postman e o Robo3T. 

No Postman, vá em criar collection. De um nome, e se quiser dê uma descrição. Eu coloquei *API_Base*. 

![Postman - criando nova collection](../../assets/images/postman1.jpg)

Na seção do lado esquerdo como pode ser visto abaixo, já estamos com o nosso endpoint. Como vamos mandar dados para o banco, temos que usar o método *POST*. É só alterar o select e escolher a correta.

![Postman](../../assets/images/postman2.jpg)

Depois va na aba *Body* e em depois selecione *raw*. Também não esqueça de no último campo trocar de *Text* para *JSON(application/json)*, de vez em quando eu ainda esqueço de trocar esse campo. 

Perceba na imagem abaixo que os dados que estou imputando é baseado no model que criamos. Clique em *send*, depois vá em *Headers*:

![Postman](../../assets/images/postman3.jpg)

Por fim recebemos o response:

![Postman](../../assets/images/postman4.jpg)

Só vamos dar uma conferida se salvou mesmo no banco. Vimos que a requisição ocorreu normalmente, nenhum erro no terminal. É aqui que entra em ação o Robo3T, que vai nos facilitar a visualização.

![Postman](../../assets/images/robo3t.jpg)

Veja que o banco foi criado, a collection *items* também. Clique com o botão esquerdo em *items* que está dentro de Collections , e selecione *view documents*. Veja que nossos dados foram inseridos no banco.

Você ainda pode salvar seus *requests* para deixar mais organizado.

![Postman](../../assets/images/postman5.jpg)

Bem, acabamos com uma boa parte, mas ainda temos coisas a finaizar.

## Outros métodos

Vamos criar os outros métodos e finalizar o crud.

Em *routes.js* nossas rotas ficarão assim:

```
routes.get('/itemsList', ItemList.getAllItems)
routes.post('/itemsList', ItemList.createItem)
routes.put('/itemsList/:id', ItemList.updateItem)
routes.delete('/itemsList/:id', ItemList.deleteItem)
```

O **/:id** é pra explicitar que tenho de enviar o id do item para alteração. Seja para atualizar, deletar ou mostrar o item.

Temos já uma para listar, outra para criar, mais uma para update e por fim a remoção do item. Vamos criar os métodos agora.

### PUT

O método de update consistem em enviar dados para o servidor para que possa ser feita a alteração de um determinado item pré-criado. 

Começamos igual as outras, com uma *async function*, que vai pegar o model e é através do método *findByIdAndUpdate*, que recebe como parâmetros, o **id** (req.params.id), o *corpo da requisição* (req.body) e por fim, o objeto **{new: true}**, que vai retornar para a gente os dados atualizados.

```
async updateItem(req, res){
	const update = await itemModel.findByIdAndUpdate(req.params.id, req.body, {new: true});
	return res.json(update)
},
```

### DELETE

O método de delete consistem em enviar o item, identificado pelo seu *id* e removê-lo. 

Começamos igual as outras, com uma *async function*, que vai pegar o model e é através do método *findByIdAndRemove* que vamos fazer a remoção do arquivo no banco passando como parâmetro o ID do item.

```
async deleteItem(req, res){
	await itemModel.findByIdAndRemove(req.params.id);
	res.send();
},
```

Pronto, podemos brincar com a api agora. É só ir adicionando, editando, listando ou deletando. O projeto tem escopo pra implementar muita coisa boa ainda, mas acho que aqui pode ser um bom start pra começar/continuar os estudos. O link da API no Github está mais abaixo. Até a proxima.

[API BASE - Github](https://github.com/jonathanslima/apibase) 