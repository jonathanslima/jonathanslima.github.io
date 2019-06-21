---
title:  "Criando API's com NodeJs, MongoDB e Express - Parte 1"
description: Criação de uma API na visão de quem aprendeu a fazer isso literalmente ontem
date: 2019-06-21 00:00:00
image: node-express-mongo.jpg
tags: [nodejs, api, express, mongodb, docker, postman, robo3t] 
---

E aew pessoal.

Vou falar aqui sobre como criar uma API, com NodeJS, Express e MongoDB, e vamos ver algumas ferramentas no processo, como Postman e Docker. Esse post é baseado num aprendizado inicial, se você conhece bem essas tecnologias, esse conteúdo deve ser muito básico pra você. 

![Criando API's com NodeJs, MongoDB e Express](../../assets/images/node-express-mongo.jpg)

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

Tá no Github um ["""boilerplate"""](https://github.com/jonathanslima/apibase) que fiz pra me ajudar a criar novas apis, com uma certa estrutura pré configurada. Não é um projeto, não é uma ideia ficar mantendo, só se der muito certo, o que não acredito e nem é o intuito, pois existem várias alternativas melhores e já disponíveis. Talvez vá implementando algumas coisas com o passar do tempo e com a experiência que vou adquirindo, mas se você baixar hoje, terá exatamente a mesma coisa que vou mostrar aqui.


Ir para a próxima parte: [PART 2](https://jonathanslima.github.io/2019/criando-api-com-node-express-mongo-parte-2/). 