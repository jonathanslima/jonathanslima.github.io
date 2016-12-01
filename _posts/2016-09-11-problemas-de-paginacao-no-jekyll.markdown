---
title:  "Problemas de paginação no blog com o Jekyll 3"
description: Como consertar?
date: 2016-09-11 15:30:00
image: post13-jekyll-commands.jpg
---

E aew pessoal blz? Postzinho rápido pra deixar aqui como resolvi esse problema, e espero que possa ajudar alguém, já que não achei esse material em pt-br.

## A Gênese do problema

Tudo começou quando resolvi mudar meu terminal, saindo do padrão que vem no mac e indo para o Iterm2. Demorei um pouco para resolver uns problemas de configuração, mas tá tudo rodando perfeito. Até que eu resolvi escrever um novo post sobre as ferramentas (hardware/ sofware) que trabalho hoje e ao rodar o Jekyll no terminal apareceu isto:

![Terminal não reconhece o comando jekyll](../../assets/images/post13-jekyll-commands.jpg)

hehe, pode ver que digitei três vezes de forma diferente, pois havia pensado que tinha errado o comando pra chamar o server. Até que percebi que ele não estava reconhecendo o comando Jekyll. :o

Blz, novo terminal, vamos reinstalar o Jekyll sem problemas. Instalei e quando fui rodar novamente apareceu isto:

![Mensagem de erro no jekyll, informando que falta a gem jekyll-paginate](../../assets/images/post13-deprecation-jekyll.jpg)

<blockquote>Deprecation: You appear to have pagination turned on, but you haven't included the `jekyll-paginate` gem. Ensure you have `gems: [jekyll-paginate]` in your configuration file.</blockquote>

E isto no localhost:

<figure>
	<img src="../../assets/images/post13-view-blog.jpg" alt="imagem do meu blog sem aparecer as postagens">
	<figcaption>WTF!</figcaption>
	<br>
</figure>

Fiz o que todo mundo deveria fazer quando encontra um problema que você não sabe como resolver, consultei o [guru da montanha que tem todas as respostas](https://www.google.com.br/)

Bem, vou mostrar como resolvi:

1 - Primeiramente <del>fora temer</del> dei o comando no terminal:

<code class='line-code'>sudo gem install jekyll-paginate</code>

2 - Fui no arquivo de configuração **_config.yml** e coloquei a seguinte linha lá:

<code class="line-code">gems: [jekyll-paginate]</code>

E voilá. Tudo voltou a funcionar.

## O que aconteceu?

Basicamente isto:

![documentação do jekyll informando como resolver o problema de paginação](../../assets/images/post13-jekyll-doc.jpg)

Para o Jekyll 3, tinha de incluir o plugin **jekyll-paginate** no meu **gemfile** e no meu **_config.yml**. Pra quem usava o Jekyll 2 (que era meu caso antes do Iterm), isto já era um padrão.

### Referências

Fica aqui uma listinha dos links que visitei como referência:

+ [https://github.com/poole/lanyon/issues/159](https://github.com/poole/lanyon/issues/159)
+ [https://github.com/jekyll/jekyll/issues/3393](https://github.com/jekyll/jekyll/issues/3393)
+ [http://jekyllrb.com/docs/pagination/#enable-pagination](http://jekyllrb.com/docs/pagination/#enable-pagination)
+ [https://teamtreehouse.com/community/jekyllpaginate-gem](https://teamtreehouse.com/community/jekyllpaginate-gem)

Até a próxima!
